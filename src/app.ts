import chalk from 'chalk';
import minimist from 'minimist';
import { configsHandler } from 'modules/configsHandler';
import { projectChoices } from 'modules/projectChoices';
import { getPackage } from 'modules/versionsHandler';
import { AppArguments } from 'types';

import { helpHandler } from './modules/helpHandler';
import { markupHandler } from './modules/markupHandler';
import { packageJsonHandler } from './modules/packageJsonHandler';
import { cleanUpDir, getProjectInitData } from './modules/projectInit';
import { store } from './store';

export async function app() {
  const version = getPackage();  

  const argv = minimist<AppArguments>(process.argv.slice(2), { string: ['_'] });

  if (argv.help || argv.h) {
    helpHandler();
    process.exit(0);
  }

  if (argv.version || argv.v) {
    console.log(chalk.dim(`📦 create-parcel-static v${version.version}`));
    process.exit(0);
  }

  store.setProjectInitData(await getProjectInitData(argv._[0]));

  store.setUserChoiсe(await projectChoices(argv));

  if (store.projectInitData.toСlean) {
    await cleanUpDir();
  }

  await markupHandler();
  await packageJsonHandler();
  await configsHandler();

  if (store.warnMsgs.length) {
    store.warnMsgs.forEach((el: string) => console.warn(chalk.yellow('Warning:'), `${el}`));
  }

  console.log(chalk.green('Done!'), 'Now run:');
  if (store.projectInitData.relativePath) {
    console.log(` cd ${store.projectInitData.relativePath}`);
  }
  console.log(` ${store.projectInitData.pkgManager} install`);
  console.log(` ${store.projectInitData.pkgManager} start`);
}
