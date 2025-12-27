import path from 'path';
import { execSync } from 'child_process';
import { replaceRecursive } from '../utils.js';
import { TEMPLATE_REPOS } from '../constants.js';

export async function generateChildTheme(config) {
  // Use the folder slug as directory name
  const targetDir = path.resolve(process.cwd(), config.CHILD_THEME_SLUG);

  console.log('🧒 Cloning child theme template...');
  execSync(
    `git clone ${TEMPLATE_REPOS.child_theme} "${targetDir}"`,
    { stdio: 'inherit' }
  );

  // Remove git history
  execSync(`rm -rf "${targetDir}/.git"`);

  // Replace placeholders in all files recursively
  await replaceRecursive(targetDir, {
    '__CHILD_THEME_SLUG__': config.CHILD_THEME_SLUG,
    '__CHILD_THEME_NAME__': config.CHILD_THEME_NAME,
    '__PARENT_THEME_SLUG__': config.PARENT_THEME_SLUG,
    '__NAMESPACE__': config.NAMESPACE,
    '__CHILD_THEME_PREFIX__': config.CHILD_THEME_PREFIX,
    '__AUTHOR__': config.AUTHOR,
    '__DESCRIPTION__': config.DESCRIPTION,
    '__VERSION__': config.VERSION,
    // Sometimes templates use "text domain":
    '__TEXT_DOMAIN__': config.CHILD_THEME_SLUG,
  });

  // CLI success message and next steps (with some color)
  const RESET = "\x1b[0m";
  const BOLD = "\x1b[1m";
  const YELLOW = "\x1b[33m";
  const CYAN = "\x1b[36m";
  const GREEN = "\x1b[32m";

  console.log();
  console.log(`${BOLD}${YELLOW}🎉 Child theme scaffolded successfully!${RESET}`);
  console.log(`${BOLD}${CYAN}Next steps to get started:${RESET}\n`);
  
  // Step 1: cd
  console.log(`${BOLD}1.${RESET} Move into your child theme directory:`);
  console.log(`   ${CYAN}cd "${config.CHILD_THEME_SLUG}"${RESET}\n`);

  // Final note
  console.log(`${YELLOW}For more information, check the README in your child theme directory.${RESET}`);
  console.log();
  console.log(`🚀 Child theme "${config.CHILD_THEME_SLUG}" is ready to go! ✨`);
}
