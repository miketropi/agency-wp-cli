#!/usr/bin/env node

import { Command } from 'commander';
import { createCommand } from '../src/commands/create.js';

const program = new Command();

program
  .name('agency-wp-cli')
  .description('Agency WordPress scaffolding CLI')
  .version('1.0.0');

program.addCommand(createCommand());

program.parse();
