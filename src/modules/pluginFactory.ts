import { cssPlugin } from 'plugins/css';
import { eslintPlugin } from 'plugins/eslint';
import { ejsPlugin } from 'plugins/ejs';
import { htmlPlugin } from 'plugins/html';
import { javascriptPlugin } from 'plugins/javascript';
import { jqueryPlugin, jqueryTsPlugin } from 'plugins/jquery';
import { lessPlugin } from 'plugins/less';
import { prettierPlugin } from 'plugins/prettier';
import { pugPlugin } from 'plugins/pug';
import { sassPlugin } from 'plugins/sass';
import { scssPlugin } from 'plugins/scss';
import { stylelintPlugin } from 'plugins/stylelint';
import { stylusPlugin } from 'plugins/stylus';
import { tailwindPlugin } from 'plugins/tailwind';
import { typescriptPlugin } from 'plugins/typescript';
import { Plugins } from 'types';

export const plugins: Plugins = {
  html: htmlPlugin(),
  pug: pugPlugin(),
  ejs: ejsPlugin(),
  css: cssPlugin(),
  sass: sassPlugin(),
  scss: scssPlugin(),
  less: lessPlugin(),
  stylus: stylusPlugin(),
  tailwind: tailwindPlugin(),
  javascript: javascriptPlugin(),
  typescript: typescriptPlugin(),
  jquery: jqueryPlugin(),
  jqueryts: jqueryTsPlugin(),
  eslint: eslintPlugin(),
  prettier: prettierPlugin(),
  stylelint: stylelintPlugin(),

  getPluginData(pName) {
    return {
      name: this[pName].name,
      title: this[pName].title,
      type: this[pName].type,
      fileExt: this[pName].fileExt,
    };
  },

  getDevDeps(pName, type) {
    const plugin = this[pName];
    if (plugin && plugin.devDeps && plugin.devDeps[type]) {
      return plugin.devDeps[type];
    }
  },

  getScritps(pName, cfgName) {
    const script = this[pName];
    if (script && script.scripts && script.scripts[cfgName]) {
      return script.scripts[cfgName];
    }
  },

  getConfig(pName, cfgName) {
    const plugin = this[pName];
    if (plugin && plugin.configs && plugin.configs[cfgName]) {
      return plugin?.configs[cfgName];
    }
  },
};
