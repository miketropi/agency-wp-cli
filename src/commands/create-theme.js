import { askThemeQuestions } from '../prompts/theme.js';
import { generateTheme } from '../generator/theme.js';

export async function createTheme() {
  const config = await askThemeQuestions();
  await generateTheme(config);
}

