#!/usr/bin/env node

/**
 * prompt-scaffold — Universal AI-Ready Project Scaffolder
 *
 * Generates projects with built-in context rules for
 * Cursor, Windsurf, GitHub Copilot, and Claude Code / Antigravity.
 */

import { parseArgs, printHelp, printVersion } from './cli.js';
import { gatherProjectConfig, gatherInjectConfig } from './prompts.js';
import { scaffoldProject, injectRules, dryRunProject } from './scaffold.js';
import { updateRules } from './update.js';
import { detectTemplate, getTemplateLabel } from './detect.js';
import pc from 'picocolors';

async function main(): Promise<void> {
  try {
    const args = parseArgs();

    // ── Handle --help ──────────────────────────────────────────
    if (args.help) {
      printHelp();
      process.exit(0);
    }

    // ── Handle --version ───────────────────────────────────────
    if (args.version) {
      printVersion();
      process.exit(0);
    }

    // ── Update Mode ────────────────────────────────────────────
    if (args.update) {
      await updateRules();
      return;
    }

    // ── Inject Mode ────────────────────────────────────────────
    if (args.inject) {
      // Auto-detect stack if template not provided
      let detectedTemplate = args.template ? null : detectTemplate(process.cwd());

      if (detectedTemplate && !args.template) {
        console.log(
          `\n  ${pc.cyan('ℹ')} Auto-detected: ${pc.bold(getTemplateLabel(detectedTemplate))}\n`
        );
      }

      const injectConfig = await gatherInjectConfig(args, detectedTemplate);

      if (!injectConfig) {
        process.exit(1);
      }

      await injectRules(injectConfig.template);
      return;
    }

    // ── Scaffold Mode (default) ────────────────────────────────
    const config = await gatherProjectConfig(args);

    if (!config) {
      process.exit(1);
    }

    // ── Dry Run ────────────────────────────────────────────────
    if (args.dryRun) {
      await dryRunProject(config);
      return;
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
