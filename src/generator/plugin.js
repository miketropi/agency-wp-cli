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
    '__PLUGIN_SLUG_FLAT__': config.slug.replace(/[^a-zA-Z0-9]/g, ''),
    'wp-plugin-template': config.slug,
  });

  // Add color for emphasis to the message and shell commands
  const RESET = "\x1b[0m";
  const BOLD = "\x1b[1m";
  const YELLOW = "\x1b[33m";
  const CYAN = "\x1b[36m";
  const GREEN = "\x1b[32m";

  console.log();
  console.log(`${BOLD}${YELLOW}🎉 Plugin scaffolded successfully!${RESET}`);
  console.log(`${BOLD}${CYAN}Next steps to get started:${RESET}\n`);
  
  // Step 1: Navigate to the directory
  console.log(`${BOLD}1.${RESET} Move into your plugin directory:`);
  console.log(`   ${CYAN}cd "${config.slug}"${RESET}\n`);
  
  // Step 2: Install PHP dependencies
  console.log(`${BOLD}2.${RESET} Install PHP dependencies with Composer:`);
  console.log(`   ${CYAN}composer install${RESET}\n`);

  // Step 3: Install JavaScript dependencies
  console.log(`${BOLD}3.${RESET} Install JavaScript dependencies:`);
  console.log(
    `   ${CYAN}npm install --legacy-peer-deps${RESET}  ${GREEN}# '--legacy-peer-deps' can help resolve peer dependency warnings${RESET}\n`
  );

  // Step 4: Start development
  console.log(`${BOLD}4.${RESET} Start your development/build process:`);
  console.log(`   ${CYAN}npm run dev${RESET}     ${GREEN}# or 'npm run build' for a production build${RESET}\n`);

  console.log(`${YELLOW}For more information, check the README in your plugin directory.${RESET}`);
  console.log();

  console.log(`🚀 Boom! Plugin "${config.slug}" is live and ready to vibe! ✨`);
}

