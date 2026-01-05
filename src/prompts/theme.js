import inquirer from 'inquirer';

export async function askThemeQuestions() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'THEME_SLUG',
      message: 'Folder name for the theme (kebab-case):',
      default: 'wp-theme-template',
      validate: input => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(input) || 'Use kebab-case (e.g., my-theme-name)',
    },
    {
      type: 'input',
      name: 'THEME_NAME',
      message: 'Theme display name:',
      default: 'WP Theme Template',
      validate: input => !!input || 'Display name is required.',
    },
    {
      type: 'input',
      name: 'NAMESPACE',
      message: 'PHP namespace (PascalCase):',
      default: answers =>
        answers.THEME_SLUG
          ? answers.THEME_SLUG
              .split('-')
              .map(part => part.charAt(0).toUpperCase() + part.slice(1))
              .join('')
          : '',
      validate: input =>
        /^[A-Z][A-Za-z0-9]*([\\][A-Z][A-Za-z0-9]*)*$/.test(input) ||
        'Use PascalCase, optionally with backslashes. Example: MyTheme or MyCompany\\MyTheme',
    },
    {
      type: 'input',
      name: 'THEME_URI',
      message: "URL of the interface's public website:",
      default: '',
      validate: input => 
        input === '' || /^(https?:\/\/)?([^\s.]+\.\S{2,}|localhost[\:?\d]*)\S*$/.test(input) || 
        'Enter a valid URL (e.g., https://example.com) or leave blank.',
    },
    {
      type: 'input',
      name: 'TEXT_DOMAIN',
      message: 'Translation text domain:',
      default: answers => answers.THEME_SLUG || '',
      validate: input => !!input || 'Text domain is required.',
    },
  ]);
}

