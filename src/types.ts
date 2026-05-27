export type Template = 'nextjs' | 'fastapi' | 'express';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export interface ProjectConfig {
  name: string;
  template: Template;
  packageManager: PackageManager;
  initGit: boolean;
  installDeps: boolean;
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
  help: boolean;
  version: boolean;
}

/** Templates that are valid for selection */
export const TEMPLATE_VALUES: Template[] = ['nextjs', 'fastapi', 'express'];

/** Package managers that are valid for selection */
export const PACKAGE_MANAGER_VALUES: PackageManager[] = ['npm', 'pnpm', 'yarn'];
