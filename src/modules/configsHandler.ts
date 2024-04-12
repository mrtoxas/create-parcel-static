import { store } from 'store';
import fs from 'fs-extra';
import path from 'path';
import {
  postcssConfig as postcssCfg,
  tsСonfig,
  parcelConfig as parcelCfg,
  tailwindConfig,
  prettierConfig,
  stylelintConfig,
  esLintConfig as esLintCfg,
} from 'configs';

const postcssConfig: Config = {};

const parcelConfig: Config = { ...parcelCfg.base };

const configsToSave: { fileName: string; config: Config }[] = [];

const esLintConfig: Config = { ...esLintCfg.base };

export async function configsHandler() {
  const { projectInitData, userProjectChoiсe } = store;

  /* Tailwind */
  if (userProjectChoiсe.style.name === 'tailwind') {
    postcssConfig.plugins = { ...(postcssConfig.plugins as Config), ...postcssCfg.tailwind };
    configsToSave.push({ fileName: '.postcssrc', config: postcssConfig });
    const config = tailwindConfig(
      `${userProjectChoiсe.markup.extension}, ${userProjectChoiсe.script.extension}`,
      userProjectChoiсe.script.name === 'typescript',
    );
    try {
      await fs.writeFile(
        path.join(projectInitData.projectPath, `tailwind.config.${userProjectChoiсe.script.extension}`),
        config,
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  /* TypeScript */
  if (userProjectChoiсe.script.name === 'typescript') {
    configsToSave.push({ fileName: 'tsconfig.json', config: tsСonfig });
  }

  /* EJS */
  if (userProjectChoiсe.markup.name === 'ejs') {
    parcelConfig.transformers = { ...parcelCfg.ejs.transformers };
    configsToSave.push({ fileName: '.parcelrc', config: parcelConfig });
  }

  /* Prettier */
  if (userProjectChoiсe.prettier) {
    configsToSave.push({ fileName: '.prettierrc', config: prettierConfig });
  }

  /* Stylelint */
  if (userProjectChoiсe.stylelint) {
    switch (userProjectChoiсe.style.name) {
      case 'sass':
      case 'scss':
        configsToSave.push({ fileName: '.stylelintrc', config: stylelintConfig.scss as Config });
        break;
      case 'less':
        configsToSave.push({ fileName: '.stylelintrc', config: stylelintConfig.less as Config });
        break;
      case 'stylus':
        configsToSave.push({ fileName: '.stylelintrc', config: stylelintConfig.stylus as Config });
        break;
      case 'tailwind':
      case 'css':
        configsToSave.push({ fileName: '.stylelintrc', config: stylelintConfig.css as Config });
        break;
    }
  }

  /* ESLint */
  if (userProjectChoiсe.stylelint) {
    if (userProjectChoiсe.script.name === 'javascript'){
      configsToSave.push({ fileName: '.eslintrc', config: esLintConfig });
    } else if (userProjectChoiсe.script.name === 'typescript'){
      //
    }    
  }

  configsToSave.forEach((item) => {
    try {
      fs.writeJson(path.join(projectInitData.projectPath, item.fileName), item.config, {
        spaces: 2,
      });
    } catch (err) {
      throw new Error(err);
    }
  });
}
