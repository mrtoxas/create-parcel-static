interface Store {
  userProjectChoiсe: UserProjectChoiсes;
  projectData: ProjectData;
  setUserChoiсe: (key: keyof UserProjectChoiсes, value: string | boolean) => void;
  setProjectData: (data: ProjectData) => void;
}

interface ProjectData {
  projectPath: string | undefined;
  projectName: string | undefined;
  packageName: string | undefined;
  whetherToClear: boolean;
}

interface UserProjectChoiсes {
  markup: 'html' | 'pug' | 'EJS' | 'Handlebars' | undefined;
  style: 'css' | 'scss' | 'sass' | 'stylus' | undefined;
  script: 'js' | 'ts' | undefined;
  prettier?: boolean;
  eslint?: boolean;
  stylelint?: boolean;
}

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
