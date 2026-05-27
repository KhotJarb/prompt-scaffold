export type Template = 'nextjs' | 'react-vite' | 'express' | 'nestjs' | 'fastapi' | 'django';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export type CICDProvider = 'github' | 'none';

export interface ProjectConfig {
  name: string;
  template: Template;
  packageManager: PackageManager;
  initGit: boolean;
  outputDir?: string;
  cicd: CICDProvider;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface TemplateDefinition {
  label: string;
  description: string;
  files: GeneratedFile[];
}

export interface CLIArgs {
  name?: string;
  template?: Template;
  packageManager?: PackageManager;
  inject: boolean;
  update: boolean;
  help: boolean;
  version: boolean;
  outputDir?: string;
  dryRun: boolean;
  cicd?: CICDProvider;
}

/** Templates that are valid for selection */
export const TEMPLATE_VALUES: Template[] = ['nextjs', 'react-vite', 'express', 'nestjs', 'fastapi', 'django'];

/** Package managers that are valid for selection */
export const PACKAGE_MANAGER_VALUES: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];

/** Templates that use Node.js package managers */
export const NODE_TEMPLATES: Template[] = ['nextjs', 'react-vite', 'express', 'nestjs'];

/** Templates that use Python (pip) */
export const PYTHON_TEMPLATES: Template[] = ['fastapi', 'django'];

/** Human-readable labels for all templates */
export const TEMPLATE_LABELS: Record<Template, string> = {
  nextjs: 'Next.js App Router',
  'react-vite': 'React + Vite SPA',
  fastapi: 'Python FastAPI',
  django: 'Python Django',
  express: 'Node.js Express API',
  nestjs: 'NestJS API',
};
