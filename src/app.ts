import { getProjectInitData, cleanUpDir } from './modules/projectInit';
import { markupHandler } from './modules/markupHandler';
import { packageJsonHandler } from './modules/packageJsonHandler';
import { projectChoices } from 'modules/projectChoices';
import { store } from './store';
import { configsHandler } from 'modules/configsHandler';
import chalk from 'chalk';

export async function app() {
  store.setProjectInitData(await getProjectInitData());
  store.setUserChoiсe(await projectChoices(['markup', 'style', 'script', 'prettier', 'stylelint', 'eslint']));

  if (store.projectInitData.toСlean) await cleanUpDir();

  await markupHandler();
  await packageJsonHandler();
  await configsHandler();

  if (store.warnMsgs.length) {
    store.warnMsgs.forEach((el) => console.warn(chalk.yellow('Warning:'), `${el}`));
  }
}
