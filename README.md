<div align="center">

<img src="https://img.shields.io/badge/prompt--scaffold-v1.0.5-blueviolet?style=for-the-badge&logo=rocket" alt="version" />

# 🏗️ prompt-scaffold

### Universal AI-Ready Project Scaffolder

**Every project you create is instantly understood by every AI coding assistant.**

[![npm version](https://img.shields.io/npm/v/prompt-scaffold?style=flat-square&color=cb3837&logo=npm)](https://npmjs.com/package/prompt-scaffold)
[![GitHub stars](https://img.shields.io/github/stars/KhotJarb/prompt-scaffold?style=flat-square&color=gold&logo=github)](https://github.com/KhotJarb/prompt-scaffold)
[![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-≥18-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

<br />

[**Getting Started**](#-getting-started) · [**Why prompt-scaffold?**](#-why-prompt-scaffold) · [**Templates**](#-templates) · [**AI Rules**](#-universal-ai-context-rules) · [**CLI Reference**](#-cli-reference) · [**Contributing**](#-contributing)

<br />

<img width="680" alt="prompt-scaffold demo" src="https://img.shields.io/badge/demo-interactive_CLI-8A2BE2?style=for-the-badge&logo=windowsterminal&logoColor=white" />

</div>

---

## 🤔 The Problem

You start a new project. You open your AI coding assistant — Cursor, Windsurf, Copilot, Claude Code — and ask it to write a component. It generates:

- ❌ Pages Router code when you're using App Router
- ❌ `any` types when you enforce strict TypeScript
- ❌ CSS modules when you're using Tailwind
- ❌ CommonJS `require()` when you're using ES Modules
- ❌ SQLAlchemy 1.x patterns when you're on 2.0

**The AI doesn't know your architecture.** Every time, you're correcting, re-prompting, and wasting time.

## 💡 The Solution

**prompt-scaffold** doesn't just create boilerplate — it generates **Universal AI Context Rules**. These are instruction files that every major AI coding tool reads automatically, ensuring the AI writes code that matches your *exact* architecture from the very first prompt.

```
my-project/
├── .cursorrules                          # ← Cursor reads this
├── .windsurfrules                        # ← Windsurf reads this
├── .github/copilot-instructions.md       # ← GitHub Copilot reads this
├── AI_INSTRUCTIONS.md                    # ← Claude Code / Antigravity reads this
├── .aicustomrules                        # ← Your team's custom rules
├── .github/workflows/ci.yml             # ← GitHub Actions CI pipeline
├── src/                                  # ← Your actual project files
└── ...
```

> **One scaffold. Every AI tool. Zero miscommunication.**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Universal AI Rules** | Auto-generates context files for Cursor, Windsurf, Copilot, and Claude Code |
| 💉 **Inject Mode** | Add AI rules to **existing projects** without scaffolding — `--inject` |
| 🔄 **Update Mode** | Update AI rules to **latest standards** in existing projects — `--update` |
| 🧠 **Auto-Detect Stack** | Automatically detects your project's tech stack from config files |
| 📦 **6 Production Templates** | Next.js, React+Vite, Express, NestJS, FastAPI, Django |
| 🎨 **Beautiful CLI** | Powered by `@clack/prompts` — gorgeous interactive terminal UI |
| ⚡ **Non-Interactive Mode** | Full CLI flags for scripting and CI/CD: `--name`, `--template`, `--pm` |
| 👁️ **Dry Run** | Preview all generated files without writing — `--dry-run` |
| ⚙️ **GitHub Actions CI** | Stack-aware CI pipeline generation — build, lint, test |
| 🔧 **Linting & Formatting** | ESLint + Prettier (Node.js) or ruff (Python) pre-configured |
| 🎛️ **Custom Rules Layer** | `.aicustomrules` file for team-specific conventions that survive re-injection |
| 🚀 **Open in Editor** | Post-scaffold prompt to open in VS Code or Cursor |
| 🐳 **Docker Support** | Dockerfiles included for Express, NestJS, FastAPI, and Django |
| 🔒 **Strict Standards** | TypeScript strict mode, Zod validation, Pydantic models — built-in |

---

## 🎯 Templates

| Template | Stack | Includes |
|----------|-------|----------|
| **▲ Next.js** | App Router + Tailwind CSS + TypeScript | ESLint, Prettier, loading/error/404 pages |
| **⚛ React + Vite** | React 19 + Vite + Tailwind CSS v4 + TypeScript | ESLint, Prettier, counter demo |
| **🚂 Express** | Express 5 + TypeScript + Zod | ESLint, Prettier, Dockerfile, logger middleware |
| **🔺 NestJS** | NestJS 10 + TypeScript + Decorators | ESLint, Prettier, Dockerfile, unit tests |
| **⚡ FastAPI** | Python + Pydantic + SQLAlchemy + Alembic | ruff, Dockerfile, async test fixtures |
| **🌿 Django** | Django 5 + REST Framework + ORM | ruff, Dockerfile, timestamped models |

All templates include `.editorconfig` for consistent editor settings.

---

## 🤖 Universal AI Context Rules

Every scaffolded project gets **4 AI context files** — each containing stack-specific coding standards tailored to your exact architecture:

| File | AI Tool | Auto-Read |
|------|---------|-----------|
| `.cursorrules` | Cursor IDE | ✅ Yes |
| `.windsurfrules` | Windsurf IDE | ✅ Yes |
| `.github/copilot-instructions.md` | GitHub Copilot | ✅ Yes |
| `AI_INSTRUCTIONS.md` | Claude Code, Antigravity, Aider | ✅ Yes |

### What's Inside Each Rule File

- 🏗️ **Architecture patterns** — correct patterns for your specific framework
- 📂 **Project structure** — where files should go and why
- 🧩 **Component conventions** — naming, composition, and organization
- 🔒 **Type safety** — strict TypeScript/Pydantic/Zod patterns
- 🎨 **Styling** — Tailwind CSS conventions and utility patterns
- 🗄️ **Data layer** — database, API, and state management rules
- ✅ **Testing** — test file organization and conventions
- 🚫 **Anti-patterns** — what to explicitly avoid

---

## 🚀 Getting Started

### Installation

```bash
# Use directly with npx (no install needed)
npx prompt-scaffold

# Or install globally
npm install -g prompt-scaffold

# Then run anywhere
prompt-scaffold
```

### Interactive Mode (Default)

```bash
prompt-scaffold
```

The interactive CLI will guide you through:

1. **📝 Project Name** — validated for npm compatibility
2. **🎯 Template Selection** — choose your stack (6 options)
3. **📦 Package Manager** — npm, pnpm, yarn, or bun
4. **📁 Output Directory** — current dir, Desktop, or custom path
5. **⚙️ CI/CD Pipeline** — GitHub Actions or skip
6. **🔧 Git Init** — initialize a git repository
7. **🚀 Open in Editor** — VS Code, Cursor, or skip

### Non-Interactive Mode

```bash
# Fully scripted — no prompts at all
prompt-scaffold --name my-app --template nextjs --pm pnpm

# With GitHub Actions CI
prompt-scaffold --name my-api --template nestjs --pm bun --cicd github

# Custom output directory
prompt-scaffold --name my-app --template react-vite --output ~/projects

# Skip git
prompt-scaffold --name my-api --template express --pm npm --no-git
```

### Quick Start After Scaffolding

```bash
# Next.js / React+Vite / Express / NestJS
cd my-project
npm install
npm run dev

# FastAPI
cd my-project
pip install -r requirements.txt
uvicorn app.main:app --reload

# Django
cd my-project
pip install -r requirements.txt
python manage.py runserver
```

---

## 💉 Inject Mode — Add AI Rules to Existing Projects

This is the **game-changer**. You don't need to start a new project to benefit from prompt-scaffold. Add AI context rules to any existing project:

```bash
cd my-existing-project
prompt-scaffold --inject
```

### What Happens

1. **Auto-detects** your tech stack (Next.js, React+Vite, Express, NestJS, FastAPI, or Django)
2. **Confirms** the detected stack with you
3. **Generates** the 4 AI rule files + `.aicustomrules` template
4. **Warns** before overwriting any existing rule files

### Specify the Stack

```bash
# Skip auto-detection
prompt-scaffold --inject --template django
```

---

## 🔄 Update Mode — Keep AI Rules Fresh

Already using prompt-scaffold? Update your AI rules to the latest standards without re-scaffolding:

```bash
cd my-existing-project
prompt-scaffold --update
```

### What Happens

1. **Auto-detects** your project's stack
2. **Shows** which files will be updated vs created
3. **Preserves** your `.aicustomrules` (custom rules are merged automatically)
4. **Regenerates** all 4 AI rule files with the latest coding standards

---

## 👁️ Dry Run — Preview Before You Commit

See exactly what files would be generated without writing anything to disk:

```bash
prompt-scaffold --dry-run --name my-app --template nextjs --pm pnpm --cicd github
```

Shows a beautiful file tree with individual sizes and total count.

---

## 🎛️ Custom Rules

Add team-specific conventions that persist across re-injections and updates:

```bash
# 1. Edit your custom rules
echo "- Use Zustand for state management" >> .aicustomrules

# 2. Re-inject to merge custom rules into all AI files
prompt-scaffold --inject
```

Your `.aicustomrules` content is appended to all 4 generated AI rule files automatically.

---

## ⚙️ GitHub Actions CI

Every template supports a stack-aware GitHub Actions CI pipeline:

| Template | CI Pipeline |
|----------|-------------|
| **Next.js** | Build + Lint + Type check (Node 20/22) |
| **React + Vite** | Build + Lint + Type check (Node 20/22) |
| **Express** | Build + Lint + Type check (Node 20/22) |
| **NestJS** | Build + Lint + Test (Node 20/22) |
| **FastAPI** | ruff lint + format + mypy + pytest (Python 3.11/3.12) |
| **Django** | ruff lint + format + migrate check + test (Python 3.11/3.12) |

```bash
# Generate with CI pipeline
prompt-scaffold --name my-app --template nestjs --pm pnpm --cicd github
```

---

## 📖 CLI Reference

```
prompt-scaffold v1.0.5
Universal AI-Ready Project Scaffolder

USAGE
  $ prompt-scaffold [options]

COMMANDS
  (default)              Scaffold a new project
  --inject               Inject AI rules into an existing project
  --update               Update AI rules to the latest version

OPTIONS
  --name <name>          Project name (lowercase, hyphens, dots, underscores)
  --template <template>  Template: nextjs | react-vite | express | nestjs | fastapi | django
  --pm <manager>         Package manager: npm | pnpm | yarn | bun
  --output <path>        Output directory (default: current directory)
  --cicd <provider>      CI/CD pipeline: github | none (default: prompt)
  --no-git               Skip git initialization
  --dry-run              Preview files without writing to disk
  --help, -h             Show this help message
  --version, -v          Show version number

EXAMPLES
  $ prompt-scaffold
  $ prompt-scaffold --name my-app --template nextjs --pm pnpm
  $ prompt-scaffold --name api --template nestjs --pm bun --cicd github
  $ prompt-scaffold --output ~/projects --name my-app --template react-vite
  $ prompt-scaffold --dry-run --name test --template express --pm npm
  $ prompt-scaffold --inject
  $ prompt-scaffold --update
```

---

## 📦 What Gets Generated

### Next.js Example

```
my-app/
├── .cursorrules                     ← Cursor AI rules (Next.js-specific)
├── .windsurfrules                   ← Windsurf AI rules
├── .github/
│   ├── copilot-instructions.md      ← GitHub Copilot rules
│   └── workflows/ci.yml            ← GitHub Actions CI pipeline
├── AI_INSTRUCTIONS.md               ← Claude Code / Antigravity rules
├── .aicustomrules                   ← Your team's custom rules
├── .eslintrc.json                   ← Next.js ESLint config
├── .prettierrc                      ← Prettier formatting
├── .editorconfig                    ← Editor settings
├── .gitignore
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── README.md
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   ├── loading.tsx              ← Loading spinner
    │   ├── error.tsx                ← Error boundary
    │   ├── not-found.tsx            ← Custom 404
    │   └── api/health/route.ts      ← Health check endpoint
    └── lib/utils.ts
```

---

## 🛣️ Changelog

### v1.0.5 — "From Scaffolder to Platform"
- 🔄 **`prompt-scaffold --update`** — update AI rules in existing projects
- 👁️ **`--dry-run` mode** — preview files without writing to disk
- ⚙️ **GitHub Actions CI/CD** — stack-aware CI pipeline for all 6 templates
- 🔧 **ESLint + Prettier** — auto-configured for all Node.js templates
- 🐍 **ruff** — modern Python linting for FastAPI and Django
- 📝 **`.editorconfig`** — consistent editor settings for all templates
- 🚀 **Open in editor** — post-scaffold prompt to open in VS Code or Cursor
- 🐛 **Bug fix** — AI rule file labels now correct for all 6 templates

### v1.0.4 — "Template Expansion"
- 3 new templates: React + Vite, NestJS, Django (now 6 total)
- Custom output directory with `--output` flag
- bun package manager support
- Smart PM prompt skipping for Python templates

### v1.0.3
- Manual dependency installation for reliability
- Async spinners for smoother UX

### v1.0.2 — "The Inject Update"
- Inject mode (`--inject`) for existing projects
- CLI flags for non-interactive usage
- Auto-detect stack for injection
- Git init with initial commit
- Custom rules merging (`.aicustomrules`)
- Enhanced templates (Dockerfile, loading/error/404 pages)

### v1.0.1
- Initial public release

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT © [KhotJarb](https://github.com/KhotJarb)

---

<div align="center">

**Made with ❤️ by [KhotJarb](https://github.com/KhotJarb)**

<br />

<sub>If prompt-scaffold saves you time, consider giving it a ⭐ on GitHub!</sub>

</div>
