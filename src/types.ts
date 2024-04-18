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

export type TechKey = keyof typeof Tech;

export interface Store {
  userProjectChoiсe: UserProjectChoiсes;
  projectInitData: ProjectInitData;
  warnMsgs: string[];
  setUserChoiсe: (data: UserProjectChoiсes) => void;
  setProjectInitData: (data: ProjectInitData) => void;
  setWarnMsgs: (data: string) => void;
}

export interface ChoiceDetails {
  name: string;
  title: string;
  extension: string;
}

export type UserProjectChoiсes = {
  markup: ChoiceDetails & { name: Tech.HTML | Tech.PUG | Tech.EJS | Tech.HANDLEBARS };
  style: ChoiceDetails & { name: Tech.CSS | Tech.SCSS | Tech.SASS | Tech.STYLUS | Tech.LESS | Tech.TAILWIND };
  script: ChoiceDetails & { name: Tech.JAVASCRIPT | Tech.TYPESCRIPT | Tech.JQUERY };
  prettier?: boolean;
  eslint?: boolean;
  stylelint?: boolean;
};

export type ProjectInitData = {
  projectPath: string;
  projectName: string;
  packageName: string;
  toСlean: boolean;
};

export type Settings = keyof UserProjectChoiсes;

export type StyleSystem = 'base' | Tech.TAILWIND;

export interface QuestionConfig {
  type: keyof QuestionTypes;
  message: string;
  choices: {
    name: string;
    value: ChoiceDetails;
  }[];
  default: boolean;
}

export interface QuestionTypes {
  select: Pick<QuestionConfig, 'type' | 'message' | 'choices'>;
  confirm: Pick<QuestionConfig, 'type' | 'message' | 'default'>;
}

export type QuestionList = Record<Settings, QuestionTypes['select'] | QuestionTypes['confirm']>;

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
