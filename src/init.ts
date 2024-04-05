import { getProjectInitData, clearDir } from './utils/directory';
import { markupHandler } from './handlers/markupHandler';
import { packageJsonHandler } from './handlers/packageJsonHandler';
import { store } from './store';
import { choice } from 'choises';

export async function init() {  
  store.setProjectData(await getProjectInitData());

  // const keys: (keyof UserProjectChoiсes)[] = ['markup', 'style', 'script', 'prettier', 'stylelint', 'eslint'];
  // for (const key of keys) setUserChoiсe(key, await choice(key));

  // if (projectData.whetherToClear) await clearDir(projectData.projectPath);

  // await markupHandler();
  // await packageJsonHandler(userChoise, projectPath, packageName);
}
