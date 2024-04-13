import { store } from 'store';
import fs from 'fs-extra';
import path from 'path';
import {
  eslintConfig as eslintCfg,
  parcelConfig as parcelCfg,
  postcssConfig as postcssCfg,
  prettierConfig,
  stylelintConfig as styleLintCfg,
  tailwindConfig,
  tsСonfig,
} from 'configs';

const postcssConfig: Config = {};
const parcelConfig: Config = { ...parcelCfg.base };
const eslintConfig: Config = { ...eslintCfg.base };

const configsToSave: { fileName: string; config: Config }[] = [];

const mergeConfigs = (target: Config, donor: Config) => {
  if (!target) return donor;

  if (Array.isArray(target) && Array.isArray(donor)) {
    return [...target, ...donor];
  } else if (!Array.isArray(target) && !Array.isArray(donor)) {
    return { ...target, ...donor };
  } else {
    throw new Error(`Incompatible config types to merge`);
  }
};

export async function configsHandler() {
  const { projectInitData, userProjectChoiсe } = store;

  /* Tailwind */
  if (userProjectChoiсe.style.name === 'tailwind') {
    postcssConfig.plugins = mergeConfigs(postcssConfig.plugins as Config, postcssCfg.tailwind);
    configsToSave.push({ fileName: '.postcssrc', config: postcssConfig });

    try {
      await fs.writeFile(
        path.join(projectInitData.projectPath, `tailwind.config.${userProjectChoiсe.script.extension}`),
        tailwindConfig(
          `${userProjectChoiсe.markup.extension}, ${userProjectChoiсe.script.extension}`,
          userProjectChoiсe.script.name === 'typescript',
        ),
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
    parcelConfig.transformers = mergeConfigs(parcelConfig.transformers, parcelCfg.ejs.transformers);
    configsToSave.push({ fileName: '.parcelrc', config: parcelConfig });
  }

  /* Prettier */
  if (userProjectChoiсe.prettier) {
    configsToSave.push({ fileName: '.prettierrc', config: prettierConfig });
  }

  /* Stylelint */
  if (userProjectChoiсe.stylelint) {
    let stylelintConfig: Config = {};

    switch (userProjectChoiсe.style.name) {
      case 'sass':
      case 'scss':
        stylelintConfig = styleLintCfg.scss as Config;
        break;
      case 'less':
        stylelintConfig = styleLintCfg.less as Config;
        break;
      case 'stylus':
        stylelintConfig = styleLintCfg.stylus as Config;
        break;
      case 'tailwind':
      case 'css':
        stylelintConfig = styleLintCfg.css as Config;
        break;
      default:
        throw new Error(`Unknown style name`);
    }

    if (userProjectChoiсe.prettier) {
      stylelintConfig.plugins = mergeConfigs(stylelintConfig.plugins, styleLintCfg.prettier.plugins);
      stylelintConfig.rules = mergeConfigs(stylelintConfig.rules, styleLintCfg.prettier.rules);
    }

    configsToSave.push({ fileName: '.stylelintrc', config: stylelintConfig });
  }

  /* ESLint */
  if (userProjectChoiсe.eslint) {
    if (userProjectChoiсe.script.extension === 'ts') {
      eslintConfig.parser = eslintCfg.typescript.parser;
      eslintConfig.plugins = mergeConfigs(eslintConfig.plugins, eslintCfg.typescript.plugins);
      eslintConfig.extends = mergeConfigs(eslintConfig.extends, eslintCfg.typescript.extends);
    }

    if (userProjectChoiсe.prettier) {
      eslintConfig.extends = mergeConfigs(eslintConfig.extends, eslintCfg.prettier.extends);
    }

    if (userProjectChoiсe.script.name === 'jquery') {
      eslintConfig.env = mergeConfigs(eslintConfig.env, eslintCfg.jquery.env);
      eslintConfig.extends = mergeConfigs(eslintConfig.extends, eslintCfg.jquery.extends);
    }

    configsToSave.push({ fileName: '.eslintrc', config: eslintConfig });
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
