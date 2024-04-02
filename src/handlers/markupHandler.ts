import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import path from 'path';

enum FileExtensions {
  html = 'html',
  pug = 'pug',
  hbs = 'hbs',
  ejs = 'ejs',
  css = 'css',
  scss = 'scss',
  sass = 'sass',
  stylus = 'styl',
  javascript = 'js',
  typescript = 'ts',
}

async function replaceAndSaveFile(srcPath: string, destPath: string, replacements: Record<string, FileExtensions>) {
  const fileContent = await fs.readFile(srcPath, 'utf-8');

  let modifiedContent = fileContent;
  for (const [placeholder, replacement] of Object.entries(replacements)) {
    modifiedContent = modifiedContent.replace(new RegExp(placeholder, 'g'), replacement);
  }

  await fs.writeFile(destPath, modifiedContent, 'utf-8');
}

function getExtensions(tech: UserChoises[keyof UserChoises]) {
  return FileExtensions[tech as keyof typeof FileExtensions];
}

export async function markupHandler(userChoise: UserChoises, projectPath: string) {
  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../templates');
  const srcDir = path.join(projectPath, 'src');

  const scriptExtension = getExtensions(userChoise.script);
  const styleExtension = getExtensions(userChoise.style);
  const markupExtension = getExtensions(userChoise.markup);

  const scriptFile = `main.${scriptExtension}`;
  const styleFile = `main.${styleExtension}`;
  const indexFile = `index.${markupExtension}`;

  const srcMarkupTemplatePath = path.join(templateDir, 'template-markup');
  const srcSctiptFilePath = path.join(templateDir, 'templates-script', scriptFile);
  const srcStyleFilePath = path.join(templateDir, 'templates-style', styleFile);
  const srcIndexFilePath = path.join(templateDir, 'templates-index', indexFile);
  const destSctiptFilePath = path.join(srcDir, 'scripts', scriptFile);
  const destStyleFilePath = path.join(srcDir, 'styles', styleFile);
  const destIndexFilePath = path.join(srcDir, indexFile);

  const replacementsIndex = {
    '{{style-ext}}': getExtensions(userChoise.style),
    '{{script-ext}}': getExtensions(userChoise.script),
  };

  try {
    await fs.copy(srcMarkupTemplatePath, projectPath);

    fs.copy(srcSctiptFilePath, destSctiptFilePath);
    fs.copy(srcStyleFilePath, destStyleFilePath);

    replaceAndSaveFile(srcIndexFilePath, destIndexFilePath, replacementsIndex);
  } catch (err) {
    throw new Error(err);
  }
}
