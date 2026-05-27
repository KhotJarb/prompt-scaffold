import type { GeneratedFile } from '../types.js';

export function getReactViteFiles(projectName: string): GeneratedFile[] {
  return [
    {
      path: 'package.json',
      content: JSON.stringify(
        {
          name: projectName,
          version: '0.1.0',
          private: true,
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'tsc -b && vite build',
            preview: 'vite preview',
          },
          dependencies: {
            react: '^19.0.0',
            'react-dom': '^19.0.0',
          },
          devDependencies: {
            '@tailwindcss/vite': '^4.0.0',
            '@types/react': '^19.0.0',
            '@types/react-dom': '^19.0.0',
            '@vitejs/plugin-react': '^4.4.0',
            tailwindcss: '^4.0.0',
            typescript: '^5.8.0',
            vite: '^6.0.0',
          },
        },
        null,
        2
      ),
    },
    {
      path: 'vite.config.ts',
      content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
`,
    },
    {
      path: 'tsconfig.json',
      content: JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2020',
            lib: ['ES2020', 'DOM', 'DOM.Iterable'],
            module: 'ESNext',
            skipLibCheck: true,
            moduleResolution: 'bundler',
            allowImportingTsExtensions: true,
            isolatedModules: true,
            moduleDetection: 'force',
            noEmit: true,
            jsx: 'react-jsx',
            strict: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            noFallthroughCasesInSwitch: true,
            noUncheckedSideEffectImports: true,
            baseUrl: '.',
            paths: {
              '@/*': ['./src/*'],
            },
          },
          references: [{ path: './tsconfig.app.json' }],
        },
        null,
        2
      ),
    },
    {
      path: 'tsconfig.app.json',
      content: JSON.stringify(
        {
          extends: './tsconfig.json',
          compilerOptions: {
            tsBuildInfoFile: './node_modules/.tmp/tsconfig.app.tsbuildinfo',
          },
          include: ['src'],
        },
        null,
        2
      ),
    },
    {
      path: 'index.html',
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    },
    {
      path: 'src/main.tsx',
      content: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`,
    },
    {
      path: 'src/App.tsx',
      content: `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to ${projectName}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Scaffolded with prompt-scaffold — AI-ready from day one.
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors"
      >
        Count is {count}
      </button>
    </main>
  );
}
`,
    },
    {
      path: 'src/index.css',
      content: `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}
`,
    },
    {
      path: 'src/vite-env.d.ts',
      content: `/// <reference types="vite/client" />
`,
    },
    {
      path: '.gitignore',
      content: `# dependencies
node_modules

# production
dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# typescript
*.tsbuildinfo
`,
    },
    {
      path: '.env.example',
      content: `# Environment Variables
# Copy this file to .env.local and fill in the values

# API URL
VITE_API_URL=http://localhost:3000
`,
    },
  ];
}
