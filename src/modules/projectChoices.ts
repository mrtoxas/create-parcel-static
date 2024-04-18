import { select, confirm } from '@inquirer/prompts';
import { FileExt, QuestionList } from 'types';

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
          extension: FileExt.html,
        },
      },
      {
        name: 'Pug',
        value: {
          name: 'pug',
          title: 'Pug',
          extension: FileExt.pug,
        },
      },
      {
        name: 'EJS',
        value: {
          name: 'ejs',
          title: 'EJS',
          extension: FileExt.ejs,
        },
      },
      {
        name: 'Handlebars',
        value: {
          name: 'hbs',
          title: 'Handlebars',
          extension: FileExt.hbs,
        },
      },
    ],
  },
  style: {
    type: 'select',
    message: 'Select Style processing tool:',
    choices: [
      {
        name: 'CSS',
        value: {
          name: 'css',
          title: 'CSS',
          extension: FileExt.css,
        },
      },
      {
        name: 'SASS (Indented Syntax)',
        value: {
          name: 'sass',
          title: 'SASS',
          extension: FileExt.sass,
        },
      },
      {
        name: 'SASS (SCSS Syntax)',
        value: {
          name: 'scss',
          title: 'SCSS',
          extension: FileExt.scss,
        },
      },
      {
        name: 'Less',
        value: {
          name: 'less',
          title: 'Less',
          extension: FileExt.less,
        },
      },
      {
        name: 'Stylus',
        value: {
          name: 'stylus',
          title: 'STYLUS',
          extension: FileExt.stylus,
        },
      },
      {
        name: 'Tailwind',
        value: {
          name: 'tailwind',
          title: 'Tailwind',
          extension: FileExt.css,
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
          extension: FileExt.javascript,
        },
      },
      {
        name: 'TypeScript',
        value: {
          name: 'typescript',
          title: 'TypeScript',
          extension: FileExt.typescript,
        },
      },
      {
        name: 'JQuery',
        value: {
          name: 'jquery',
          title: 'JQuery',
          extension: FileExt.javascript,
        },
      },
      {
        name: 'JQuery (TypeScript)',
        value: {
          name: 'jquery',
          title: 'JQuery',
          extension: FileExt.typescript,
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

export async function projectChoices(argv) {
  const choices: UserProjectChoiсes = {} as UserProjectChoiсes;

  for (const [key, value] of Object.entries(argv)) {
    if (questionsList[key]) {
      if (questionsList[key].type === 'select') {
        const qListItem = questionsList[key].choices.find((item) => item.value.name === value);
        if (qListItem) choices[key] = qListItem.value;
      } else if (questionsList[key].type === 'confirm') {
        choices[key] = true;
      }
    }
  }

  const keys: (keyof UserProjectChoiсes)[] = ['markup', 'style', 'script', 'prettier', 'stylelint', 'eslint'].filter(
    (key) => !Object.keys(choices).includes(key),
  );

  if (keys.length) {
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
  }

  return choices;
}
