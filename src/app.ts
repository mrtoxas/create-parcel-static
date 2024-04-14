import { getProjectInitData, cleanUpDir } from './modules/projectInit';
import { markupHandler } from './modules/markupHandler';
import { packageJsonHandler } from './modules/packageJsonHandler';
import { helpHandler } from './modules/helpHandler';
import { projectChoices } from 'modules/projectChoices';
import { store } from './store';
import { configsHandler } from 'modules/configsHandler';
import chalk from 'chalk';
import minimist from 'minimist';

export async function app() {
  const argv = minimist<{
    markup?: string;
    style?: string;
    script?: string;
    prettier?: boolean;
    stylelint?: boolean;
    eslint?: boolean;
    help: boolean;
    h: boolean;
}>(process.argv.slice(2), { string: ['_'] })
  
  if (argv.help || argv.h) {
    helpHandler();
    return;
  }

  store.setProjectInitData(await getProjectInitData(argv._[0]));
  store.setUserChoiсe(await projectChoices(argv));

  if (store.projectInitData.toСlean) await cleanUpDir();

  await markupHandler();
  await packageJsonHandler();
  await configsHandler();

  if (store.warnMsgs.length) {
    store.warnMsgs.forEach((el) => console.warn(chalk.yellow('Warning:'), `${el}`));
  }
}
