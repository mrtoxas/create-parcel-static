import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import path from 'path';
import { FileExtensions, getExtensions } from 'utils/utils';
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
  const { projectData, userProjectChoiсe } = store;
  
  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../../templates');
  const srcDir = path.join(projectData.projectPath, 'src');

  const scriptExtension = getExtensions(userProjectChoiсe.script);
  const styleExtension = getExtensions(userProjectChoiсe.style);
  const markupExtension = getExtensions(userProjectChoiсe.markup);

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
    '{{style-ext}}': getExtensions(userProjectChoiсe.style),
    '{{script-ext}}': getExtensions(userProjectChoiсe.script),
  };

  try {
    await fs.copy(srcMarkupTemplatePath, projectData.projectPath);

    fs.copy(srcSctiptFilePath, destSctiptFilePath);
    fs.copy(srcStyleFilePath, destStyleFilePath);

    replaceAndSaveFile(srcIndexFilePath, destIndexFilePath, replacementsIndex);
  } catch (err) {
    throw new Error(err);
  }
}
