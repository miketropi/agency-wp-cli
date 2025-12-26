import inquirer from 'inquirer';

export async function askMakeBlockQuestions() {
  return inquirer.prompt([
    {
      name: 'name',
      message: 'Block name:',
      validate: v => !!v || 'Block name is required.'
    },
    {
      name: 'slug',
      message: 'Block slug (folder name):',
      validate: v => !!v || 'Block slug is required.',
      default: answers =>
        answers.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
    },
  ]);
}

