<div align="center">

<img src="https://img.shields.io/badge/prompt--scaffold-v1.0.2-blueviolet?style=for-the-badge&logo=rocket" alt="version" />

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
| 🧠 **Auto-Detect Stack** | Automatically detects your project's tech stack from config files |
| 📦 **3 Production Templates** | Next.js App Router, Python FastAPI, Node.js Express API |
| 🎨 **Beautiful CLI** | Powered by `@clack/prompts` — gorgeous interactive terminal UI |
| ⚡ **Non-Interactive Mode** | Full CLI flags for scripting and CI/CD: `--name`, `--template`, `--pm` |
| 🔧 **Post-Scaffold Automation** | Optional git init and dependency installation built-in |
| 🎛️ **Custom Rules Layer** | `.aicustomrules` file for team-specific conventions that survive re-injection |
| 🐳 **Docker Support** | Dockerfiles included for FastAPI and Express templates |
| 🔒 **Strict Standards** | TypeScript strict mode, Zod validation, Pydantic models — built-in |

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
2. **🎯 Template Selection** — choose your stack
3. **📦 Package Manager** — npm, pnpm, or yarn
4. **🔧 Git Init** — initialize a git repository
5. **📥 Install Dependencies** — auto-install after scaffolding

### Non-Interactive Mode

```bash
# Fully scripted — no prompts at all
prompt-scaffold --name my-app --template nextjs --pm pnpm

# Skip git and dep install
prompt-scaffold --name my-api --template express --pm npm --no-git --no-install
```

### Quick Start After Scaffolding

```bash
# Next.js / Express
cd my-project
npm install    # (skipped if you chose auto-install)
npm run dev

# FastAPI
cd my-project
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 💉 Inject Mode — Add AI Rules to Existing Projects

This is the **game-changer**. You don't need to start a new project to benefit from prompt-scaffold. Add AI context rules to any existing project:

```bash
cd my-existing-project
prompt-scaffold --inject
```

### What Happens

1. **Auto-detects** your tech stack (Next.js, FastAPI, or Express)
2. **Confirms** the detected stack with you
3. **Generates** the 4 AI rule files + `.aicustomrules` template
4. **Warns** before overwriting any existing rule files

### Specify the Stack

```bash
# Skip auto-detection
prompt-scaffold --inject --template fastapi
```

### Custom Rules

Add team-specific conventions that persist across re-injections:

```bash
# 1. Edit your custom rules
echo "- Use Zustand for state management" >> .aicustomrules

# 2. Re-inject to merge custom rules into all AI files
prompt-scaffold --inject
```

Your `.aicustomrules` content is appended to all 4 generated AI rule files automatically.

---

## 📦 Templates

### ▲ Next.js Web App

> App Router · TypeScript · Tailwind CSS v4

- Next.js 15 with App Router (NOT Pages Router)
- React Server Components by default
- Tailwind CSS v4 with PostCSS
- TypeScript strict mode
- API Route Handlers
- `layout.tsx` / `page.tsx` / `loading.tsx` / `error.tsx` / `not-found.tsx`
- SEO-ready with Metadata API

### ⚡ Python FastAPI

> FastAPI · Pydantic v2 · SQLAlchemy 2.0 · Alembic · Docker

- FastAPI with async support
- Pydantic v2 for request/response validation
- SQLAlchemy 2.0 with DeclarativeBase
- Dependency injection patterns
- Test suite with pytest + httpx fixtures
- Multi-stage Dockerfile
- Ruff linting + mypy strict mode

### 🚂 Node.js Express API

> Express 5 · TypeScript · Zod · ES Modules · Docker

- Express 5 with TypeScript
- Zod validation middleware
- ES Modules (no CommonJS)
- Helmet + CORS security
- Centralized error handling
- Request logging middleware
- Multi-stage Dockerfile
- Environment validation at startup

---

## 🧠 Universal AI Context Rules

This is **the magic** ✨ — and the reason prompt-scaffold exists.

When you scaffold a project, 5 AI instruction files are generated automatically:

| File | Tool | How It Works |
|------|------|-------------|
| `.cursorrules` | **Cursor** | Cursor automatically reads this from your project root |
| `.windsurfrules` | **Windsurf** | Windsurf automatically reads this from your project root |
| `.github/copilot-instructions.md` | **GitHub Copilot** | Copilot reads instructions from `.github/` |
| `AI_INSTRUCTIONS.md` | **Claude Code / Antigravity** | CLI agents read markdown context files |
| `.aicustomrules` | **All tools** | Your custom rules, merged into all files on `--inject` |

### What's Inside the Rules?

Each file contains **deeply stack-specific** guidelines:

- 📁 **Project Structure** — exact folder conventions and file naming
- 🏗️ **Architecture Patterns** — layered architecture, dependency injection, etc.
- 📝 **Coding Standards** — type safety, naming conventions, import styles
- 🔐 **Security** — input validation, env vars, secret handling
- ⚡ **Performance** — caching, optimization, lazy loading
- 🧪 **Testing** — test patterns, mocking, coverage expectations
- 🚫 **Anti-Patterns** — explicit "do NOT do this" rules

### Example: What the AI Learns

For a **Next.js** project, the AI will know:

```
✅ Use App Router (not Pages Router)
✅ Default to Server Components
✅ Only add 'use client' when hooks/events are needed
✅ Use next/image for all images
✅ Use Metadata API for SEO
✅ Fetch data in Server Components with async/await
✅ Use Server Actions for mutations
❌ Never use getServerSideProps (that's Pages Router)
❌ Never use CSS modules (use Tailwind)
❌ Never use 'any' type
```

---

## 📖 CLI Reference

```
USAGE
  $ prompt-scaffold [options]

OPTIONS
  --name <name>          Project name
  --template <template>  Template: nextjs | fastapi | express
  --pm <manager>         Package manager: npm | pnpm | yarn
  --inject               Inject AI rules into an existing project
  --no-git               Skip git initialization
  --no-install           Skip dependency installation
  --help, -h             Show help message
  --version, -v          Show version number

EXAMPLES
  $ prompt-scaffold
  $ prompt-scaffold --name my-app --template nextjs --pm pnpm
  $ prompt-scaffold --inject
  $ prompt-scaffold --inject --template fastapi
  $ prompt-scaffold --name api --template express --no-install
```

---

## 🏗️ Architecture

```
prompt-scaffold/
├── src/
│   ├── index.ts              # CLI entry point & routing
│   ├── cli.ts                # Argument parser (--inject, --name, etc.)
│   ├── detect.ts             # Auto-detect project stack
│   ├── prompts.ts            # Interactive prompts (@clack/prompts)
│   ├── scaffold.ts           # Orchestrator: scaffold + inject modes
│   ├── types.ts              # Shared TypeScript types
│   ├── templates/
│   │   ├── nextjs.ts         # Next.js boilerplate files
│   │   ├── fastapi.ts        # FastAPI boilerplate files
│   │   └── express.ts        # Express boilerplate files
│   └── ai-rules/
│       ├── generator.ts      # AI rule file generator + custom rules
│       └── rules-content.ts  # Stack-specific rule content
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/KhotJarb/prompt-scaffold.git
cd prompt-scaffold

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Test the built CLI
node dist/index.js
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

- 🆕 **Add Templates** — Vue, Django, Go, Rust, etc.
- 📝 **Improve AI Rules** — more nuanced, more specific, more helpful
- 🐛 **Bug Reports** — open an issue with reproduction steps
- 💡 **Feature Ideas** — suggest new features in discussions

---

## 📄 License

MIT © [prompt-scaffold contributors](https://github.com/KhotJarb/prompt-scaffold/graphs/contributors)

---

<div align="center">

**Built for developers who build with AI.**

Made with ❤️ and TypeScript.

<br />

<a href="https://npmjs.com/package/prompt-scaffold">
  <img src="https://img.shields.io/badge/Install_Now-npm_i_--g_prompt--scaffold-cb3837?style=for-the-badge&logo=npm&logoColor=white" alt="Install Now" />
</a>

</div>
