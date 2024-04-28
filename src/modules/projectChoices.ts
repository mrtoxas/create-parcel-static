import { select, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import { plugins } from 'modules/pluginFactory';
import { QuestionList, UserProject, AppArguments } from 'types';

const questionsList: QuestionList = [
  {
    name: 'markup',
    type: 'select',
    message: 'Select markup engine:',
    choices: [
      {
        name: plugins.html.title,
        value: {
          name: plugins.html.name,
          extension: plugins.html.fileExt,
        },
      },
      {
        name: plugins.pug.title,
        value: {
          name: plugins.pug.name,
          extension: plugins.pug.fileExt,
        },
      },
      {
        name: plugins.ejs.title,
        value: {
          name: plugins.ejs.name,
          extension: plugins.ejs.fileExt,
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
        name: plugins.css.title,
        value: {
          name: plugins.css.name,
          extension: plugins.css.fileExt,
        },
      },
      {
        name: plugins.sass.title,
        value: {
          name: plugins.sass.name,
          extension: plugins.sass.fileExt,
        },
      },
      {
        name: plugins.scss.title,
        value: {
          name: plugins.scss.name,
          extension: plugins.scss.fileExt,
        },
      },
      {
        name: plugins.less.title,
        value: {
          name: plugins.less.name,
          extension: plugins.less.fileExt,
        },
      },
      {
        name: plugins.stylus.title,
        value: {
          name: plugins.stylus.name,
          extension: plugins.stylus.fileExt,
        },
      },
      {
        name: plugins.tailwind.title,
        value: {
          name: plugins.tailwind.name,
          extension: plugins.tailwind.fileExt,
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
        name: plugins.javascript.title,
        value: {
          name: plugins.javascript.name,
          extension: plugins.javascript.fileExt,
        },
      },
      {
        name: plugins.typescript.title,
        value: {
          name: plugins.typescript.name,
          extension: plugins.typescript.fileExt,
        },
      },
      {
        name: plugins.jquery.title,
        value: {
          name: plugins.jquery.name,
          extension: plugins.jquery.fileExt,
        },
      },
      {
        name: plugins.jqueryts.title,
        value: {
          name: plugins.jqueryts.name,
          extension: plugins.jqueryts.fileExt,
        },
      },
    ],
  },
  {
    name: plugins.prettier.name,
    type: 'confirm',
    message: 'Add Prettier?',
    default: true,
  },
  {
    name: plugins.stylelint.name,
    type: 'confirm',
    message: 'Add StyleLint?',
    default: true,
  },
  {
    name: plugins.eslint.name,
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
