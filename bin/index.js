#!/usr/bin/env node

import { askConfig } from '../src/prompts.js';
import { generatePlugin } from '../src/generator.js';

const config = await askConfig();
await generatePlugin(config);
