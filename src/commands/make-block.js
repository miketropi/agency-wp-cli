import { askMakeBlockQuestions } from '../prompts/make-block.js';
import { generateMakeBlock } from '../generator/make-block.js';

export async function makeBlock() {
  const config = await askMakeBlockQuestions();
  await generateMakeBlock(config);
}

