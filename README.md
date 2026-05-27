<div align="center">

<img src="https://img.shields.io/badge/prompt--scaffold-v1.0.0-blueviolet?style=for-the-badge&logo=rocket" alt="version" />

# 🏗️ prompt-scaffold

### Universal AI-Ready Project Scaffolder

**Every project you create is instantly understood by every AI coding assistant.**

[![npm version](https://img.shields.io/npm/v/prompt-scaffold?style=flat-square&color=cb3837&logo=npm)](https://npmjs.com/package/prompt-scaffold)
[![downloads](https://img.shields.io/npm/dm/prompt-scaffold?style=flat-square&color=blue&logo=npm)](https://npmjs.com/package/prompt-scaffold)
[![GitHub stars](https://img.shields.io/github/stars/prompt-scaffold/prompt-scaffold?style=flat-square&color=gold&logo=github)](https://github.com/prompt-scaffold/prompt-scaffold)
[![license](https://img.shields.io/npm/l/prompt-scaffold?style=flat-square&color=green)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-≥18-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

<br />

[**Getting Started**](#-getting-started) · [**Why prompt-scaffold?**](#-why-prompt-scaffold) · [**Templates**](#-templates) · [**AI Rules**](#-universal-ai-context-rules) · [**Contributing**](#-contributing)

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
├── src/                                  # ← Your actual project files
└── ...
```

> **One scaffold. Every AI tool. Zero miscommunication.**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Universal AI Rules** | Auto-generates context files for Cursor, Windsurf, Copilot, and Claude Code |
| 📦 **3 Production Templates** | Next.js App Router, Python FastAPI, Node.js Express API |
| 🎨 **Beautiful CLI** | Powered by `@clack/prompts` — gorgeous interactive terminal UI |
| 🔒 **Strict Standards** | TypeScript strict mode, Zod validation, Pydantic models — built-in |
| ⚡ **Zero Config** | Works out of the box. No config files to write |
| 🧠 **Stack-Aware Rules** | AI rules are deeply specific to each template's architecture |
| 📋 **Best Practices** | Each template follows industry-standard project structure |
| 🔌 **NPM Ready** | Install globally, use anywhere — ready for `npx` |

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

### Usage

```bash
prompt-scaffold
```

The interactive CLI will guide you through:

1. **📝 Project Name** — validated for npm compatibility
2. **🎯 Template Selection** — choose your stack
3. **📦 Package Manager** — npm, pnpm, or yarn

That's it. Your project is created with full AI context rules.

### Quick Start After Scaffolding

```bash
# Next.js / Express
cd my-project
npm install
npm run dev

# FastAPI
cd my-project
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 📦 Templates

### ▲ Next.js Web App

> App Router · TypeScript · Tailwind CSS v4

- Next.js 15 with App Router (NOT Pages Router)
- React Server Components by default
- Tailwind CSS v4 with PostCSS
- TypeScript strict mode
- API Route Handlers
- Proper `layout.tsx` / `page.tsx` / `loading.tsx` / `error.tsx` conventions
- SEO-ready with Metadata API

### ⚡ Python FastAPI

> FastAPI · Pydantic v2 · SQLAlchemy 2.0 · Alembic

- FastAPI with async support
- Pydantic v2 for request/response validation
- SQLAlchemy 2.0 with DeclarativeBase
- Dependency injection patterns
- Alembic migration setup
- Test suite with pytest + httpx
- Ruff linting + mypy strict mode

### 🚂 Node.js Express API

> Express 5 · TypeScript · Zod · ES Modules

- Express 5 with TypeScript
- Zod validation middleware
- ES Modules (no CommonJS)
- Helmet + CORS security
- Centralized error handling
- Environment validation at startup
- Vitest testing setup

---

## 🧠 Universal AI Context Rules

This is **the magic** ✨ — and the reason prompt-scaffold exists.

When you scaffold a project, 4 AI instruction files are generated automatically:

| File | Tool | How It Works |
|------|------|-------------|
| `.cursorrules` | **Cursor** | Cursor automatically reads this from your project root |
| `.windsurfrules` | **Windsurf** | Windsurf automatically reads this from your project root |
| `.github/copilot-instructions.md` | **GitHub Copilot** | Copilot reads instructions from `.github/` |
| `AI_INSTRUCTIONS.md` | **Claude Code / Antigravity** | CLI agents read markdown context files |

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

## 🏗️ Architecture

```
prompt-scaffold/
├── src/
│   ├── index.ts              # CLI entry point
│   ├── prompts.ts            # Interactive prompts (@clack/prompts)
│   ├── scaffold.ts           # Orchestrator: creates dirs, writes files
│   ├── types.ts              # Shared TypeScript types
│   ├── templates/
│   │   ├── nextjs.ts         # Next.js boilerplate files
│   │   ├── fastapi.ts        # FastAPI boilerplate files
│   │   └── express.ts        # Express boilerplate files
│   └── ai-rules/
│       ├── generator.ts      # AI rule file generator
│       └── rules-content.ts  # Stack-specific rule content
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/prompt-scaffold/prompt-scaffold.git
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

MIT © [prompt-scaffold contributors](https://github.com/prompt-scaffold/prompt-scaffold/graphs/contributors)

---

<div align="center">

**Built for developers who build with AI.**

Made with ❤️ and TypeScript.

<br />

<a href="https://npmjs.com/package/prompt-scaffold">
  <img src="https://img.shields.io/badge/Install_Now-npm_i_--g_prompt--scaffold-cb3837?style=for-the-badge&logo=npm&logoColor=white" alt="Install Now" />
</a>

</div>
