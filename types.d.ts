interface Store {
  userProjectChoiсe: UserProjectChoiсes;
  projectInitData: ProjectInitData;
  finallyMsgs: string[];
  setUserChoiсe: (data: UserProjectChoiсes) => void;
  setProjectInitData: (data: ProjectInitData) => void;
}

type UserProjectChoiсes = {
  markup: {
    name: 'html' | 'pug' | 'EJS' | 'Handlebars';
    title: string;
    extension: string;
  }
  style: {
    name: 'css' | 'scss' | 'sass' | 'stylus';
    title: string;
    extension: string;
  };
  script: {
    name: 'js' | 'ts';
    title: string;
    extension: string;
  };
  prettier?: boolean;
  eslint?: boolean;
  stylelint?: boolean;
} | undefined;

type ProjectInitData = {
  projectPath: string;
  projectName: string;
  packageName: string;
  whetherToClear: boolean;
} | undefined;

type Technologies = keyof UserProjectChoiсes;

interface QuestionConfig {
  type: keyof QuestionTypes;
  message: string;
  choices: { name: string; value: string }[];
  default: boolean;
}

interface QuestionTypes {
  select: Pick<QuestionConfig, 'type' | 'message' | 'choices'>;
  confirm: Pick<QuestionConfig, 'type' | 'message' | 'default'>;
}

type QuestionList = Record<Technologies, QuestionTypes['select'] | QuestionTypes['confirm']>;

interface PackageJson {
  name: string;
  version: string;
  description: string;
  scripts: Record<string, string>;
  author: string;
  license: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}
