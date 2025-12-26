#!/usr/bin/env node

import { Command } from 'commander';
import { createCommand } from '../src/commands/create.js';
import { makeCommand } from '../src/commands/make.js';

const program = new Command();

program
  .name('agency-wp-cli')
  .description('Agency WordPress scaffolding CLI')
  .version('1.0.2');

program.addCommand(createCommand());
program.addCommand(makeCommand());
program.parse();
