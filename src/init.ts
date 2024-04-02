import { getProjectInitData, clearDir } from './utils/directory';
import { choice } from './choises';
import { markupHandler } from './handlers/markupHandler';

const userChoise: UserChoises & { set: (key: keyof UserChoises) => Promise<void> } = {
  markup: undefined,
  style: undefined,
  script: undefined,
  set: async function (key) {
    this[key] = await choice(key);
  },
};

export async function init() {
  const { projectPath, whetherToClear } = await getProjectInitData();

  const keys: (keyof UserChoises)[] = ['markup', 'style', 'script', 'prettier', 'stylelint', 'eslint'];

  for (const key of keys) await userChoise.set(key);

  if (whetherToClear) await clearDir(projectPath);

  await markupHandler(userChoise, projectPath);
}
