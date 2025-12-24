import { askPluginQuestions } from '../prompts/plugin.js';
import { generatePlugin } from '../generator/plugin.js';

export async function createPlugin() {
  const config = await askPluginQuestions();
  await generatePlugin(config);
}

