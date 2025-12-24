import path from 'path';
import { execSync } from 'child_process';
import { replaceRecursive } from '../utils.js';
import { TEMPLATE_REPOS } from '../constants.js';

export async function generateBlock(config) {
  const targetDir = path.resolve(process.cwd(), config.slug);

  console.log('📦 Cloning block template...');
  execSync(
    `git clone ${TEMPLATE_REPOS.block} "${targetDir}"`,
    { stdio: 'inherit' }
  );

  // remove git history
  execSync(`rm -rf "${targetDir}/.git"`);

  // replace placeholders
  await replaceRecursive(targetDir, {
    '__BLOCK_SLUG__': config.slug,
    '__BLOCK_NAME__': config.name,
    '__NAMESPACE__': config.namespace,
    '__TEXT_DOMAIN__': config.slug,
  });

  console.log('✅ Block created:', config.slug);
}

