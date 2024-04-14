import fs from 'fs-extra';
import chalk from 'chalk';
import { input, select, confirm } from '@inquirer/prompts';
import validate from 'validate-npm-package-name';
import { basename, resolve } from 'path';
import { store } from '../store';

export async function getProjectInitData(name?: string) {
  let projectPath;
  let projectName = name;
  let packageName;

  const projectNamePrompt = projectName ? projectName : await input({
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

  const toСlean = await toСleanDir(projectPath);

  return { projectPath, projectName, packageName, toСlean };
}

async function toСleanDir(path: string) {
  const exists = await fs.pathExists(path);
  if (!exists) return false;

  const files = await fs.readdir(path);
  if (files.length === 0) return false;

  const userChoise = await select({
    message: 'The directory is not empty. What are we gonna do about it?',
    choices: [
      {
        name: 'Cancel and delete files manually',
        value: 'cancel',
      },
      {
        name: 'Remove existing files and continue',
        value: 'remove',
      },
    ],
  });

  if (userChoise === 'cancel') {
    console.error(chalk.red('✖'), 'Operation cancelled');
    process.exit(1);
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
    process.exit(1);
  }
  try {
    await fs.emptyDir(path);
    return path;
  } catch (err) {
    console.error(chalk.red(`Failed to clear the directory: ${path}`));
    console.error(chalk.red(err.message));
    console.error(chalk.red('Clear the directory manually and come back'));
  }
}
