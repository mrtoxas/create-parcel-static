import { select, confirm } from '@inquirer/prompts';

const questionsList: QuestionList = {
  markup: {
    type: 'select',
    message: 'Select template engine:',
    choices: [
      {
        name: 'HTML',
        value: 'html',
      },
      {
        name: 'Pug',
        value: 'pug',
      },
      {
        name: 'EJS',
        value: 'ejs',
      },
      {
        name: 'Handlebars',
        value: 'hbs',
      },
    ],
  },
  style: {
    type: 'select',
    message: 'Select CSS Preprocessor:',
    choices: [
      {
        name: 'CSS',
        value: 'css',
      },
      {
        name: 'SASS (Indented Syntax)',
        value: 'sass',
      },
      {
        name: 'SASS (SCSS Syntax)',
        value: 'scss',
      },
      {
        name: 'Less',
        value: 'less',
      },
      {
        name: 'Stylus',
        value: 'stylus',
      },
    ],
  },
  script: {
    type: 'select',
    message: 'Select JavaScript tool:',
    choices: [
      {
        name: 'JavaScript',
        value: 'javascript',
      },
      {
        name: 'TypeScript',
        value: 'typescript',
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

export async function choice(question: Technologies): Promise<string | boolean> {
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
