import path from 'node:path';
import fs from 'fs-extra';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import type { ProjectConfig, GeneratedFile } from './types.js';
import { getNextjsFiles } from './templates/nextjs.js';
import { getFastapiFiles } from './templates/fastapi.js';
import { getExpressFiles } from './templates/express.js';
import { generateAIRuleFiles } from './ai-rules/generator.js';

/**
 * Template metadata for display purposes.
 */
const TEMPLATE_META = {
  nextjs: {
    label: 'Next.js Web App',
    icon: '▲',
    color: pc.cyan,
    installCmd: (pm: string) => `${pm} install`,
    devCmd: (pm: string) => `${pm} run dev`,
  },
  fastapi: {
    label: 'Python FastAPI',
    icon: '⚡',
    color: pc.green,
    installCmd: () => 'pip install -r requirements.txt',
    devCmd: () => 'uvicorn app.main:app --reload',
  },
  express: {
    label: 'Node.js Express API',
    icon: '🚂',
    color: pc.yellow,
    installCmd: (pm: string) => `${pm} install`,
    devCmd: (pm: string) => `${pm} run dev`,
  },
} as const;

/**
 * Returns the list of boilerplate files for the chosen template.
 */
function getTemplateFiles(config: ProjectConfig): GeneratedFile[] {
  switch (config.template) {
    case 'nextjs':
      return getNextjsFiles(config.name);
    case 'fastapi':
      return getFastapiFiles(config.name);
    case 'express':
      return getExpressFiles(config.name);
  }
}

/**
 * Writes an array of GeneratedFile objects to disk under the project root.
 */
async function writeFiles(projectRoot: string, files: GeneratedFile[]): Promise<number> {
  let count = 0;
  for (const file of files) {
    const fullPath = path.join(projectRoot, file.path);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, file.content, 'utf-8');
    count++;
  }
  return count;
}

/**
 * Generates a project README.md tailored to the template.
 */
function generateProjectReadme(config: ProjectConfig): GeneratedFile {
  const meta = TEMPLATE_META[config.template];

  return {
    path: 'README.md',
    content: `# ${config.name}

> ${meta.icon} ${meta.label} — scaffolded with [prompt-scaffold](https://github.com/prompt-scaffold/prompt-scaffold)

## Getting Started

\`\`\`bash
# Install dependencies
${meta.installCmd(config.packageManager)}

# Start development server
${meta.devCmd(config.packageManager)}
\`\`\`

## AI-Ready Development

This project includes **Universal AI Context Rules** — pre-configured instruction files
that ensure any AI coding assistant understands your project architecture:

| File | AI Tool |
|------|---------|
| \`.cursorrules\` | Cursor IDE |
| \`.windsurfrules\` | Windsurf IDE |
| \`.github/copilot-instructions.md\` | GitHub Copilot |
| \`AI_INSTRUCTIONS.md\` | Claude Code, Antigravity, and other CLI agents |

These files contain stack-specific coding standards, project structure rules,
and best practices that guide AI assistants to write code consistent with your architecture.

## Project Structure

See \`AI_INSTRUCTIONS.md\` for the full project structure and coding standards.

## License

MIT
`,
  };
}

/**
 * Main scaffolding orchestrator.
 * Creates the project directory, writes template files, generates AI rules,
 * and displays a polished success message.
 */
export async function scaffoldProject(config: ProjectConfig): Promise<void> {
  const projectRoot = path.resolve(process.cwd(), config.name);
  const meta = TEMPLATE_META[config.template];

  // ── Check if directory already exists ──────────────────────────────
  if (await fs.pathExists(projectRoot)) {
    const isEmpty = (await fs.readdir(projectRoot)).length === 0;
    if (!isEmpty) {
      const shouldContinue = await p.confirm({
        message: `Directory "${config.name}" already exists and is not empty. Continue anyway?`,
        initialValue: false,
      });

      if (p.isCancel(shouldContinue) || !shouldContinue) {
        p.cancel('Scaffolding cancelled.');
        process.exit(0);
      }
    }
  }

  // ── Create project directory ───────────────────────────────────────
  await fs.ensureDir(projectRoot);

  // ── Step 1: Write template boilerplate ─────────────────────────────
  const s1 = p.spinner();
  s1.start(`Generating ${meta.color(meta.label)} boilerplate...`);

  const templateFiles = getTemplateFiles(config);
  const boilerplateCount = await writeFiles(projectRoot, templateFiles);

  s1.stop(`${pc.green('✓')} Generated ${pc.bold(String(boilerplateCount))} boilerplate files`);

  // ── Step 2: Generate AI context rules ──────────────────────────────
  const s2 = p.spinner();
  s2.start('Generating Universal AI Context Rules...');

  const aiRuleFiles = generateAIRuleFiles(config.template);
  const aiRuleCount = await writeFiles(projectRoot, aiRuleFiles);

  s2.stop(`${pc.green('✓')} Generated ${pc.bold(String(aiRuleCount))} AI context rule files`);

  // ── Step 3: Generate project README ────────────────────────────────
  const s3 = p.spinner();
  s3.start('Creating project README...');

  const readmeFile = generateProjectReadme(config);
  await writeFiles(projectRoot, [readmeFile]);

  s3.stop(`${pc.green('✓')} Created project README.md`);

  // ── Success Message ────────────────────────────────────────────────
  const totalFiles = boilerplateCount + aiRuleCount + 1; // +1 for README

  p.note(
    [
      `${pc.bold(pc.green(`${meta.icon} ${config.name}`))} has been created with ${pc.bold(String(totalFiles))} files!`,
      '',
      `${pc.dim('Template:')}     ${meta.color(meta.label)}`,
      `${pc.dim('Pkg Manager:')}  ${config.packageManager}`,
      `${pc.dim('Location:')}     ${pc.underline(projectRoot)}`,
      '',
      pc.dim('─────────────────────────────────────────────'),
      '',
      `${pc.bold('AI Context Rules Generated:')}`,
      `  ${pc.cyan('•')} .cursorrules              ${pc.dim('→ Cursor IDE')}`,
      `  ${pc.cyan('•')} .windsurfrules            ${pc.dim('→ Windsurf IDE')}`,
      `  ${pc.cyan('•')} .github/copilot-instructions.md  ${pc.dim('→ GitHub Copilot')}`,
      `  ${pc.cyan('•')} AI_INSTRUCTIONS.md        ${pc.dim('→ Claude Code / Antigravity')}`,
    ].join('\n'),
    'Project Created Successfully'
  );

  const nextStepsLines = [
    `${pc.bold('Next steps:')}`,
    '',
    `  ${pc.cyan('1.')} cd ${pc.green(config.name)}`,
    `  ${pc.cyan('2.')} ${pc.green(meta.installCmd(config.packageManager))}`,
    `  ${pc.cyan('3.')} ${pc.green(meta.devCmd(config.packageManager))}`,
    '',
    `${pc.dim('Open the project in your favorite AI-powered editor and the')}`,
    `${pc.dim('context rules will be picked up automatically. Happy coding!')}`,
  ];

  p.log.message(nextStepsLines.join('\n'));

  p.outro(
    `${pc.bgGreen(pc.black(' prompt-scaffold '))} ${pc.green('is ready!')} ${pc.dim('— AI-ready from day one ✨')}`
  );
}
