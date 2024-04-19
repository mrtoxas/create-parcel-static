export enum FileExt {
  html = 'html',
  pug = 'pug',
  hbs = 'hbs',
  ejs = 'ejs',
  css = 'css',
  scss = 'scss',
  sass = 'sass',
  less = 'less',
  stylus = 'styl',
  javascript = 'js',
  typescript = 'ts',
}

export enum Tech {
  HTML = 'html',
  PUG = 'pug',
  EJS = 'ejs',
  HANDLEBARS = 'handlebars',
  CSS = 'css',
  SCSS = 'scss',
  SASS = 'sass',
  STYLUS = 'stylus',
  LESS = 'less',
  TAILWIND = 'tailwind',
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  JQUERY = 'jquery',
  PRETTIER = 'prettier',
  STYLELINT = 'stylelint',
  ESLINT = 'eslint',
}

interface ChoiceValue {
  name: Tech;
  extension: FileExt;
}

interface QuestionBase {
  name: string;
  type: 'select' | 'confirm';
  message: string;
}

interface QuestionSelect extends QuestionBase {
  type: 'select';
  choices: {
    name: string;
    value: ChoiceValue;
  }[];
}

interface QuestionConfirm extends QuestionBase {
  type: 'confirm';
  default: true;
}

export type QuestionList = (QuestionSelect | QuestionConfirm)[];

export interface UserProject {
  markup: ChoiceValue;
  style: ChoiceValue;
  script: ChoiceValue;
  prettier?: boolean;
  eslint?: boolean;
  stylelint?: boolean;
  [key: string]: ChoiceValue | boolean;
}

export type StyleSystem = 'base' | Tech.TAILWIND;

export interface AppArguments {
  markup: string;
  style: string;
  script: string;
  prettier?: boolean;
  eslint?: boolean;
  stylelint?: boolean;
  help?: string;
  h?: string;
}

export interface Store {
  userProjectChoiсe: UserProject;
  projectInitData: ProjectInitData;
  warnMsgs: string[];
  setUserChoiсe: (data: UserProject) => void;
  setProjectInitData: (data: ProjectInitData) => void;
  setWarnMsgs: (data: string) => void;
}

export type ProjectInitData = {
  projectPath: string;
  projectName: string;
  packageName: string;
  toСlean: boolean;
};

export interface PackageJson {
  name: string;
  version: string;
  description: string;
  scripts: Record<string, string>;
  author: string;
  license: string;
  devDependencies: Record<string, string>;
}

export interface StyleLintConfig {
  extends?: string[];
  rules?: Record<string, string | boolean | string[]>;
  plugins?: string[];
}

export interface PostcssConfig {
  plugins?: Record<string, object>;
}

export interface TsConfig {
  compilerOptions?: Record<string, string | boolean>;
  include?: string[];
  exclude?: string[];
}

export interface ParcelConfig {
  extends?: string[];
  reporters?: string[];
  transformers?: Record<string, string[]>;
}

export interface EslintConfig {
  env?: Record<string, boolean>;
  extends?: string[];
  parserOptions?: Record<string, number | string>;
  rules?: Record<string, string>;
  parser?: string;
  plugins?: string[];
}

export interface PrettierConfig {
  [key: string]: boolean | string | number;
}
