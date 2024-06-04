export type PlgToolName = 'prettier' | 'eslint' | 'stylelint';
export type PlgMarkupName = 'html' | 'pug' | 'ejs';
export type PlgStyleName = 'css' | 'less' | 'sass' | 'scss' | 'stylus' | 'tailwind';
export type PlgScriptName = 'javascript' | 'typescript' | 'jquery' | 'jqueryts';
export type PlgType = 'markup' | 'style' | 'script' | 'tool' | 'tools';
export type PlgName = PlgToolName | PlgMarkupName | PlgStyleName | PlgScriptName;
export type StyleSystem = 'base' | 'tailwind';

export type PluginConfig =
  | StyleLintCfg
  | ParcelCfg
  | PostcssCfg
  | TypescriptCfg
  | EslintCfg
  | PrettierCfg
  | SassLintCfg;

interface PluginConfigs {
  stylelint?: StyleLintCfg;
  parcel?: ParcelCfg;
  postcss?: PostcssCfg;
  typescript?: TypescriptCfg;
  eslint?: EslintCfg;
  prettier?: PrettierCfg;
  sasslint?: SassLintCfg;
}

export interface PluginBase {
  name: PlgName;
  title: string;
  type: PlgType;
  fileExt?: string;
  scripts?: { [key in PlgToolName | 'default']?: Record<string, string> };
  devDeps?: { [key in PlgToolName | 'default']?: Record<string, string> };
  configs?: PluginConfigs;
}

export type PluginMap = {
  [key in PlgName]: PluginBase;
};

export type Plugins = PluginMap & {
  getPluginData: (pName: PlgName) => Pick<PluginBase, 'name' | 'title' | 'type' | 'fileExt'>;
  getDevDeps: (pName: PlgName, type: keyof PluginBase['devDeps']) => PackageJson['devDependencies'];
  getScritps: (pName: PlgName, cfgName: PlgToolName | 'default') => PackageJson['scripts'];
  getConfig: (pName: PlgName, cfgName: keyof PluginConfigs) => PluginConfig;
};

export interface AppProjectArgs {
  markup: string;
  style: string;
  script: string;
  prettier?: boolean;
  eslint?: boolean;
  stylelint?: boolean;
}

export interface AppArguments extends AppProjectArgs {
  help?: string;
  h?: string;
}

interface QuestionSelect {
  name: PlgType;
  message: string;
  type: 'select';
  choices: {
    name: PlgType;
    value: PlgName;
  }[];
}

interface QuestionCheckbox {
  name: PlgType;
  type: 'checkbox';
  message: string;
  choices: { 
    name: string; 
    value: string; 
    checked?: boolean 
  }[];
}

export type QuestionList = (QuestionCheckbox | QuestionSelect)[];

export interface UserProject {
  markup: PlgMarkupName;
  style: PlgStyleName;
  script: PlgScriptName;
  prettier?: boolean;
  eslint?: boolean;
  stylelint?: boolean;
  [key: string]: PlgName | boolean;
}

export type ProjectInitData = {
  projectPath: string;
  projectName: string;
  packageName: string;
  relativePath: string;
  pkgManager: string;
  toСlean: boolean;
};

export interface Store {
  userChoice: UserProject;
  projectInitData: ProjectInitData;
  warnMsgs: string[];
  setUserChoiсe: (data: UserProject) => void;
  setProjectInitData: (data: ProjectInitData) => void;
  setWarnMsgs: (data: string) => void;
  getUserChoice: () => UserProject;
}

/* Configs */

export interface ParcelCfg {
  extends?: string[];
  reporters?: string[];
  transformers?: Record<string, string[]>;
}

export interface PackageJson {
  name: string;
  version: string;
  description: string;
  scripts: Record<string, string>;
  author: string;
  license: string;
  devDependencies: Record<string, string>;
}

export interface StyleLintCfg {
  extends?: string[];
  rules?: Record<string, string | boolean | string[]>;
  plugins?: string[];
}

export interface PostcssCfg {
  plugins?: Record<string, object>;
}

export interface TypescriptCfg {
  compilerOptions?: Record<string, string | boolean>;
  include?: string[];
  exclude?: string[];
}

export interface EslintCfg {
  env?: Record<string, boolean>;
  extends?: string[];
  parserOptions?: Record<string, number | string>;
  rules?: Record<string, string>;
  parser?: string;
  plugins?: string[];
}

export interface PrettierCfg {
  plugins?: string[];
  [key: string]: boolean | string | number | string[];
}

export type SassLintCfg = string;
