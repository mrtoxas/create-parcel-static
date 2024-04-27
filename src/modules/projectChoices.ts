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
          extension: FileExt.HTML,
        },
      },
      {
        name: 'Pug',
        value: {
          name: Tech.PUG,
          extension: FileExt.PUG,
        },
      },
      {
        name: 'EJS',
        value: {
          name: Tech.EJS,
          extension: FileExt.EJS,
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
          extension: FileExt.CSS,
        },
      },
      {
        name: 'SASS (Indented Syntax)',
        value: {
          name: Tech.SASS,
          extension: FileExt.SASS,
        },
      },
      {
        name: 'SASS (SCSS Syntax)',
        value: {
          name: Tech.SCSS,
          extension: FileExt.SCSS,
        },
      },
      {
        name: 'Less',
        value: {
          name: Tech.LESS,
          extension: FileExt.LESS,
        },
      },
      {
        name: 'Stylus',
        value: {
          name: Tech.STYLUS,
          extension: FileExt.STYLUS,
        },
      },
      {
        name: 'Tailwind',
        value: {
          name: Tech.TAILWIND,
          extension: FileExt.CSS,
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
          extension: FileExt.JAVASCRIPT,
        },
      },
      {
        name: 'TypeScript',
        value: {
          name: Tech.TYPESCRIPT,
          extension: FileExt.TYPESCRIPT,
        },
      },
      {
        name: 'JQuery',
        value: {
          name: Tech.JQUERY,
          extension: FileExt.JAVASCRIPT,
        },
      },
      {
        name: 'JQuery (TypeScript)',
        value: {
          name: Tech.JQUERY,
          extension: FileExt.TYPESCRIPT,
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
          userChoices[key] = choice.value;
        } else {
          console.warn(
            chalk.yellow('Warning:'),
            `The value for --${key} is invalid. See the help (--help, -h) for a list of valid options.`,
          );
        }
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
        console.error(chalk.red('Error:'), `Unsupported question type`);
        throw new Error();
    }
  }

  return userChoices;
}
