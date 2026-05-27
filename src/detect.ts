import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Template } from './types.js';

/**
 * Attempts to detect the project's tech stack by examining
 * common configuration files in the given directory.
 *
 * Returns the detected Template or null if unknown.
 */
export function detectTemplate(cwd: string): Template | null {
  // ── Next.js Detection ────────────────────────────────────────────
  const nextConfigFiles = [
    'next.config.ts',
    'next.config.js',
    'next.config.mjs',
    'next.config.cjs',
  ];

  for (const configFile of nextConfigFiles) {
    if (existsSync(path.join(cwd, configFile))) {
      return 'nextjs';
    }
  }

  // Check package.json for next dependency
  const packageJsonPath = path.join(cwd, 'package.json');
  if (existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
      };

      if (allDeps['next']) {
        return 'nextjs';
      }

      if (allDeps['express']) {
        return 'express';
      }
    } catch {
      // Ignore JSON parse errors
    }
  }

  // ── FastAPI Detection ────────────────────────────────────────────
  const requirementsPath = path.join(cwd, 'requirements.txt');
  if (existsSync(requirementsPath)) {
    try {
      const content = readFileSync(requirementsPath, 'utf-8').toLowerCase();
      if (content.includes('fastapi')) {
        return 'fastapi';
      }
    } catch {
      // Ignore read errors
    }
  }

  const pyprojectPath = path.join(cwd, 'pyproject.toml');
  if (existsSync(pyprojectPath)) {
    try {
      const content = readFileSync(pyprojectPath, 'utf-8').toLowerCase();
      if (content.includes('fastapi')) {
        return 'fastapi';
      }
    } catch {
      // Ignore read errors
    }
  }

  // Check for app/main.py with FastAPI import
  const mainPyPath = path.join(cwd, 'app', 'main.py');
  if (existsSync(mainPyPath)) {
    try {
      const content = readFileSync(mainPyPath, 'utf-8');
      if (content.includes('FastAPI') || content.includes('fastapi')) {
        return 'fastapi';
      }
    } catch {
      // Ignore read errors
    }
  }

  return null;
}

/**
 * Returns a human-readable label for a template.
 */
export function getTemplateLabel(template: Template): string {
  switch (template) {
    case 'nextjs':
      return 'Next.js App Router';
    case 'fastapi':
      return 'Python FastAPI';
    case 'express':
      return 'Node.js Express API';
  }
}
