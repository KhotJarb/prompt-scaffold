import * as p from '@clack/prompts';
import pc from 'picocolors';
import type { ProjectConfig, Template, PackageManager } from './types.js';

/**
 * Runs the interactive CLI prompts to gather project configuration.
 * Uses @clack/prompts for a beautiful terminal experience.
 */
export async function gatherProjectConfig(): Promise<ProjectConfig | null> {
  p.intro(
    `${pc.bgCyan(pc.black(' prompt-scaffold '))} ${pc.dim('— Universal AI-Ready Project Scaffolder')}`
  );

  const config = await p.group(
    {
      name: () =>
        p.text({
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
        }),

      template: () =>
        p.select<Template>({
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
        }),

      packageManager: () =>
        p.select<PackageManager>({
          message: 'Which package manager do you prefer?',
          options: [
            { value: 'npm' as const, label: 'npm', hint: 'Default Node.js package manager' },
            { value: 'pnpm' as const, label: 'pnpm', hint: 'Fast, disk-space efficient' },
            { value: 'yarn' as const, label: 'yarn', hint: 'Facebook\'s package manager' },
          ],
        }),
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
  };
}
