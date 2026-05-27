import * as p from '@clack/prompts';
import pc from 'picocolors';
import type { ProjectConfig, Template, PackageManager, CLIArgs } from './types.js';

/**
 * Runs the interactive CLI prompts to gather project configuration.
 * Supports partial pre-filling from CLI args — only prompts for missing values.
 */
export async function gatherProjectConfig(
  cliArgs: CLIArgs = { inject: false, help: false, version: false }
): Promise<ProjectConfig | null> {
  p.intro(
    `${pc.bgCyan(pc.black(' prompt-scaffold '))} ${pc.dim('— Universal AI-Ready Project Scaffolder')}`
  );

  const prefilledName = cliArgs.name;
  const prefilledTemplate = cliArgs.template;
  const prefilledPM = cliArgs.packageManager;
  const noGit = (cliArgs as CLIArgs & { _noGit?: boolean })._noGit ?? false;
  const noInstall = (cliArgs as CLIArgs & { _noInstall?: boolean })._noInstall ?? false;

  // If everything is pre-filled from CLI args, skip all prompts
  if (prefilledName && prefilledTemplate && prefilledPM) {
    p.log.info(`${pc.dim('Project:')} ${pc.bold(prefilledName)}`);
    p.log.info(`${pc.dim('Template:')} ${pc.bold(prefilledTemplate)}`);
    p.log.info(`${pc.dim('Package Manager:')} ${pc.bold(prefilledPM)}`);

    return {
      name: prefilledName.trim(),
      template: prefilledTemplate,
      packageManager: prefilledPM,
      initGit: !noGit,
      installDeps: !noInstall,
    };
  }

  const config = await p.group(
    {
      name: () => {
        if (prefilledName) {
          p.log.info(`${pc.dim('Project name:')} ${pc.bold(prefilledName)}`);
          return Promise.resolve(prefilledName);
        }
        return p.text({
          message: 'What is your project name?',
          placeholder: 'my-awesome-project',
          validate(value) {
            if (!value || value.trim().length === 0) {
              return 'Project name is required.';
            }
            if (!/^[a-z0-9][a-z0-9._-]*$/.test(value.trim())) {
              return 'Project name must be lowercase, start with a letter/number, and contain only a-z, 0-9, hyphens, dots, or underscores.';
            }
            if (value.trim().length > 214) {
              return 'Project name must be 214 characters or fewer.';
            }
          },
        });
      },

      template: () => {
        if (prefilledTemplate) {
          p.log.info(`${pc.dim('Template:')} ${pc.bold(prefilledTemplate)}`);
          return Promise.resolve(prefilledTemplate);
        }
        return p.select<Template>({
          message: 'Which template would you like to use?',
          options: [
            {
              value: 'nextjs' as const,
              label: 'Next.js Web App',
              hint: 'App Router + Tailwind CSS + TypeScript',
            },
            {
              value: 'fastapi' as const,
              label: 'Python FastAPI',
              hint: 'FastAPI + Pydantic + SQLAlchemy',
            },
            {
              value: 'express' as const,
              label: 'Node.js Express API',
              hint: 'Express 5 + TypeScript + Zod',
            },
          ],
        });
      },

      packageManager: () => {
        if (prefilledPM) {
          p.log.info(`${pc.dim('Package Manager:')} ${pc.bold(prefilledPM)}`);
          return Promise.resolve(prefilledPM);
        }
        return p.select<PackageManager>({
          message: 'Which package manager do you prefer?',
          options: [
            { value: 'npm' as const, label: 'npm', hint: 'Default Node.js package manager' },
            { value: 'pnpm' as const, label: 'pnpm', hint: 'Fast, disk-space efficient' },
            { value: 'yarn' as const, label: 'yarn', hint: 'Facebook\'s package manager' },
          ],
        });
      },

      initGit: () => {
        if (noGit) return Promise.resolve(false);
        return p.confirm({
          message: 'Initialize a git repository?',
          initialValue: true,
        });
      },

      installDeps: () => {
        if (noInstall) return Promise.resolve(false);
        return p.confirm({
          message: 'Install dependencies after scaffolding?',
          initialValue: true,
        });
      },
    },
    {
      onCancel() {
        p.cancel('Operation cancelled.');
        process.exit(0);
      },
    }
  );

  return {
    name: config.name.trim(),
    template: config.template,
    packageManager: config.packageManager,
    initGit: config.initGit,
    installDeps: config.installDeps,
  };
}

/**
 * Prompts for template selection during inject mode.
 * Optionally pre-fills with a detected or CLI-provided template.
 */
export async function gatherInjectConfig(
  cliArgs: CLIArgs = { inject: true, help: false, version: false },
  detectedTemplate?: Template | null
): Promise<{ template: Template } | null> {
  p.intro(
    `${pc.bgMagenta(pc.black(' prompt-scaffold '))} ${pc.dim('— Inject AI Context Rules')}`
  );

  // If template provided via CLI, use it directly
  if (cliArgs.template) {
    p.log.info(`${pc.dim('Template:')} ${pc.bold(cliArgs.template)}`);
    return { template: cliArgs.template };
  }

  // If auto-detected, confirm with user
  if (detectedTemplate) {
    const labels: Record<Template, string> = {
      nextjs: 'Next.js App Router',
      fastapi: 'Python FastAPI',
      express: 'Node.js Express API',
    };

    const confirmed = await p.confirm({
      message: `Detected ${pc.bold(pc.cyan(labels[detectedTemplate]))} project. Use this template?`,
      initialValue: true,
    });

    if (p.isCancel(confirmed)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }

    if (confirmed) {
      return { template: detectedTemplate };
    }
  }

  // Fall back to manual selection
  const template = await p.select<Template>({
    message: 'Which stack are you using?',
    options: [
      {
        value: 'nextjs' as const,
        label: 'Next.js Web App',
        hint: 'App Router + Tailwind CSS + TypeScript',
      },
      {
        value: 'fastapi' as const,
        label: 'Python FastAPI',
        hint: 'FastAPI + Pydantic + SQLAlchemy',
      },
      {
        value: 'express' as const,
        label: 'Node.js Express API',
        hint: 'Express 5 + TypeScript + Zod',
      },
    ],
  });

  if (p.isCancel(template)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  return { template };
}
