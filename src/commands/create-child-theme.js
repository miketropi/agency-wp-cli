import { askChildThemeQuestions } from '../prompts/child-theme.js';
import { generateChildTheme } from '../generator/child-theme.js';

export async function createChildTheme() {
  const config = await askChildThemeQuestions();
  await generateChildTheme(config);
}

