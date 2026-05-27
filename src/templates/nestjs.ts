import type { GeneratedFile } from '../types.js';

export function getNestjsFiles(projectName: string): GeneratedFile[] {
  return [
    {
      path: 'package.json',
      content: JSON.stringify(
        {
          name: projectName,
          version: '0.1.0',
          private: true,
          scripts: {
            build: 'nest build',
            start: 'nest start',
            'start:dev': 'nest start --watch',
            'start:prod': 'node dist/main',
            test: 'jest',
          },
          dependencies: {
            '@nestjs/common': '^10.0.0',
            '@nestjs/core': '^10.0.0',
            '@nestjs/platform-express': '^10.0.0',
            'reflect-metadata': '^0.2.0',
            rxjs: '^7.8.0',
          },
          devDependencies: {
            '@nestjs/cli': '^10.0.0',
            '@nestjs/schematics': '^10.0.0',
            '@nestjs/testing': '^10.0.0',
            '@types/express': '^5.0.0',
            '@types/node': '^22.0.0',
            'ts-node': '^10.9.0',
            typescript: '^5.8.0',
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
            module: 'ES2021',
            target: 'ES2021',
            lib: ['ES2021'],
            declaration: true,
            removeComments: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            allowSyntheticDefaultImports: true,
            sourceMap: true,
            outDir: './dist',
            rootDir: './src',
            baseUrl: './',
            incremental: true,
            skipLibCheck: true,
            strict: true,
            forceConsistentCasingInFileNames: true,
          },
          include: ['src/**/*'],
          exclude: ['node_modules', 'dist'],
        },
        null,
        2
      ),
    },
    {
      path: 'tsconfig.build.json',
      content: JSON.stringify(
        {
          extends: './tsconfig.json',
          exclude: ['node_modules', 'test', 'dist', '**/*spec.ts'],
        },
        null,
        2
      ),
    },
    {
      path: 'nest-cli.json',
      content: JSON.stringify(
        {
          $schema: 'https://json.schemastore.org/nest-cli',
          collection: '@nestjs/schematics',
          sourceRoot: 'src',
          compilerOptions: {
            deleteOutDir: true,
          },
        },
        null,
        2
      ),
    },
    {
      path: 'src/main.ts',
      content: `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(\`🚀 ${projectName} is running on http://localhost:\${port}\`);
}

bootstrap();
`,
    },
    {
      path: 'src/app.module.ts',
      content: `import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`,
    },
    {
      path: 'src/app.controller.ts',
      content: `import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
`,
    },
    {
      path: 'src/app.service.ts',
      content: `import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from ${projectName}!';
  }
}
`,
    },
    {
      path: 'src/app.controller.spec.ts',
      content: `import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHello', () => {
    it('should return a hello message', () => {
      expect(controller.getHello()).toBe('Hello from ${projectName}!');
    });
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      const result = controller.getHealth();
      expect(result.status).toBe('ok');
      expect(result.timestamp).toBeDefined();
    });
  });
});
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

PORT=3000
NODE_ENV=development
`,
    },
    {
      path: 'Dockerfile',
      content: `# --- Build stage ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src/ ./src/

RUN npm run build

# --- Runtime stage ---
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
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
          env: { node: true, jest: true },
          extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
          parser: '@typescript-eslint/parser',
          parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
          rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
          },
        },
        null,
        2
      ),
    },
  ];
}
