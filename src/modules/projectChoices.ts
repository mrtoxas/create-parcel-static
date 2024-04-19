import { select, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import { FileExt, QuestionList, Tech, UserProject, AppArguments } from 'types';

const questionsList: QuestionList = [
  {
    name: 'markup',
    type: 'select',
    message: 'Select markup engine:',
    choices: [
      {
        name: 'HTML',
        value: {
          name: Tech.HTML,
          extension: FileExt.html,
        },
      },
      {
        name: 'Pug',
        value: {
          name: Tech.PUG,
          extension: FileExt.pug,
        },
      },
      {
        name: 'EJS',
        value: {
          name: Tech.EJS,
          extension: FileExt.ejs,
        },
      },
      {
        name: 'Handlebars',
        value: {
          name: Tech.HANDLEBARS,
          extension: FileExt.hbs,
        },
      },
    ],
  },
  {
    name: 'style',
    type: 'select',
    message: 'Select Style processing tool:',
    choices: [
      {
        name: 'CSS',
        value: {
          name: Tech.CSS,
          extension: FileExt.css,
        },
      },
      {
        name: 'SASS (Indented Syntax)',
        value: {
          name: Tech.SASS,
          extension: FileExt.sass,
        },
      },
      {
        name: 'SASS (SCSS Syntax)',
        value: {
          name: Tech.SCSS,
          extension: FileExt.scss,
        },
      },
      {
        name: 'Less',
        value: {
          name: Tech.LESS,
          extension: FileExt.less,
        },
      },
      {
        name: 'Stylus',
        value: {
          name: Tech.STYLUS,
          extension: FileExt.stylus,
        },
      },
      {
        name: 'Tailwind',
        value: {
          name: Tech.TAILWIND,
          extension: FileExt.css,
        },
      },
    ],
  },
  {
    name: 'script',
    type: 'select',
    message: 'Select Style processing tool:',
    choices: [
      {
        name: 'JavaScript',
        value: {
          name: Tech.JAVASCRIPT,
          extension: FileExt.javascript,
        },
      },
      {
        name: 'TypeScript',
        value: {
          name: Tech.TYPESCRIPT,
          extension: FileExt.typescript,
        },
      },
      {
        name: 'JQuery',
        value: {
          name: Tech.JQUERY,
          extension: FileExt.javascript,
        },
      },
      {
        name: 'JQuery (TypeScript)',
        value: {
          name: Tech.JQUERY,
          extension: FileExt.typescript,
        },
      },
    ],
  },
  {
    name: 'prettier',
    type: 'confirm',
    message: 'Add Prettier?',
    default: true,
  },
  {
    name: 'stylelint',
    type: 'confirm',
    message: 'Add StyleLint?',
    default: true,
  },
  {
    name: 'eslint',
    type: 'confirm',
    message: 'Add ESLint?',
    default: true,
  },
];

export async function projectChoices(argv: AppArguments) {
  const userChoices: UserProject = {} as UserProject;

  Object.entries(argv).forEach(([key, value]) => {
    const question = questionsList.find((item) => item.name === key);
    if (question) {
      if (question.type === 'select') {
        const choice = question.choices.find((item) => item.value.name === value);
        if (choice) {
          userChoices[key] = choice.value
        } else {
          console.warn(chalk.yellow('Warning:'), `The value for --${key} is invalid. See the help (--help, -h) for a list of valid options.`)
        };
      } else if (question.type === 'confirm') {
        userChoices[key] = value;
      }
    }
  });

  const prepareQuestionList = questionsList.filter((item) => item.name in userChoices === false);

  for (const question of prepareQuestionList) {
    const choice = questionsList.find((item) => item.name === question.name);

    switch (choice.type) {
      case 'select':
        userChoices[choice.name] = await select(choice);
        break;
      case 'confirm':
        userChoices[choice.name] = await confirm(choice);
        break;
      default:
        throw new Error(`Unsupported question type`);
    }
  }

  return userChoices;
}
