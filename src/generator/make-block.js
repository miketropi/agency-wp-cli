import path from 'path';
import fs, { copy } from 'fs-extra';
import { fileURLToPath } from 'url';
import { replaceRecursive, findMainPluginFile } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add color for emphasis to the message and shell commands
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";

/**
 * Generate a block
 * 
 * @param {*} config 
 */
export async function generateMakeBlock(config) { 
  const cwd = process.cwd(); // currently in the plugin directory
  const templateDir = path.resolve(__dirname, '../templates/make-block');
  
  // Try to scan for the main plugin PHP file by detecting potential WordPress plugin loader.
  // Look for a file in cwd that contains the plugin header ("Plugin Name:")
  const mainPluginFile = findMainPluginFile(cwd);

  if (!mainPluginFile) {
    console.error(`${BOLD}${YELLOW}😵‍💫 Oops! Can't spot your main plugin file here!${RESET}\n\nIt looks like this folder is missing a WordPress plugin loader (no PHP file with a plugin header like "Plugin Name:").\n\n${CYAN}✨ Pro tip:${RESET} Make sure you're standing inside your main plugin's home before running this command. You'll be vibin' soon! 🚀`);
    process.exit(1);
  }
  
  // plugin slug is the name of the plugin file.
  const pluginSlug = cwd.split('/').pop().split('.').shift();

  // new block directory is the plugin directory/src/blocks/config.slug
  const newBlockDir = path.join(cwd, 'src', 'blocks', config.slug); 

  // check if the block directory already exists.
  if (fs.existsSync(newBlockDir)) {
    console.error('❌ Block already exists:', config.slug);
    process.exit(1);
  }

  // Copy template directory to the new block directory.
  await copy(templateDir, newBlockDir);

  // Replace placeholders in the new block directory.
  await replaceRecursive(newBlockDir, {
    '__PLUGIN_SLUG__': pluginSlug,
    '__BLOCK_SLUG__': config.slug,
    '__BLOCK_NAME__': config.name,
  });

  console.log('✅ Block created:', config.slug);
  console.log();
  console.log(`${BOLD}${YELLOW}🎉 Block created successfully!${RESET}`);
}