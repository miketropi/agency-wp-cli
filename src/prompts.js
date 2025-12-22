import inquirer from 'inquirer';

export async function askConfig() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'slug',
      message: 'Plugin slug (folder name):',
      validate: v => v ? true : 'Required',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Plugin name:',
    },
    {
      type: 'input',
      name: 'namespace',
      message: 'PHP Namespace:',
      default: answers =>
        answers.slug.replace(/-([a-z])/g, g => g[1].toUpperCase()).toUpperCase()
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:',
      default: 'Your Agency',
    },
  ]);
}
