import { select, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import { plugins } from 'modules/pluginFactory';
import { QuestionList, UserProject, AppArguments, Plugin } from 'types';

const preparedChoices = (plugins: Plugin[]) => {
  return plugins.reduce((acc, curr) => {
    return [
      ...acc,
      {
        name: curr.title,
        value: {
          name: curr.name,
          extension: curr.fileExt,
        },
      },
    ];
  }, []);
};

const questionsList: QuestionList = [
  {
    name: 'markup',
    type: 'select',
    message: 'Select markup engine:',
    choices: preparedChoices([plugins.html, plugins.pug, plugins.ejs]),
  },
  {
    name: 'style',
    type: 'select',
    message: 'Select Style processing tool:',
    choices: preparedChoices([plugins.css, plugins.sass, plugins.scss, plugins.less, plugins.stylus, plugins.tailwind]),
  },
  {
    name: 'script',
    type: 'select',
    message: 'Select JavaScript tool:',
    choices: preparedChoices([plugins.javascript, plugins.typescript, plugins.jquery, plugins.jqueryts]),
  },
  {
    name: plugins.prettier.name,
    type: 'confirm',
    message: `Add ${plugins.prettier.title}?`,
    default: true,
  },
  {
    name: plugins.stylelint.name,
    type: 'confirm',
    message: `Add ${plugins.stylelint.title}?`,
    default: true,
  },
  {
    name: plugins.eslint.name,
    type: 'confirm',
    message: `Add ${plugins.eslint.title}?`,
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
