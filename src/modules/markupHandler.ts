import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import path from 'path';
import { store } from 'store';

const TEMPLATE_DIR = '../../templates';

async function replaceAndSaveFile(srcPath: string, destPath: string, replacements: Record<string, string>) {
  const fileContent = await fs.readFile(srcPath, 'utf-8');

  let modifiedContent = fileContent;
  for (const [placeholder, replacement] of Object.entries(replacements)) {
    modifiedContent = modifiedContent.replace(new RegExp(placeholder, 'g'), replacement);
  }
  await fs.writeFile(destPath, modifiedContent, 'utf-8');
}

export async function markupHandler() {
  const { projectInitData, userProjectChoiсe } = store;

  const styleSystem: StyleSystem = userProjectChoiсe.style.name === 'tailwind' ? 'tailwind' : 'base';

  const templateDir = path.resolve(fileURLToPath(import.meta.url), TEMPLATE_DIR);
  const srcDir = path.join(projectInitData.projectPath, 'src');

  const styleFile = `main.${userProjectChoiсe.style.extension}`;
  const indexFile = `index.${userProjectChoiсe.markup.extension}`;

  //scriptFile name - must match the real file name in the templates-script folder
  const scriptFile = `${userProjectChoiсe.script.name}.${userProjectChoiсe.script.extension}`;

  const srcMarkupTemplatePath = path.join(templateDir, 'template-markup');
  const srcSctiptFilePath = path.join(templateDir, 'templates-script', scriptFile);
  const srcStyleFilePath = path.join(templateDir, `style-system-${styleSystem}`, 'templates-style', styleFile);
  const srcIndexFilePath = path.join(templateDir, `style-system-${styleSystem}`, 'templates-index', indexFile);
  const destSctiptFilePath = path.join(srcDir, 'scripts', `main.${userProjectChoiсe.script.extension}`);
  const destStyleFilePath = path.join(srcDir, 'styles', styleFile);
  const destIndexFilePath = path.join(srcDir, indexFile);

  const replacementsIndex = {
    '{{style-file}}': styleFile,
    '{{script-file}}': `main.${userProjectChoiсe.script.extension}`,
  };

  try {
    await fs.copy(srcMarkupTemplatePath, projectInitData.projectPath);

    fs.copy(srcSctiptFilePath, destSctiptFilePath);
    fs.copy(srcStyleFilePath, destStyleFilePath);

    replaceAndSaveFile(srcIndexFilePath, destIndexFilePath, replacementsIndex);
  } catch (err) {
    throw new Error(err);
  }
}
