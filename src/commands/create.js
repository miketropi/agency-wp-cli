import { Command } from 'commander';
import { createPlugin } from './create-plugin.js';
import { createTheme } from './create-theme.js';
import { createChildTheme } from './create-child-theme.js';

export function createCommand() {
  const cmd = new Command('create');

  cmd
    .description('Create WordPress resources, plugin | theme | child_theme')
    .argument('<type>', 'plugin | theme | child_theme')
    .action(async (type) => {
      switch (type) {
        case 'plugin':
          await createPlugin();
          break;
        case 'theme':
          await createTheme();
          break;
        case 'child_theme':
          await createChildTheme();
          break;
        default:
          console.error('❌ Unknown type:', type);
          process.exit(1);
      }
    });

  return cmd;
}

