import inquirer from 'inquirer';

export async function askPluginQuestions() {
  return inquirer.prompt([
    {
      name: 'slug',
      message: 'Plugin slug (folder name):',
      validate: v => !!v,
    },
    {
      name: 'name',
      message: 'Plugin name:',
      validate: v => !!v,
    },
    {
      name: 'namespace',
      message: 'PHP Namespace:',
      default: answers =>
        answers.slug
          .replace(/[^a-zA-Z0-9]/g, '')  // remove special chars, -, _, space
          .toUpperCase(),
    },
    {
      name: 'author',
      message: 'Author:',
      default: 'Your Agency',
    },
  ]);
}

