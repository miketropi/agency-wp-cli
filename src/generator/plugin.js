import path from 'path';
import { execSync } from 'child_process';
import { replaceRecursive } from '../utils.js';
import { TEMPLATE_REPOS } from '../constants.js';

export async function generatePlugin(config) {
  const targetDir = path.resolve(process.cwd(), config.slug);

  console.log('📦 Cloning plugin template...');
  execSync(
    `git clone ${TEMPLATE_REPOS.plugin} "${targetDir}"`,
    { stdio: 'inherit' }
  );

  // remove git history
  execSync(`rm -rf "${targetDir}/.git"`);

  // replace placeholders
  await replaceRecursive(targetDir, {
    '__PLUGIN_SLUG__': config.slug,
    '__PLUGIN_NAME__': config.name,
    '__NAMESPACE__': config.namespace,
    '__AUTHOR__': config.author,
    '__TEXT_DOMAIN__': config.slug,
    'wp-plugin-template': config.slug,
  });

  console.log('✅ Plugin created:', config.slug);
}

