import { select, confirm } from '@inquirer/prompts';

enum FileExtensions {
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
          extension: FileExtensions.html,
        },
      },
      {
        name: 'Pug',
        value: {
          name: 'pug',
          title: 'Pug',
          extension: FileExtensions.pug,
        },
      },
      {
        name: 'EJS',
        value: {
          name: 'ejs',
          title: 'EJS',
          extension: FileExtensions.ejs,
        },
      },
      {
        name: 'Handlebars',
        value: {
          name: 'hbs',
          title: 'Handlebars',
          extension: FileExtensions.hbs,
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
          extension: FileExtensions.css,
        },
      },
      {
        name: 'SASS (Indented Syntax)',
        value: {
          name: 'sass',
          title: 'SASS',
          extension: FileExtensions.sass,
        },
      },
      {
        name: 'SASS (SCSS Syntax)',
        value: {
          name: 'scss',
          title: 'SCSS',
          extension: FileExtensions.scss,
        },
      },
      {
        name: 'Less',
        value: {
          name: 'less',
          title: 'Less',
          extension: FileExtensions.less,
        },
      },
      {
        name: 'Stylus',
        value: {
          name: 'stylus',
          title: 'STYLUS',
          extension: FileExtensions.stylus,
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
          extension: FileExtensions.javascript,
        },
      },
      {
        name: 'TypeScript',
        value: {
          name: 'typescript',
          title: 'TypeScript',
          extension: FileExtensions.typescript,
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

export async function projectChoices(keys: (keyof UserProjectChoiсes)[]) {
  const choices: UserProjectChoiсes = {} as UserProjectChoiсes;

  for (const key of keys) {
    const question = questionsList[key];

    switch (question.type) {
      case 'select':
        (choices[key] as ChoiceDetails) = await select(question as QuestionTypes['select']);
        break;
      case 'confirm':
        (choices[key] as boolean) = await confirm(question as QuestionTypes['confirm']);
        break;
      default:
        throw new Error(`Unsupported question type`);
    }
  }

  return choices;
}
