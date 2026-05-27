import path from 'node:path';
import fs from 'fs-extra';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import type { Template } from './types.js';
import { TEMPLATE_LABELS } from './types.js';
import { detectTemplate, getTemplateLabel } from './detect.js';
import { generateAIRuleFiles } from './ai-rules/generator.js';

/**
 * The AI rule files that prompt-scaffold manages.
 */
const MANAGED_FILES = [
  '.cursorrules',
  '.windsurfrules',
  '.github/copilot-instructions.md',
  'AI_INSTRUCTIONS.md',
];

/**
 * Updates AI context rules in an existing project.
 *
 * - Auto-detects the project stack
 * - Shows which files will be updated
 * - Preserves .aicustomrules
 * - Regenerates all 4 AI rule files with latest content
 */
export async function updateRules(): Promise<void> {
  const projectRoot = process.cwd();

  p.intro(
    `${pc.bgYellow(pc.black(' prompt-scaffold '))} ${pc.dim('— Update AI Context Rules')}`
  );

  // ── Step 1: Detect current stack ──────────────────────────────
  const s1 = p.spinner();
  s1.start('Detecting project stack...');

  const detected = detectTemplate(projectRoot);

  if (!detected) {
    s1.stop(`${pc.red('✗')} Could not detect project stack`);
    p.log.warning(
      `No recognized framework detected in ${pc.dim(projectRoot)}\n` +
      `${pc.dim('Supported:')} Next.js, React+Vite, Express, NestJS, FastAPI, Django\n\n` +
      `${pc.dim('Try:')} ${pc.cyan('prompt-scaffold --inject --template <template>')}`
    );
    process.exit(1);
  }

  s1.stop(`${pc.green('✓')} Detected ${pc.bold(pc.cyan(getTemplateLabel(detected)))}`);

  // ── Step 2: Check existing rule files ─────────────────────────
  const existingFiles: string[] = [];
  const missingFiles: string[] = [];

  for (const file of MANAGED_FILES) {
    if (await fs.pathExists(path.join(projectRoot, file))) {
      existingFiles.push(file);
    } else {
      missingFiles.push(file);
    }
  }

  if (existingFiles.length === 0 && missingFiles.length === MANAGED_FILES.length) {
    p.log.info(
      `No existing AI rule files found. This will create all ${MANAGED_FILES.length} files.`
    );
  } else {
    p.log.info(
      `${pc.bold(String(existingFiles.length))} file(s) will be updated, ` +
      `${pc.bold(String(missingFiles.length))} will be created.`
    );
  }

  // ── Step 3: Confirm ───────────────────────────────────────────
  const shouldProceed = await p.confirm({
    message: `Update AI rules for ${pc.bold(TEMPLATE_LABELS[detected])}?`,
    initialValue: true,
  });

  if (p.isCancel(shouldProceed) || !shouldProceed) {
    p.cancel('Update cancelled.');
    process.exit(0);
  }

  // ── Step 4: Regenerate rule files ─────────────────────────────
  const s2 = p.spinner();
  s2.start('Regenerating AI context rules with latest standards...');

  const ruleFiles = generateAIRuleFiles(detected, projectRoot);

  for (const file of ruleFiles) {
    const fullPath = path.join(projectRoot, file.path);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, file.content, 'utf-8');
  }

  s2.stop(`${pc.green('✓')} Updated ${pc.bold(String(ruleFiles.length))} AI context rule files`);

  // ── Step 5: Report ────────────────────────────────────────────
  const customRulesPath = path.join(projectRoot, '.aicustomrules');
  const hasCustomRules = await fs.pathExists(customRulesPath);

  p.note(
    [
      `${pc.bold(pc.green('AI Context Rules Updated!'))}`,
      '',
      ...ruleFiles.map(f => {
        const existed = existingFiles.includes(f.path);
        const icon = existed ? pc.yellow('↻') : pc.green('+');
        return `  ${icon} ${f.path}  ${pc.dim(existed ? '(updated)' : '(created)')}`;
      }),
      '',
      hasCustomRules
        ? `${pc.green('✓')} Custom rules from ${pc.bold('.aicustomrules')} were merged.`
        : `${pc.dim('Tip: Create')} ${pc.bold('.aicustomrules')} ${pc.dim('to add team-specific conventions.')}`,
    ].join('\n'),
    'Update Complete'
  );

  p.outro(
    `${pc.bgYellow(pc.black(' prompt-scaffold '))} ${pc.green('Rules updated!')} ${pc.dim('— Latest AI standards applied ✨')}`
  );
}
