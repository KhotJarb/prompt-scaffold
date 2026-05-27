# yaya-test

> ▲ Next.js Web App — scaffolded with [prompt-scaffold](https://github.com/KhotJarb/prompt-scaffold)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## AI-Ready Development

This project includes **Universal AI Context Rules** — pre-configured instruction files
that ensure any AI coding assistant understands your project architecture:

| File | AI Tool |
|------|---------|
| `.cursorrules` | Cursor IDE |
| `.windsurfrules` | Windsurf IDE |
| `.github/copilot-instructions.md` | GitHub Copilot |
| `AI_INSTRUCTIONS.md` | Claude Code, Antigravity, and other CLI agents |

These files contain stack-specific coding standards, project structure rules,
and best practices that guide AI assistants to write code consistent with your architecture.

### Custom Rules

Add your team-specific conventions to `.aicustomrules`. When you re-run
`prompt-scaffold --inject`, your custom rules will be appended to all AI context files.

## Project Structure

See `AI_INSTRUCTIONS.md` for the full project structure and coding standards.

## License

MIT
