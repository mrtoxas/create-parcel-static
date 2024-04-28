type PluginType = 'markup' | 'style' | 'script' | 'tool';

interface Plugin {
  type: PluginType;
  title: string;
  name: string;
  fileExt?: string;
}

/*
export enum FileExt {
  HTML = 'html',
  PUG = 'pug',
  EJS = 'ejs',
  CSS = 'css',
  SCSS = 'scss',
  SASS = 'sass',
  LESS = 'less',
  STYLUS = 'styl',
  JAVASCRIPT = 'js',
  TYPESCRIPT = 'ts',
}

export enum Tech {
  HTML = 'html',
  PUG = 'pug',
  EJS = 'ejs',
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

export interface ChoiceValue {
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
  userProjectChoice: UserProject;
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
  relativePath: string;
  pkgManager: string;
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
*/