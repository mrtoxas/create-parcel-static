import { store } from 'store';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { parcelConfig as parcelCfg } from 'configs';
import { EslintConfig, ParcelConfig, PostcssConfig, PrettierConfig, StyleLintConfig, TsConfig } from 'types';

const postcssConfig: PostcssConfig = {};
const parcelConfig: ParcelConfig = { ...parcelCfg.default };
const eslintConfig: EslintConfig = { ...eslintCfg.default };

const configsToSave: {
  fileName: string;
  config: PostcssConfig | StyleLintConfig | TsConfig | ParcelConfig | EslintConfig | PrettierConfig;
}[] = [];

export async function configsHandler() {
  const { projectInitData, userProjectChoice } = store;

  /* Tailwind */
  if (userProjectChoice.style.name === Tech.TAILWIND) {
    postcssConfig.plugins = { ...postcssConfig.plugins, ...postcssCfg.tailwind.plugins };
    configsToSave.push({ fileName: '.postcssrc', config: postcssConfig });

    try {
      await fs.writeFile(
        path.join(projectInitData.projectPath, `tailwind.config.${userProjectChoice.script.extension}`),
        tailwindConfig(
          `${userProjectChoice.markup.extension}, ${userProjectChoice.script.extension}`,
          userProjectChoice.script.name === 'typescript',
        ),
      );
    } catch (err) {
      console.error(chalk.red('Error: '), 'Error when saving tailwind config');
      throw err;
    }
  }

  /* TypeScript */
  if (userProjectChoice.script.name === Tech.TYPESCRIPT) {
    configsToSave.push({ fileName: 'tsconfig.json', config: tsСonfig });
  }

  /* EJS */
  if (userProjectChoice.markup.name === Tech.EJS) {
    parcelConfig.transformers = { ...parcelConfig.transformers, ...parcelCfg.ejs.transformers };
  }

  /* Prettier */
  if (userProjectChoice.prettier) {
    configsToSave.push({ fileName: '.prettierrc', config: prettierConfig });
  }

  /* Stylelint */
  if (userProjectChoice.stylelint) {
    let stylelintConfig: StyleLintConfig = {};

    switch (userProjectChoice.style.name) {
      case Tech.SASS:
        try {
          await fs.writeFile(path.join(projectInitData.projectPath, '.sasslintrc'), sassLintConfig);
        } catch (err) {
          console.error(chalk.red('Error: '), 'Error when saving sasslint config');
          throw err;
        }
        break;
      case Tech.SCSS:
        stylelintConfig = styleLintCfg.scss;
        break;
      case Tech.LESS:
        stylelintConfig = styleLintCfg.less;
        break;
      case Tech.STYLUS:
        stylelintConfig = styleLintCfg.stylus;
        break;
      case Tech.TAILWIND:
      case Tech.CSS:
        stylelintConfig = styleLintCfg.css;
        break;
      default:
        console.error(chalk.red('Error: '), `Unknown slyle name: ${userProjectChoice.style.name}`);
        throw new Error();
    }

    if (userProjectChoice.prettier) {
      stylelintConfig.plugins = stylelintConfig.plugins
        ? [...stylelintConfig.plugins, ...styleLintCfg.prettier.plugins]
        : styleLintCfg.prettier.plugins;

      stylelintConfig.rules = { ...stylelintConfig.rules, ...styleLintCfg.prettier.rules };
    }

    configsToSave.push({ fileName: '.stylelintrc', config: stylelintConfig });
  }

  /* ESLint */
  if (userProjectChoice.eslint) {
    if (userProjectChoice.script.extension === FileExt.TYPESCRIPT) {
      eslintConfig.parser = eslintCfg.typescript.parser;
      if (eslintConfig.plugins) {
        eslintConfig.plugins = [...eslintConfig.plugins, ...eslintCfg.typescript.plugins];
      } else {
        eslintConfig.plugins = [...eslintCfg.typescript.plugins];
      }

      eslintConfig.extends = [...eslintConfig.extends, ...eslintCfg.typescript.extends];
    }

    if (userProjectChoice.script.name === Tech.JQUERY) {
      eslintConfig.env = { ...eslintConfig.env, ...eslintCfg.jquery.env };
      eslintConfig.extends = [...eslintConfig.extends, ...eslintCfg.jquery.extends];
    }

    if (userProjectChoice.prettier) {
      // Should be at the end of the extensions list
      eslintConfig.extends = [...eslintConfig.extends, ...eslintCfg.prettier.extends];
    }

    configsToSave.push({ fileName: '.eslintrc', config: eslintConfig });
  }

  /* Parcel Core */
  configsToSave.push({ fileName: '.parcelrc', config: parcelConfig });

  configsToSave.forEach((item) => {
    try {
      fs.writeJson(path.join(projectInitData.projectPath, item.fileName), item.config, {
        spaces: 2,
      });
    } catch (err) {
      console.error(chalk.red('Error: '), `Error when saving ${item.fileName}`);
      throw err;
    }
  });
}
