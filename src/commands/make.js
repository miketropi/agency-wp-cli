import { Command } from 'commander';
import { makeBlock } from './make-block.js';

export function makeCommand() {
	const cmd = new Command('make');

	cmd
		.description('Generate code inside an existing project, block')
		.argument('<type>', 'block')
		.action(async (type) => {
			switch (type) {
				case 'block':
					await makeBlock();
					break;

				default:
					console.error('❌ Unknown make type:', type);
					process.exit(1);
			}
		});

	return cmd;
}
