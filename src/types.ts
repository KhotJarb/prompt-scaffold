export type Template = 'nextjs' | 'fastapi' | 'express';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export interface ProjectConfig {
  name: string;
  template: Template;
  packageManager: PackageManager;
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
