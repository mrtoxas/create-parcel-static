import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import path from 'path';
import { FileExtensions } from 'utils/getExtensions';
import { store } from 'store';

async function replaceAndSaveFile(srcPath: string, destPath: string, replacements: Record<string, FileExtensions>) {
  const fileContent = await fs.readFile(srcPath, 'utf-8');

  let modifiedContent = fileContent;
  for (const [placeholder, replacement] of Object.entries(replacements)) {
    modifiedContent = modifiedContent.replace(new RegExp(placeholder, 'g'), replacement);
  }

  await fs.writeFile(destPath, modifiedContent, 'utf-8');
}

export async function markupHandler() {
  const { projectInitData, userProjectChoiсe } = store;

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../templates');
  const srcDir = path.join(projectInitData.projectPath, 'src');

  const scriptFile = `main.${userProjectChoiсe.script.extension}`;
  const styleFile = `main.${userProjectChoiсe.style.extension}`;
  const indexFile = `index.${userProjectChoiсe.markup.extension}`;

  const srcMarkupTemplatePath = path.join(templateDir, 'template-markup');
  const srcSctiptFilePath = path.join(templateDir, 'templates-script', scriptFile);
  const srcStyleFilePath = path.join(templateDir, 'templates-style', styleFile);
  const srcIndexFilePath = path.join(templateDir, 'templates-index', indexFile);
  const destSctiptFilePath = path.join(srcDir, 'scripts', scriptFile);
  const destStyleFilePath = path.join(srcDir, 'styles', styleFile);
  const destIndexFilePath = path.join(srcDir, indexFile);

  const replacementsIndex = {
    '{{style-ext}}': styleFile,
    '{{script-ext}}': styleFile,
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
