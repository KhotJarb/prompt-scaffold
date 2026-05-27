import path from 'node:path';
import { exec } from 'node:child_process';
import os from 'node:os';
import fs from 'fs-extra';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import type { ProjectConfig, Template, GeneratedFile } from './types.js';
import { PYTHON_TEMPLATES } from './types.js';
import { getNextjsFiles } from './templates/nextjs.js';
import { getReactViteFiles } from './templates/react-vite.js';
import { getFastapiFiles } from './templates/fastapi.js';
import { getExpressFiles } from './templates/express.js';
import { getNestjsFiles } from './templates/nestjs.js';
import { getDjangoFiles } from './templates/django.js';
import { generateAIRuleFiles, generateCustomRulesTemplate } from './ai-rules/generator.js';

/**
 * Promisified exec that uses cmd.exe on Windows to avoid PowerShell issues.
 * Returns { stdout, stderr } on success, or throws with stderr on failure.
 */
function execAsync(
  cmd: string,
  cwd: string,
  timeout?: number
): Promise<{ stdout: string; stderr: string }> {
  const isWindows = os.platform() === 'win32';
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      {
        cwd,
        shell: isWindows ? 'cmd.exe' : undefined,
        ...(timeout ? { timeout } : {}),
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
        } else {
          resolve({ stdout, stderr });
        }
      }
    );
  });
}

/**
 * Template metadata for display purposes.
 */
const TEMPLATE_META: Record<Template, {
  label: string;
  icon: string;
  color: (s: string) => string;
  installCmd: (pm: string) => string;
  devCmd: (pm: string) => string;
}> = {
  nextjs: {
    label: 'Next.js Web App',
    icon: '▲',
    color: pc.cyan,
    installCmd: (pm: string) => `${pm} install`,
    devCmd: (pm: string) => `${pm} run dev`,
  },
  'react-vite': {
    label: 'React + Vite SPA',
    icon: '⚛',
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
  django: {
    label: 'Python Django',
    icon: '🌿',
    color: pc.green,
    installCmd: () => 'pip install -r requirements.txt',
    devCmd: () => 'python manage.py runserver',
  },
  express: {
    label: 'Express API',
    icon: '🚂',
    color: pc.yellow,
    installCmd: (pm: string) => `${pm} install`,
    devCmd: (pm: string) => `${pm} run dev`,
  },
  nestjs: {
    label: 'NestJS API',
    icon: '🔺',
    color: pc.red,
    installCmd: (pm: string) => `${pm} install`,
    devCmd: (pm: string) => `${pm} run start:dev`,
  },
};

/**
 * Returns the list of boilerplate files for the chosen template.
 */
function getTemplateFiles(config: ProjectConfig): GeneratedFile[] {
  switch (config.template) {
    case 'nextjs':
      return getNextjsFiles(config.name);
    case 'react-vite':
      return getReactViteFiles(config.name);
    case 'fastapi':
      return getFastapiFiles(config.name);
    case 'django':
      return getDjangoFiles(config.name);
    case 'express':
      return getExpressFiles(config.name);
    case 'nestjs':
      return getNestjsFiles(config.name);
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
  const isPython = PYTHON_TEMPLATES.includes(config.template);

  return {
    path: 'README.md',
    content: `# ${config.name}

> ${meta.icon} ${meta.label} — scaffolded with [prompt-scaffold](https://github.com/KhotJarb/prompt-scaffold)

## Getting Started

\`\`\`bash
# Install dependencies
${meta.installCmd(config.packageManager)}

# Start development server
${meta.devCmd(config.packageManager)}
\`\`\`
${isPython ? `
## Python Setup

\`\`\`bash
# Create a virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.venv\\\\Scripts\\\\activate     # Windows

# Then install dependencies
pip install -r requirements.txt
\`\`\`
` : ''}
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

### Custom Rules

Add your team-specific conventions to \`.aicustomrules\`. When you re-run
\`prompt-scaffold --inject\`, your custom rules will be appended to all AI context files.

## Project Structure

See \`AI_INSTRUCTIONS.md\` for the full project structure and coding standards.

## License

MIT
`,
  };
}

/**
 * Initializes a git repository and creates an initial commit.
 * Uses async exec so the spinner keeps animating.
 */
async function initGitRepo(projectRoot: string): Promise<boolean> {
  try {
    await execAsync('git init', projectRoot);
    await execAsync('git add .', projectRoot);
    await execAsync('git commit -m "Initial commit from prompt-scaffold"', projectRoot);
    return true;
  } catch {
    return false;
  }
}

/**
 * Injects AI context rule files into an existing project directory.
 * Does not create boilerplate files — only the 4 AI rule files + .aicustomrules template.
 */
export async function injectRules(template: Template): Promise<void> {
  const projectRoot = process.cwd();
  const meta = TEMPLATE_META[template];

  // ── Check for existing rule files ──────────────────────────────
  const existingFiles: string[] = [];
  const ruleFilePaths = [
    '.cursorrules',
    '.windsurfrules',
    '.github/copilot-instructions.md',
    'AI_INSTRUCTIONS.md',
  ];

  for (const rulePath of ruleFilePaths) {
    if (await fs.pathExists(path.join(projectRoot, rulePath))) {
      existingFiles.push(rulePath);
    }
  }

  if (existingFiles.length > 0) {
    const shouldOverwrite = await p.confirm({
      message: `Found ${existingFiles.length} existing AI rule file(s). Overwrite them?`,
      initialValue: true,
    });

    if (p.isCancel(shouldOverwrite) || !shouldOverwrite) {
      p.cancel('Injection cancelled.');
      process.exit(0);
    }
  }

  // ── Generate and write AI rule files ───────────────────────────
  const s1 = p.spinner();
  s1.start(`Generating ${meta.color(meta.label)} AI Context Rules...`);

  const aiRuleFiles = generateAIRuleFiles(template, projectRoot);
  const ruleCount = await writeFiles(projectRoot, aiRuleFiles);

  s1.stop(`${pc.green('✓')} Generated ${pc.bold(String(ruleCount))} AI context rule files`);

  // ── Create .aicustomrules template if it doesn't exist ─────────
  const customRulesPath = path.join(projectRoot, '.aicustomrules');
  if (!(await fs.pathExists(customRulesPath))) {
    const customTemplate = generateCustomRulesTemplate();
    await writeFiles(projectRoot, [customTemplate]);
    p.log.info(`${pc.green('✓')} Created ${pc.dim('.aicustomrules')} template for custom rules`);
  }

  // ── Success Message ────────────────────────────────────────────
  p.note(
    [
      `${pc.bold(pc.green('AI Context Rules'))} injected for ${meta.color(meta.label)}!`,
      '',
      `${pc.bold('Files generated:')}`,
      `  ${pc.cyan('•')} .cursorrules              ${pc.dim('→ Cursor IDE')}`,
      `  ${pc.cyan('•')} .windsurfrules            ${pc.dim('→ Windsurf IDE')}`,
      `  ${pc.cyan('•')} .github/copilot-instructions.md  ${pc.dim('→ GitHub Copilot')}`,
      `  ${pc.cyan('•')} AI_INSTRUCTIONS.md        ${pc.dim('→ Claude Code / Antigravity')}`,
      '',
      pc.dim('─────────────────────────────────────────────'),
      '',
      `${pc.dim('Tip:')} Edit ${pc.bold('.aicustomrules')} to add team-specific conventions.`,
      `${pc.dim('     Re-run')} ${pc.cyan('prompt-scaffold --inject')} ${pc.dim('to refresh all rule files.')}`,
    ].join('\n'),
    'Injection Complete'
  );

  p.outro(
    `${pc.bgMagenta(pc.black(' prompt-scaffold '))} ${pc.green('AI rules injected!')} ${pc.dim('— AI-ready from day one ✨')}`
  );
}

/**
 * Main scaffolding orchestrator.
 * Creates the project directory, writes template files, generates AI rules,
 * optionally initializes git.
 */
export async function scaffoldProject(config: ProjectConfig): Promise<void> {
  // ── Resolve output path ────────────────────────────────────────
  const baseDir = config.outputDir
    ? path.resolve(config.outputDir)
    : process.cwd();
  const projectRoot = path.resolve(baseDir, config.name);
  const meta = TEMPLATE_META[config.template];

  // ── Check if directory already exists ──────────────────────────
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

  // ── Create project directory ───────────────────────────────────
  await fs.ensureDir(projectRoot);

  // ── Step 1: Write template boilerplate ─────────────────────────
  const s1 = p.spinner();
  s1.start(`Generating ${meta.color(meta.label)} boilerplate...`);

  const templateFiles = getTemplateFiles(config);
  const boilerplateCount = await writeFiles(projectRoot, templateFiles);

  s1.stop(`${pc.green('✓')} Generated ${pc.bold(String(boilerplateCount))} boilerplate files`);

  // ── Step 2: Generate AI context rules ──────────────────────────
  const s2 = p.spinner();
  s2.start('Generating Universal AI Context Rules...');

  const aiRuleFiles = generateAIRuleFiles(config.template, projectRoot);
  const aiRuleCount = await writeFiles(projectRoot, aiRuleFiles);

  s2.stop(`${pc.green('✓')} Generated ${pc.bold(String(aiRuleCount))} AI context rule files`);

  // ── Step 3: Generate .aicustomrules + project README ───────────
  const s3 = p.spinner();
  s3.start('Creating project files...');

  const readmeFile = generateProjectReadme(config);
  const customRulesFile = generateCustomRulesTemplate();
  await writeFiles(projectRoot, [readmeFile, customRulesFile]);

  s3.stop(`${pc.green('✓')} Created README.md and .aicustomrules`);

  // ── Step 4: Initialize git ─────────────────────────────────────
  let gitInitialized = false;
  if (config.initGit) {
    const s4 = p.spinner();
    s4.start('Initializing git repository...');

    gitInitialized = await initGitRepo(projectRoot);

    if (gitInitialized) {
      s4.stop(`${pc.green('✓')} Initialized git repository with initial commit`);
    } else {
      s4.stop(`${pc.yellow('⚠')} Git initialization failed (is git installed?)`);
    }
  }

  // ── Success Message ────────────────────────────────────────────
  const totalFiles = boilerplateCount + aiRuleCount + 2; // +2 for README + .aicustomrules

  p.note(
    [
      `${pc.bold(pc.green(`${meta.icon} ${config.name}`))} has been created with ${pc.bold(String(totalFiles))} files!`,
      '',
      `${pc.dim('Template:')}     ${meta.color(meta.label)}`,
      ...(PYTHON_TEMPLATES.includes(config.template)
        ? []
        : [`${pc.dim('Pkg Manager:')}  ${config.packageManager}`]),
      `${pc.dim('Location:')}     ${pc.underline(projectRoot)}`,
      `${pc.dim('Git:')}          ${gitInitialized ? pc.green('Initialized') : config.initGit ? pc.yellow('Failed') : pc.dim('Skipped')}`,
      '',
      pc.dim('─────────────────────────────────────────────'),
      '',
      `${pc.bold('AI Context Rules Generated:')}`,
      `  ${pc.cyan('•')} .cursorrules              ${pc.dim('→ Cursor IDE')}`,
      `  ${pc.cyan('•')} .windsurfrules            ${pc.dim('→ Windsurf IDE')}`,
      `  ${pc.cyan('•')} .github/copilot-instructions.md  ${pc.dim('→ GitHub Copilot')}`,
      `  ${pc.cyan('•')} AI_INSTRUCTIONS.md        ${pc.dim('→ Claude Code / Antigravity')}`,
      `  ${pc.cyan('•')} .aicustomrules            ${pc.dim('→ Your team\'s custom rules')}`,
    ].join('\n'),
    'Project Created Successfully'
  );

  p.log.message(
    [
      `${pc.bold('Next steps:')}`,
      '',
      `  ${pc.cyan('1.')} cd ${pc.green(projectRoot !== path.resolve(process.cwd(), config.name) ? projectRoot : config.name)}`,
      `  ${pc.cyan('2.')} ${pc.green(meta.installCmd(config.packageManager))}`,
      `  ${pc.cyan('3.')} ${pc.green(meta.devCmd(config.packageManager))}`,
      '',
      `${pc.dim('Open the project in your favorite AI-powered editor and the')}`,
      `${pc.dim('context rules will be picked up automatically. Happy coding!')}`,
    ].join('\n')
  );

  p.outro(
    `${pc.bgGreen(pc.black(' prompt-scaffold '))} ${pc.green('is ready!')} ${pc.dim('— AI-ready from day one ✨')}`
  );
}
