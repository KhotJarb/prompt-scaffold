# prompt-scaffold

> 🏗️ **Universal AI-Ready Project Scaffolder** — Generate projects with built-in context rules for **Cursor**, **Windsurf**, **GitHub Copilot**, and **Claude Code / Antigravity**.

[![npm version](https://img.shields.io/npm/v/prompt-scaffold)](https://www.npmjs.com/package/prompt-scaffold)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Why prompt-scaffold?

Every AI coding assistant works better when it understands your project. `prompt-scaffold` generates **stack-specific AI context rules** alongside your boilerplate, so AI assistants write code that follows your architecture from the very first prompt.

### 🎯 6 Templates

| Template | Stack | Use Case |
|----------|-------|----------|
| **Next.js** | App Router + Tailwind + TS | Full-stack web apps |
| **React + Vite** | React 19 + Vite + Tailwind + TS | Single-page applications |
| **Express** | Express 5 + TypeScript + Zod | REST APIs (Node.js) |
| **NestJS** | NestJS 10 + TypeScript + Decorators | Enterprise APIs (Node.js) |
| **FastAPI** | Python + Pydantic + SQLAlchemy | REST APIs (Python) |
| **Django** | Django 5 + REST Framework + ORM | Full-stack web apps (Python) |

### 🤖 4 AI Context Files

| File | AI Tool |
|------|---------|
| `.cursorrules` | Cursor IDE |
| `.windsurfrules` | Windsurf IDE |
| `.github/copilot-instructions.md` | GitHub Copilot |
| `AI_INSTRUCTIONS.md` | Claude Code, Antigravity, and other CLI agents |

---

## Quick Start

```bash
npx prompt-scaffold
```

That's it! Follow the interactive prompts to:

1. **Name** your project
2. **Choose** a template (Next.js, React+Vite, Express, NestJS, FastAPI, Django)
3. **Select** a package manager (npm, pnpm, yarn, bun)
4. **Pick** an output directory (current dir, Desktop, or custom path)
5. **Generate CI/CD** (GitHub Actions or skip)
6. **Init git** (optional)
7. **Open in editor** (VS Code or Cursor)

## CLI Flags

Skip the prompts with flags for CI/CD or quick scaffolding:

```bash
# Full non-interactive mode
prompt-scaffold --name my-app --template nextjs --pm pnpm

# With GitHub Actions CI pipeline
prompt-scaffold --name my-app --template nestjs --pm bun --cicd github

# Custom output directory
prompt-scaffold --name my-app --template react-vite --output ~/projects

# Preview what files would be generated (no writing)
prompt-scaffold --dry-run --name test --template express --pm npm

# Update AI rules in an existing project
prompt-scaffold --update
```

### All Flags

| Flag | Description |
|------|-------------|
| `--name <name>` | Project name |
| `--template <t>` | Template: `nextjs`, `react-vite`, `express`, `nestjs`, `fastapi`, `django` |
| `--pm <pm>` | Package manager: `npm`, `pnpm`, `yarn`, `bun` |
| `--output <path>` | Output directory (default: current directory) |
| `--cicd <provider>` | CI/CD pipeline: `github`, `none` |
| `--inject` | Inject AI rules into existing project |
| `--update` | Update AI rules to latest version |
| `--dry-run` | Preview files without writing to disk |
| `--no-git` | Skip git initialization |
| `--help`, `-h` | Show help |
| `--version`, `-v` | Show version |

---

## Commands

### Scaffold (default)
```bash
npx prompt-scaffold
```
Creates a new project with boilerplate, AI rules, linting configs, and optionally CI/CD.

### Inject
```bash
cd my-existing-project
npx prompt-scaffold --inject
```
Auto-detects your stack and injects AI context rules without scaffolding boilerplate.

### Update
```bash
cd my-existing-project
npx prompt-scaffold --update
```
Updates AI rule files to the latest version. Auto-detects stack, preserves `.aicustomrules`.

### Dry Run
```bash
npx prompt-scaffold --dry-run --name my-app --template nextjs --pm pnpm
```
Preview all files that would be generated with sizes, without writing anything.

---

## What's Included

Every scaffolded project comes with:

| Category | Files |
|----------|-------|
| **Boilerplate** | Full project structure per template |
| **AI Rules** | `.cursorrules`, `.windsurfrules`, `.github/copilot-instructions.md`, `AI_INSTRUCTIONS.md` |
| **Custom Rules** | `.aicustomrules` template for team conventions |
| **Linting** | ESLint + Prettier (Node.js) or ruff (Python) + `.editorconfig` |
| **CI/CD** | GitHub Actions workflow (optional) |
| **Docker** | Dockerfile (Express, NestJS, FastAPI, Django) |
| **Git** | `.gitignore` + initial commit (optional) |

---

## Custom Rules

Add your team's conventions to `.aicustomrules`:

```
# .aicustomrules
- Use Zustand for state management, not Redux
- All API responses must include request_id
- Use ISO 8601 for all date formats
```

When you re-run `prompt-scaffold --inject` or `--update`, your custom rules are **automatically merged** into all AI context files.

---

## Changelog

### v1.0.5
- **`prompt-scaffold --update`**: Update AI rules to latest version in existing projects
- **`--dry-run` mode**: Preview all files without writing to disk
- **GitHub Actions CI/CD**: Stack-aware CI pipeline generation
- **ESLint + Prettier**: Auto-configured for all Node.js templates
- **ruff**: Modern Python linting for FastAPI and Django templates
- **`.editorconfig`**: Consistent editor settings for all templates
- **Open in editor**: Post-scaffold prompt to open in VS Code or Cursor
- **Bug fix**: AI rule file labels now correct for all 6 templates

### v1.0.4
- 3 new templates: React + Vite, NestJS, Django
- Custom output directory (`--output` flag)
- bun package manager support
- Smart PM prompt skipping for Python templates

### v1.0.3
- Manual dependency installation for reliability
- Async spinners for smoother UX

### v1.0.2
- Inject mode, CLI flags, auto-detect, enhanced templates

---

## License

MIT © [KhotJarb](https://github.com/KhotJarb)
