import path from 'path';
import { execSync } from 'child_process';
import { replaceRecursive } from '../utils.js';
import { TEMPLATE_REPOS } from '../constants.js';

export async function generateTheme(config) {
  const targetDir = path.resolve(process.cwd(), config.slug);

  console.log('📦 Cloning theme template...');
  execSync(
    `git clone ${TEMPLATE_REPOS.theme} "${targetDir}"`,
    { stdio: 'inherit' }
  );

  // remove git history
  execSync(`rm -rf "${targetDir}/.git"`);

  // replace placeholders
  await replaceRecursive(targetDir, {
    '__THEME_SLUG__': config.slug,
    '__THEME_NAME__': config.name,
    '__TEXT_DOMAIN__': config.slug,
  });

  console.log('✅ Theme created:', config.slug);
}

