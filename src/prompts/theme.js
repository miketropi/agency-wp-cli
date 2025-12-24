import inquirer from 'inquirer';

export async function askThemeQuestions() {
  return inquirer.prompt([
    {
      name: 'slug',
      message: 'Theme slug (folder name):',
      validate: v => !!v,
    },
    {
      name: 'name',
      message: 'Theme name:',
      validate: v => !!v,
    },
    // namespace
    {
      name: 'namespace',
      message: 'PHP Namespace:',
      default: answers =>
        answers.slug
          .replace(/[^a-zA-Z0-9]/g, '')  // remove special chars, -, _, space
          .toUpperCase(),
    },
    // author
    {
      name: 'author',
      message: 'Author:',
      default: 'Your Agency',
    },
  ]);
}

