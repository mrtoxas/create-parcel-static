import fs from 'fs-extra';
import chalk from 'chalk';
import { input, select, confirm } from '@inquirer/prompts';
import validate from 'validate-npm-package-name';
import { basename, resolve } from 'path';
import { store } from '../store';
import path from 'path';

export async function getProjectInitData(name?: string) {
  let projectPath;
  let projectName = name;
  let packageName;

  const projectNamePrompt = projectName
    ? projectName
    : await input({
        message: 'Project name:',
        default: 'parcel-project',
      });

  if (projectNamePrompt.trim() === '/') {
    projectPath = `${process.cwd()}/parcel-project`;
    projectName = packageName = 'parcel-project';
    const toСlean = await toСleanDir(projectPath);

    return { projectPath, projectName, packageName, toСlean };
  }

  projectPath = resolve(projectNamePrompt);
  projectName = basename(projectPath);

  const { errors } = validate(projectName);

  packageName = !errors
    ? projectName
    : await input({
        message: 'Package name:',
        default: 'parcel-project',
        validate: (data) => {
          const { errors } = validate(data);
          return errors ? 'Please enter a valid package name.' : true;
        },
      });

  const userAgent = process.env.npm_config_user_agent?.split(' ')[0].split('/')[0];
  const pkgManager = userAgent || 'npm';

  const toСlean = await toСleanDir(projectPath);

  const relativePath = path.relative(process.cwd(), projectPath);

  return { projectPath, relativePath, projectName, packageName, pkgManager, toСlean };
}

async function toСleanDir(path: string) {
  const exists = await fs.pathExists(path);
  if (!exists) return false;

  const files = await fs.readdir(path);
  if (files.length === 0) return false;

  const userChoise = await select({
    message: 'The target directory contains existing files. How would you like to proceed?',
    choices: [
      {
        name: 'Cancel and manually delete files',
        value: 'cancel',
      },
      {
        name: 'Remove existing files and continue (Recommended)',
        value: 'remove',
      },
      {
        name: 'Ignore it and continue (Existing files will be replaced upon matching)',
        value: 'continue',
      },
    ],
  });

  if (userChoise === 'cancel') {
    console.error(chalk.red('✖'), 'Operation cancelled');
    process.exit(0);
  }

  return userChoise === 'remove' ? true : false;
}

export async function cleanUpDir() {
  const path = store.projectInitData.projectPath;

  const answer = await confirm({
    message: `All files in directory "${path}" will be erased. Continue?`,
    default: false,
  });
  if (!answer) {
    console.error(chalk.red('✖'), 'Operation cancelled');
    process.exit(0);
  }
  try {
    await fs.emptyDir(path);
    return path;
  } catch (err) {
    console.error(chalk.red('Error: '), `Failed to clear the directory: ${path}`);
    console.error('Clear the directory manually and come back');
    throw err;
  }
}
