import type { GeneratedFile } from '../types.js';

export function getExpressFiles(projectName: string): GeneratedFile[] {
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
            dev: 'tsx watch src/index.ts',
            build: 'tsc',
            start: 'node dist/index.js',
            lint: 'eslint src/',
            test: 'vitest',
          },
          dependencies: {
            express: '^5.0.0',
            zod: '^3.24.0',
            cors: '^2.8.5',
            helmet: '^8.0.0',
            dotenv: '^16.4.0',
            'express-rate-limit': '^7.5.0',
          },
          devDependencies: {
            '@types/express': '^5.0.0',
            '@types/cors': '^2.8.17',
            '@types/node': '^22.0.0',
            typescript: '^5.8.0',
            tsx: '^4.19.0',
            vitest: '^3.0.0',
            eslint: '^9.0.0',
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
            target: 'ES2022',
            module: 'Node16',
            moduleResolution: 'Node16',
            outDir: './dist',
            rootDir: './src',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            resolveJsonModule: true,
            declaration: true,
            sourceMap: true,
          },
          include: ['src/**/*'],
          exclude: ['node_modules', 'dist'],
        },
        null,
        2
      ),
    },
    {
      path: 'src/index.ts',
      content: `import { app } from './app.js';
import { env } from './config/env.js';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(\`🚀 \${env.APP_NAME} running at http://localhost:\${PORT}\`);
  console.log(\`📋 Health check: http://localhost:\${PORT}/health\`);
});
`,
    },
    {
      path: 'src/app.ts',
      content: `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';
import { env } from './config/env.js';

export const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/v1', apiRouter);

// Global error handler (must be last)
app.use(errorHandler);
`,
    },
    {
      path: 'src/config/env.ts',
      content: `import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  APP_NAME: z.string().default('${projectName}'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  DATABASE_URL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
`,
    },
    {
      path: 'src/routes/index.ts',
      content: `import { Router } from 'express';

export const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
  res.json({ message: 'Welcome to ${projectName} API' });
});
`,
    },
    {
      path: 'src/middleware/error-handler.ts',
      content: `import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env.js';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: err.errors,
    });
    return;
  }

  // Known operational errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // Unknown errors
  console.error('💥 Unexpected error:', err);
  res.status(500).json({
    status: 'error',
    message: env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
}
`,
    },
    {
      path: 'src/middleware/validate.ts',
      content: `import type { Request, Response, NextFunction } from 'express';
import { type AnyZodObject, ZodError } from 'zod';

/**
 * Express middleware for Zod schema validation.
 * Validates request body, query, and params against the provided schema.
 */
export function validate(schema: AnyZodObject) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        next(error);
      }
    }
  };
}
`,
    },
    {
      path: '.gitignore',
      content: `# dependencies
node_modules/

# build
dist/

# environment
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# logs
*.log
npm-debug.log*

# testing
coverage/
`,
    },
    {
      path: '.env.example',
      content: `# Environment Variables
# Copy this file to .env and fill in the values

NODE_ENV=development
PORT=3000
APP_NAME=${projectName}
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=
`,
    },
    {
      path: 'Dockerfile',
      content: `# --- Build stage ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# --- Runtime stage ---
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
`,
    },
    {
      path: 'src/middleware/logger.ts',
      content: `import type { Request, Response, NextFunction } from 'express';

// ANSI color codes (no external dependencies)
const colors = {
  reset: '\\x1b[0m',
  dim: '\\x1b[2m',
  green: '\\x1b[32m',
  yellow: '\\x1b[33m',
  red: '\\x1b[31m',
  cyan: '\\x1b[36m',
} as const;

function statusColor(status: number): string {
  if (status >= 500) return colors.red;
  if (status >= 400) return colors.yellow;
  if (status >= 300) return colors.cyan;
  return colors.green;
}

/**
 * Simple request logging middleware.
 * Logs method, URL, status code (colored), and response time in ms.
 */
export function logger(req: Request, res: Response, next: NextFunction): void {
  const start = performance.now();

  res.on('finish', () => {
    const duration = (performance.now() - start).toFixed(1);
    const status = res.statusCode;
    const color = statusColor(status);

    console.log(
      \`\${colors.dim}\${new Date().toISOString()}\${colors.reset} \` +
      \`\${req.method} \${req.originalUrl} \` +
      \`\${color}\${status}\${colors.reset} \` +
      \`\${colors.dim}\${duration}ms\${colors.reset}\`
    );
  });

  next();
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
          env: { node: true, es2024: true },
          extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
          parser: '@typescript-eslint/parser',
          parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
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
