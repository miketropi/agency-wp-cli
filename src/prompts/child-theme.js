import inquirer from 'inquirer';

export async function askChildThemeQuestions() {
  const questions = [
    {
      type: 'input',
      name: 'CHILD_THEME_SLUG',
      message: 'Child theme slug (folder name, lowercase, hyphens):',
      validate: input => /^[a-z0-9\-]+$/.test(input) || 'Use only lowercase letters, numbers, hyphens.',
    },
    {
      type: 'input',
      name: 'CHILD_THEME_NAME',
      message: 'Child theme display name:',
      validate: input => !!input || 'Display name is required.',
    },
    {
      type: 'input',
      name: 'PARENT_THEME_SLUG',
      message: 'Parent theme folder name:',
      validate: input => !!input || 'Parent theme folder name is required.',
    },
    {
      type: 'input',
      name: 'NAMESPACE',
      message: 'PHP Namespace (PascalCase, e.g., MyTheme or MyCompany\\MyTheme):',
      validate: input =>
        /^([A-Z][A-Za-z0-9]*)(\\[A-Z][A-Za-z0-9]*)*$/.test(input) ||
        'Use PascalCase, optionally with backslashes. Example: MyTheme or MyCompany\\MyTheme',
    },
    {
      type: 'input',
      name: 'CHILD_THEME_PREFIX',
      message: 'Prefix for function/class/CSS handles (PascalCase, e.g., MyTheme):',
      validate: input =>
        /^[A-Z][A-Za-z0-9]*$/.test(input) ||
        'Use PascalCase without spaces or special characters. Example: MyTheme',
    },
    {
      type: 'input',
      name: 'AUTHOR',
      message: 'Author (your name or company):',
      default: 'Your Agency',
    },
    {
      type: 'input',
      name: 'DESCRIPTION',
      message: 'Theme description:',
      default: 'A custom WordPress child theme.',
    },
    {
      type: 'input',
      name: 'VERSION',
      message: 'Version number (e.g., 1.0.0):',
      default: '1.0.0',
      validate: input => /^\d+\.\d+\.\d+$/.test(input) || 'Should be a version like 1.0.0',
    },
  ];

  return inquirer.prompt(questions);
}
