import { askBlockQuestions } from '../prompts/block.js';
import { generateBlock } from '../generator/block.js';

export async function createBlock() {
  const config = await askBlockQuestions();
  await generateBlock(config);
}

