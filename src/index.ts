#!/usr/bin/env node

/**
 * prompt-scaffold — Universal AI-Ready Project Scaffolder
 *
 * Generates projects with built-in context rules for
 * Cursor, Windsurf, GitHub Copilot, and Claude Code / Antigravity.
 */

import { gatherProjectConfig } from './prompts.js';
import { scaffoldProject } from './scaffold.js';

async function main(): Promise<void> {
  try {
    const config = await gatherProjectConfig();

    if (!config) {
      process.exit(1);
    }

    await scaffoldProject(config);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\n❌ Error: ${error.message}\n`);

      if (process.env.DEBUG) {
        console.error(error.stack);
      }
    } else {
      console.error('\n❌ An unexpected error occurred.\n');
    }

    process.exit(1);
  }
}

main();
