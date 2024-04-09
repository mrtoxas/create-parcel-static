interface Store {
  userProjectChoiсe: UserProjectChoiсes;
  projectInitData: ProjectInitData;
  warnMsgs: string[];
  setUserChoiсe: (data: UserProjectChoiсes) => void;
  setProjectInitData: (data: ProjectInitData) => void;
}

interface ChoiceDetails {
  name: string;
  title: string;
  extension: string;
}

type UserProjectChoiсes = {
  markup: ChoiceDetails & { name: 'html' | 'pug' | 'EJS' | 'Handlebars' };
  style: ChoiceDetails & { name: 'css' | 'scss' | 'sass' | 'stylus' | 'less' };
  script: ChoiceDetails & { name: 'js' | 'ts' };
  prettier?: boolean;
  eslint?: boolean;
  stylelint?: boolean;
};

type ProjectInitData = {
  projectPath: string;
  projectName: string;
  packageName: string;
  toСlean: boolean;
};

type Technologies = keyof UserProjectChoiсes;

interface QuestionConfig {
  type: keyof QuestionTypes;
  message: string;
  choices: {
    name: string;
    value: {
      name: string;
      title: string;
      extension: string;
    };
  }[];
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
  devDependencies: Record<string, string>;
}
