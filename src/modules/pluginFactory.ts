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

export const plugins = {
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
};
