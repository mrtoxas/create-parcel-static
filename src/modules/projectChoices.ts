import { select, confirm } from '@inquirer/prompts';

const questionsList: QuestionList = {
  markup: {
    type: 'select',
    message: 'Select template engine:',
    choices: [
      {
        name: 'HTML',
        value: {
          name: 'html',
          title: 'HTML',
          extension: 'html',
        },
      },
      {
        name: 'Pug',
        value: {
          name: 'pug',
          title: 'Pug',
          extension: 'pug',
        },
      },
      {
        name: 'EJS',
        value: {
          name: 'ejs',
          title: 'EJS',
          extension: 'ejs',
        },
      },
      {
        name: 'Handlebars',
        value: {
          name: 'hbs',
          title: 'Handlebars',
          extension: 'hbs',
        },
      },
    ],
  },
  style: {
    type: 'select',
    message: 'Select CSS Preprocessor:',
    choices: [
      {
        name: 'CSS',
        value: {
          name: 'css',
          title: 'CSS',
          extension: 'css',
        },
      },
      {
        name: 'SASS (Indented Syntax)',
        value: {
          name: 'sass',
          title: 'SASS',
          extension: 'sass',
        },
      },
      {
        name: 'SASS (SCSS Syntax)',
        value: {
          name: 'scss',
          title: 'SCSS',
          extension: 'scss',
        },
      },
      {
        name: 'Less',
        value: {
          name: 'less',
          title: 'Less',
          extension: 'less',
        },
      },
      {
        name: 'Stylus',
        value: {
          name: 'stylus',
          title: 'STYLUS',
          extension: 'styl',
        },
      },
    ],
  },
  script: {
    type: 'select',
    message: 'Select JavaScript tool:',
    choices: [
      {
        name: 'JavaScript',
        value: {
          name: 'javascript',
          title: 'JavaScript',
          extension: 'js',
        },
      },
      {
        name: 'TypeScript',
        value: {
          name: 'typescript',
          title: 'TypeScript',
          extension: 'ts',
        },
      },
    ],
  },
  prettier: {
    type: 'confirm',
    message: 'Add Prettier?',
    default: true,
  },
  stylelint: {
    type: 'confirm',
    message: 'Add StyleLint?',
    default: true,
  },
  eslint: {
    type: 'confirm',
    message: 'Add ESLint?',
    default: true,
  },
};

async function choice(question: Technologies): Promise<string | boolean> {
  const obj = questionsList[question];
  switch (obj.type) {
    case 'select':
      return await select(obj as QuestionTypes['select']);
    case 'confirm':
      return await confirm(obj as QuestionTypes['confirm']);
    default:
      throw new Error(`Unsupported question type`);
  }
}

export async function projectChoices(keys: (keyof UserProjectChoiсes)[]): Promise<UserProjectChoiсes> {
  const choices: UserProjectChoiсes = {};

  for (const key of keys) choices[key] = await choice(key);

  return choices;
}
