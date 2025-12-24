import inquirer from 'inquirer';

export async function askBlockQuestions() {
  return inquirer.prompt([
    {
      name: 'slug',
      message: 'Block slug (folder name):',
      validate: v => !!v,
    },
    {
      name: 'name',
      message: 'Block name:',
      validate: v => !!v,
    },
    {
      name: 'namespace',
      message: 'PHP Namespace:',
      default: answers =>
        answers.slug
          .replace(/-./g, x => x[1].toUpperCase())
          .replace(/^\w/, c => c.toUpperCase()),
    },
  ]);
}

