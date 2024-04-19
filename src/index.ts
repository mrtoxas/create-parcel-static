#!/usr/bin/env node

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (Number(major) < 14) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Create Parcel App requires Node 14 or higher. \n' +
      'Please update your version of Node.',
  );
  process.exit(1);
}

import chalk from 'chalk';
import { app } from './app';

app().catch((error) => {
  console.log(error);
  console.error(chalk.red('✖'), 'Operation cancelled');
  process.exit(1);
});
