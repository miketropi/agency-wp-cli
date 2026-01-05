import path from 'path';
import { execSync } from 'child_process';
import { replaceRecursive } from '../utils.js';
import { TEMPLATE_REPOS } from '../constants.js';

export async function generateTheme(config) {
  const targetDir = path.resolve(process.cwd(), config.THEME_SLUG);

  console.log('📦 Cloning theme template...');
  execSync(
    `git clone ${TEMPLATE_REPOS.theme} "${targetDir}"`,
    { stdio: 'inherit' }
  );

  // remove git history
  execSync(`rm -rf "${targetDir}/.git"`);

  // replace placeholders
  await replaceRecursive(targetDir, {
    '__THEME_SLUG__': config.THEME_SLUG,
    '__THEME_SLUG_FLAT__': config.THEME_SLUG.toLowerCase().replace(/-/g, '_'),
    '__THEME_NAME__': config.THEME_NAME,
    '__TEXT_DOMAIN__': config.TEXT_DOMAIN,
  });

  // CLI success message and next steps (with some color)
  const RESET = "\x1b[0m";
  const BOLD = "\x1b[1m";
  const YELLOW = "\x1b[33m";
  const CYAN = "\x1b[36m";
  const GREEN = "\x1b[32m";

  console.log();
  console.log(`${BOLD}${YELLOW}🎉 Theme scaffolded successfully!${RESET}`);
  console.log(`${BOLD}${CYAN}Quick start (build & watch):${RESET}\n`);
  
  // Step 1: Navigate to the directory
  console.log(`${BOLD}1.${RESET} Move into your theme directory:`);
  console.log(`   ${CYAN}cd "${config.THEME_SLUG}"${RESET}\n`);
  
  // Step 2: Install dependencies
  console.log(`${BOLD}2.${RESET} Install dependencies:`);
  console.log(`   ${CYAN}npm install${RESET}\n`);
  
  // Step 3: Start Sass watcher
  console.log(`${BOLD}3.${RESET} Start the Sass watcher:`);
  console.log(`   ${CYAN}npm run watch${RESET}     ${GREEN}# Compiles Sass files to assets/css/ and keeps them updated while you edit${RESET}\n`);
  
  console.log(`${YELLOW}For more information, check the README in your theme directory.${RESET}`);
  console.log();
  
  console.log(`🚀 Theme "${config.THEME_SLUG}" is ready to go! ✨`);
}

