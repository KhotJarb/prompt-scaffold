import type { GeneratedFile } from '../types.js';

export function getNextjsFiles(projectName: string): GeneratedFile[] {
  return [
    {
      path: 'package.json',
      content: JSON.stringify(
        {
          name: projectName,
          version: '0.1.0',
          private: true,
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
            lint: 'next lint',
          },
          dependencies: {
            next: '^15.1.0',
            react: '^19.0.0',
            'react-dom': '^19.0.0',
          },
          devDependencies: {
            '@types/node': '^22.0.0',
            '@types/react': '^19.0.0',
            '@types/react-dom': '^19.0.0',
            typescript: '^5.8.0',
            tailwindcss: '^4.0.0',
            '@tailwindcss/postcss': '^4.0.0',
            eslint: '^9.0.0',
            'eslint-config-next': '^15.1.0',
          },
        },
        null,
        2
      ),
    },
    {
      path: 'tsconfig.json',
      content: JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2017',
            lib: ['dom', 'dom.iterable', 'esnext'],
            allowJs: true,
            skipLibCheck: true,
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            module: 'esnext',
            moduleResolution: 'bundler',
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: 'preserve',
            incremental: true,
            plugins: [{ name: 'next' }],
            paths: { '@/*': ['./src/*'] },
          },
          include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
          exclude: ['node_modules'],
        },
        null,
        2
      ),
    },
    {
      path: 'next.config.ts',
      content: `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
`,
    },
    {
      path: 'postcss.config.mjs',
      content: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`,
    },
    {
      path: 'src/app/globals.css',
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
      path: 'src/app/layout.tsx',
      content: `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '${projectName}',
  description: 'Built with prompt-scaffold — AI-ready from day one',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
    },
    {
      path: 'src/app/page.tsx',
      content: `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to ${projectName}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Scaffolded with prompt-scaffold — AI-ready from day one.
      </p>
    </main>
  );
}
`,
    },
    {
      path: 'src/app/api/health/route.ts',
      content: `import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
`,
    },
    {
      path: 'src/lib/utils.ts',
      content: `/**
 * Utility functions for ${projectName}
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
`,
    },
    {
      path: '.gitignore',
      content: `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

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
next-env.d.ts
`,
    },
    {
      path: '.env.example',
      content: `# Environment Variables
# Copy this file to .env.local and fill in the values

# Database
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# API Keys
# Add your API keys here
`,
    },
    {
      path: 'src/app/loading.tsx',
      content: `export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-gray-700 dark:border-t-gray-100" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      </div>
    </div>
  );
}
`,
    },
    {
      path: 'src/app/error.tsx',
      content: `'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={reset}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
`,
    },
    {
      path: 'src/app/not-found.tsx',
      content: `import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
`,
    },
    {
      path: '.prettierrc',
      content: `{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true
}
`,
    },
    {
      path: '.editorconfig',
      content: `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
`,
    },
    {
      path: '.eslintrc.json',
      content: JSON.stringify(
        {
          extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
          rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'prefer-const': 'error',
          },
        },
        null,
        2
      ),
    },
  ];
}
