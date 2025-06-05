import chalk from 'chalk';
import fs from 'fs-extra';
import { plugins } from 'modules/pluginFactory';
import path from 'path';
import { store } from 'store';
import { StyleSystem } from 'types';
import { fileURLToPath } from 'url';

const TEMPLATE_DIR = '../../templates';
const SRC_DIR = 'src';

async function replaceAndSaveFile(srcPath: string, destPath: string, replacements: Record<string, string>) {
  const fileContent = await fs.readFile(srcPath, 'utf-8');

  let modifiedContent = fileContent;
  for (const [placeholder, replacement] of Object.entries(replacements)) {
    modifiedContent = modifiedContent.replace(new RegExp(placeholder, 'g'), replacement);
  }
  try {
    await fs.writeFile(destPath, modifiedContent, 'utf-8');
  } catch (err) {
    console.error(chalk.red('Error: '), 'Error when processing extention paths in index file');
    throw err;
  }
}

export async function markupHandler() {
  const { projectInitData, userChoice } = store;

  const stylePlugin = plugins.getPluginData(userChoice.style);
  const markupPlugin = plugins.getPluginData(userChoice.markup);
  const scriptPlugin = plugins.getPluginData(userChoice.script);

  if (!(markupPlugin && stylePlugin && scriptPlugin)) {
    console.error(chalk.red('Error:'), `markup-handler: Failed loading plugin`);
    throw new Error();
  }

  const styleSystem: StyleSystem = stylePlugin.name === 'tailwind' ? 'tailwind' : 'base';

  const templateDir = path.resolve(fileURLToPath(import.meta.url), TEMPLATE_DIR);
  const srcDir = path.join(projectInitData.projectPath, SRC_DIR);

  const styleFile = `main.${stylePlugin.fileExt}`;
  const indexFile = `index.${markupPlugin.fileExt}`;

  //scriptFile name - must match the real file name in the templates-script folder
  const scriptFile = `${scriptPlugin.name}.${scriptPlugin.fileExt}`;

  const srcMarkupTemplatePath = path.join(templateDir, 'template-markup');
  const srcSctiptFilePath = path.join(templateDir, 'templates-script', scriptFile);
  const srcStyleFilePath = path.join(templateDir, `style-system-${styleSystem}`, 'templates-style', styleFile);
  const srcIndexFilePath = path.join(templateDir, `style-system-${styleSystem}`, 'templates-index', indexFile);
  const destSctiptFilePath = path.join(srcDir, 'scripts', `main.${scriptPlugin.fileExt}`);
  const destStyleFilePath = path.join(srcDir, 'styles', styleFile);
  const destIndexFilePath = path.join(srcDir, indexFile);

  const replacementsIndex = {
    '{{style-file}}': styleFile,
    '{{script-file}}': `main.${scriptPlugin.fileExt}`,
  };

  try {
    await fs.copy(srcMarkupTemplatePath, projectInitData.projectPath);

    fs.copy(srcSctiptFilePath, destSctiptFilePath);
    fs.copy(srcStyleFilePath, destStyleFilePath);

    replaceAndSaveFile(srcIndexFilePath, destIndexFilePath, replacementsIndex);
  } catch (err) {
    console.error(chalk.red('Error: '), 'Error when copying markup template');
    throw err;
  }
}
