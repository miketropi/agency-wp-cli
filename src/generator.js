import path from 'path';
import { execSync } from 'child_process';
import { replaceRecursive } from './utils.js';

export async function generatePlugin(config) {
  const targetDir = path.resolve(process.cwd(), config.slug);

  // 1. Clone template repo
  execSync(
    `git clone git@github.com:miketropi/wp-plugin-template.git ${targetDir}`,
    { stdio: 'inherit' }
  );

  // 2. Remove git history
  execSync(`rm -rf ${targetDir}/.git`);

  // 3. Replace placeholders
  await replaceRecursive(targetDir, {
    '__PLUGIN_SLUG__': config.slug,
    '__PLUGIN_NAME__': config.name,
    '__NAMESPACE__': config.namespace,
    '__AUTHOR__': config.author,
    '__TEXT_DOMAIN__': config.slug,
  });

  console.log('✅ Plugin generated at', targetDir);
}
