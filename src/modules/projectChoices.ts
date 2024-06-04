import { QuestionList, UserProject, AppProjectArgs, PluginBase } from 'types';
import checkbox from '@inquirer/checkbox';
import { select } from '@inquirer/prompts';
import { plugins } from 'modules/pluginFactory';
import chalk from 'chalk';

const preparedChoices = (data: PluginBase['name'][]) => {
  return data.reduce((acc, curr) => {
    const plg = plugins.getPluginData(curr);
    return [
      ...acc,
      {
        name: plg.title,
        value: plg.name,
      },
    ];
  }, []);
};

const questionsList: QuestionList = [
  {
    name: 'markup',
    type: 'select',
    message: 'Select markup engine:',
    choices: preparedChoices(['html', 'pug', 'ejs']),
  },
  {
    name: 'style',
    type: 'select',
    message: 'Select Style processing tool:',
    choices: preparedChoices(['css', 'sass', 'scss', 'less', 'stylus', 'tailwind']),
  },
  {
    name: 'script',
    type: 'select',
    message: 'Select JavaScript tool:',
    choices: preparedChoices(['javascript', 'typescript', 'jquery', 'jqueryts']),
  },
  {
    name: 'tools',
    type: 'checkbox',
    message: 'Add tools?',
    choices: [
      { name: 'prettier', value: 'prettier', checked: true },
      { name: 'stylelint', value: 'stylelint', checked: true },
      { name: 'eslint', value: 'eslint', checked: true },
    ]
  }
];

export async function projectChoices(argv: AppProjectArgs) {
  const userChoices: UserProject = {} as UserProject;

  Object.entries(argv).forEach(([key, value]) => {
    const question = questionsList.find((item) => item.name === key);
    if (question) {
      if (question.type === 'select') {
        const choice = question.choices.find((item) => item.value === value);
        if (choice) {
          userChoices[key] = choice.value;
        } else {
          console.warn(
            chalk.yellow('Warning:'),
            `The value for --${key} is invalid. See the help (--help, -h) for a list of valid options.`,
          );
        }
      } else if (question.type === 'checkbox') {
        userChoices[key] = value;
      }
    }
  });

  const prepareQuestionList = questionsList.filter((item) => !(item.name in userChoices));

  for (const question of prepareQuestionList) {
    const choice = questionsList.find((item) => item.name === question.name);

    switch (choice.type) {
      case 'select':
        userChoices[choice.name as keyof UserProject] = await select(choice);
        break;
      case 'checkbox':     
        (await checkbox(choice)).map((item) => {
          userChoices[item] = true;
        })        
        break;
      default:
        console.error(chalk.red('Error:'), `Unsupported question type`);
        throw new Error();
    }
  }


  console.log(userChoices);
  return userChoices;
}
