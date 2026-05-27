import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CLIArgs, Template, PackageManager, CICDProvider } from './types.js';
import { TEMPLATE_VALUES, PACKAGE_MANAGER_VALUES } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Reads the package version from package.json.
 */
function getVersion(): string {
  try {
    const pkgPath = resolve(__dirname, '..', 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    return pkg.version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

/**
 * Prints the help message and exits.
 */
export function printHelp(): void {
  const version = getVersion();
  console.log(`
  prompt-scaffold v${version}
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
`);
}

/**
 * Prints the version and exits.
 */
export function printVersion(): void {
  console.log(getVersion());
}

/**
 * Parses command-line arguments from process.argv.
 * Supports both --flag value and --flag=value syntax.
 */
export function parseArgs(argv: string[] = process.argv.slice(2)): CLIArgs {
  const args: CLIArgs = {
    inject: false,
    update: false,
    help: false,
    version: false,
    dryRun: false,
  };

  // Default for git — undefined means "will prompt"
  let noGit = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];

    switch (arg) {
      case '--help':
      case '-h':
        args.help = true;
        break;

      case '--version':
      case '-v':
        args.version = true;
        break;

      case '--inject':
        args.inject = true;
        break;

      case '--update':
        args.update = true;
        break;

      case '--dry-run':
        args.dryRun = true;
        break;

      case '--no-git':
        noGit = true;
        break;

      case '--name':
        if (next && !next.startsWith('-')) {
          args.name = next;
          i++;
        }
        break;

      case '--template':
      case '-t':
        if (next && TEMPLATE_VALUES.includes(next as Template)) {
          args.template = next as Template;
          i++;
        } else if (next) {
          console.error(`Invalid template: "${next}". Must be one of: ${TEMPLATE_VALUES.join(', ')}`);
          process.exit(1);
        }
        break;

      case '--pm':
        if (next && PACKAGE_MANAGER_VALUES.includes(next as PackageManager)) {
          args.packageManager = next as PackageManager;
          i++;
        } else if (next) {
          console.error(`Invalid package manager: "${next}". Must be one of: ${PACKAGE_MANAGER_VALUES.join(', ')}`);
          process.exit(1);
        }
        break;

      case '--output':
      case '-o':
        if (next && !next.startsWith('-')) {
          args.outputDir = next;
          i++;
        }
        break;

      case '--cicd':
        if (next && ['github', 'none'].includes(next)) {
          args.cicd = next as CICDProvider;
          i++;
        } else if (next) {
          console.error(`Invalid CI/CD provider: "${next}". Must be one of: github, none`);
          process.exit(1);
        }
        break;

      default:
        // Handle --key=value syntax
        if (arg.startsWith('--') && arg.includes('=')) {
          const [key, val] = arg.split('=', 2);
          switch (key) {
            case '--name':
              args.name = val;
              break;
            case '--template':
            case '-t':
              if (TEMPLATE_VALUES.includes(val as Template)) {
                args.template = val as Template;
              } else {
                console.error(`Invalid template: "${val}". Must be one of: ${TEMPLATE_VALUES.join(', ')}`);
                process.exit(1);
              }
              break;
            case '--pm':
              if (PACKAGE_MANAGER_VALUES.includes(val as PackageManager)) {
                args.packageManager = val as PackageManager;
              } else {
                console.error(`Invalid package manager: "${val}". Must be one of: ${PACKAGE_MANAGER_VALUES.join(', ')}`);
                process.exit(1);
              }
              break;
            case '--output':
            case '-o':
              args.outputDir = val;
              break;
            case '--cicd':
              if (['github', 'none'].includes(val)) {
                args.cicd = val as CICDProvider;
              } else {
                console.error(`Invalid CI/CD provider: "${val}". Must be one of: github, none`);
                process.exit(1);
              }
              break;
          }
        }
        break;
    }
  }

  // Store no-git as inverse boolean on a side channel
  // This will be used by index.ts to pre-fill config
  (args as CLIArgs & { _noGit?: boolean })._noGit = noGit;

  return args;
}
