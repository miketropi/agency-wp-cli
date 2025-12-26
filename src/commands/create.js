import { Command } from 'commander';
import { createPlugin } from './create-plugin.js';
import { createTheme } from './create-theme.js';

export function createCommand() {
  const cmd = new Command('create');

  cmd
    .description('Create WordPress resources, plugin | theme | block')
    .argument('<type>', 'plugin | theme')
    .action(async (type) => {
      switch (type) {
        case 'plugin':
          await createPlugin();
          break;
        case 'theme':
          await createTheme();
          break;
        default:
          console.error('❌ Unknown type:', type);
          process.exit(1);
      }
    });

  return cmd;
}

