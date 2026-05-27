import type { Template } from '../types.js';

export function getNextjsRules(): string {
  return `# Next.js App Router — AI Coding Standards
# Architecture: Next.js 15 + App Router + TypeScript + Tailwind CSS v4

## Core Principles
- This is a Next.js 15 project using the App Router (NOT Pages Router).
- TypeScript with strict mode is mandatory. Never use \`any\` — prefer \`unknown\` with type guards.
- All components are React Server Components (RSC) by default. Only add \`'use client'\` when absolutely necessary (event handlers, hooks, browser APIs).
- Use Tailwind CSS v4 for styling. Do NOT use inline styles or CSS modules unless explicitly justified.

## Project Structure
\`\`\`
src/
├── app/                    # App Router: pages, layouts, API routes
│   ├── (auth)/             # Route groups for layout organization
│   ├── api/                # API Route Handlers
│   ├── layout.tsx          # Root layout (required)
│   ├── page.tsx            # Home page
│   ├── loading.tsx         # Loading UI (Suspense boundary)
│   ├── error.tsx           # Error boundary ('use client' required)
│   ├── not-found.tsx       # 404 page
│   └── globals.css         # Global styles & Tailwind imports
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Card, Input)
│   └── features/           # Feature-specific composed components
├── lib/                    # Utility functions, constants, helpers
├── hooks/                  # Custom React hooks (client-side only)
├── types/                  # TypeScript type definitions
└── services/               # External API clients, data fetching
\`\`\`

## Routing Rules
- Every route segment is a folder inside \`app/\`.
- Use \`page.tsx\` for the segment's UI, \`layout.tsx\` for shared wrapping UI.
- Use \`loading.tsx\` for streaming/Suspense fallbacks.
- Use \`error.tsx\` (must be \`'use client'\`) for error boundaries.
- Use Route Groups \`(groupName)/\` to organize without affecting the URL.
- Use Dynamic Routes with \`[param]/\` folders and \`params\` prop.

## Data Fetching
- **Server Components**: Fetch data directly using \`async/await\` in the component body. Use \`fetch()\` with Next.js caching extensions.
- **Client Components**: Use React hooks (\`useEffect\`, SWR, or TanStack Query). Never fetch data at the top level of a client component module.
- **Server Actions**: Use \`'use server'\` functions for mutations. Define them in separate \`actions.ts\` files.
- **Caching**: Use \`unstable_cache\`, \`revalidateTag\`, or \`revalidatePath\` for granular cache control.

## API Routes
- Place in \`app/api/[endpoint]/route.ts\`.
- Export named functions: \`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`.
- Always validate request bodies with Zod.
- Return \`NextResponse.json()\` with appropriate status codes.
- Handle errors gracefully; never expose internal details.

## Component Guidelines
- Default to Server Components. Use \`'use client'\` only when you need:
  - Event handlers (\`onClick\`, \`onChange\`, etc.)
  - React hooks (\`useState\`, \`useEffect\`, \`useRef\`, etc.)
  - Browser-only APIs (\`window\`, \`document\`, \`localStorage\`)
- Keep client components small and focused. Pass server-fetched data as props.
- Use \`React.Suspense\` boundaries for async components.
- Co-locate component-specific types in the same file or a nearby \`types.ts\`.

## Styling
- Use Tailwind CSS v4 utility classes exclusively.
- Use \`cn()\` utility (from \`lib/utils.ts\`) for conditional class merging.
- Define design tokens in \`globals.css\` using CSS custom properties.
- Use responsive prefixes (\`sm:\`, \`md:\`, \`lg:\`, \`xl:\`) for responsive design.
- Prefer dark mode support via \`dark:\` variant.

## TypeScript Standards
- Enable \`strict: true\` in \`tsconfig.json\`.
- Define shared types in \`src/types/\`.
- Use \`interface\` for object shapes, \`type\` for unions/intersections/primitives.
- Use Zod schemas for runtime validation and infer types: \`type Foo = z.infer<typeof fooSchema>\`.
- All API responses must be typed.

## Performance
- Use \`next/image\` for all images (automatic optimization).
- Use \`next/font\` for font loading (no layout shift).
- Use \`next/link\` for client-side navigation.
- Use dynamic imports (\`next/dynamic\`) for heavy client components.
- Implement proper \`loading.tsx\` for route segments.
- Use \`generateStaticParams()\` for static generation of dynamic routes.

## Error Handling
- Use \`error.tsx\` boundaries per route segment.
- Use \`notFound()\` function to trigger 404 pages.
- API routes must return structured error responses: \`{ error: string, details?: unknown }\`.
- Log errors server-side; never expose stack traces to clients.

## SEO & Metadata
- Use the Metadata API (\`export const metadata\` or \`generateMetadata()\`) in \`layout.tsx\` and \`page.tsx\`.
- Every page must have a unique \`title\` and \`description\`.
- Use \`opengraph-image.tsx\` for dynamic OG images.
`;
}

export function getFastapiRules(): string {
  return `# Python FastAPI — AI Coding Standards
# Architecture: FastAPI + Pydantic v2 + SQLAlchemy 2.0 + Alembic

## Core Principles
- This is a Python FastAPI project with strict type safety.
- Use Python 3.11+ features: type hints everywhere, \`match\` statements, modern generics.
- Pydantic v2 for ALL data validation and serialization. Never use raw dicts for API I/O.
- SQLAlchemy 2.0 style with mapped_column and DeclarativeBase. No legacy 1.x patterns.
- Async-first: use \`async def\` for all route handlers and I/O-bound operations.

## Project Structure
\`\`\`
app/
├── main.py                 # FastAPI app creation, lifespan, middleware
├── core/
│   ├── config.py           # Pydantic Settings for env vars
│   ├── database.py         # SQLAlchemy engine, session, Base
│   └── security.py         # Auth utilities, JWT, hashing
├── api/
│   ├── router.py           # Main APIRouter aggregating all sub-routers
│   ├── deps.py             # Shared dependencies (get_db, get_current_user)
│   └── v1/
│       ├── users.py         # User endpoints
│       └── items.py         # Item endpoints
├── models/                 # SQLAlchemy ORM models
│   ├── __init__.py
│   ├── user.py
│   └── item.py
├── schemas/                # Pydantic schemas (request/response models)
│   ├── __init__.py
│   ├── user.py
│   └── item.py
├── services/               # Business logic layer
│   └── user_service.py
└── tests/
    ├── conftest.py
    └── test_*.py
\`\`\`

## Routing & Endpoints
- Use \`APIRouter\` for modular route organization.
- Prefix API versions: \`/api/v1/\`.
- Always define explicit \`response_model\` on endpoints.
- Use dependency injection (\`Depends()\`) for shared logic (DB sessions, auth, pagination).
- HTTP methods map to CRUD: GET=Read, POST=Create, PUT=Full Update, PATCH=Partial Update, DELETE=Remove.
- Use proper HTTP status codes: 201 for creation, 204 for deletion, 422 for validation errors.

## Pydantic Schemas
- Create separate schemas for each operation: \`UserCreate\`, \`UserUpdate\`, \`UserResponse\`, \`UserInDB\`.
- Use \`model_config = ConfigDict(from_attributes=True)\` to enable ORM mode.
- Use Pydantic \`Field()\` for validation constraints (min_length, max_length, regex, ge, le).
- Use computed fields (\`@computed_field\`) for derived properties.
- Validate at the boundary: schemas for API I/O, plain types internally.

## SQLAlchemy Models
- Use SQLAlchemy 2.0 style: \`DeclarativeBase\`, \`Mapped\`, \`mapped_column\`.
- Define relationships with \`Mapped[list["Child"]]\` and \`relationship()\`.
- Use \`server_default\` for database-level defaults (timestamps).
- Create indexes on frequently queried columns.
- Keep models focused: one model per table, one file per model.

## Error Handling
- Use \`HTTPException\` for API errors with proper status codes.
- Create custom exception classes for domain-specific errors.
- Register exception handlers in \`main.py\` for consistent error responses.
- Never expose internal errors or stack traces to API consumers.
- All error responses must follow: \`{"detail": "Human-readable message"}\`.

## Dependency Injection
- Use \`Depends()\` for reusable dependencies.
- Common dependencies: \`get_db\` (DB session), \`get_current_user\` (auth).
- Define dependencies in \`api/deps.py\` for shared use.
- Use \`yield\` dependencies for resources that need cleanup.

## Database & Migrations
- Use Alembic for all schema changes. Never modify the database manually.
- Generate migrations: \`alembic revision --autogenerate -m "description"\`.
- Apply migrations: \`alembic upgrade head\`.
- Session management via dependency injection with proper cleanup.

## Testing
- Use \`pytest\` with \`pytest-asyncio\` for async tests.
- Use \`httpx.AsyncClient\` with \`ASGITransport\` for API testing.
- Create fixtures in \`conftest.py\` for test database, client, and auth.
- Test both success and error paths for every endpoint.
- Use factories for test data generation.

## Type Safety
- Type hints are MANDATORY on all functions, parameters, and return values.
- Use \`ruff\` for linting and formatting.
- Use \`mypy --strict\` for static type checking.
- Prefer \`str | None\` over \`Optional[str]\` (modern union syntax).
- Use \`collections.abc\` for abstract types (\`Sequence\`, \`Mapping\`).

## Security
- Store secrets in environment variables, never in code.
- Use \`pydantic-settings\` to load and validate env vars.
- Hash passwords with bcrypt. Never store plaintext passwords.
- Implement rate limiting on authentication endpoints.
- Validate and sanitize all input data via Pydantic schemas.
`;
}

export function getExpressRules(): string {
  return `# Node.js Express API — AI Coding Standards
# Architecture: Express 5 + TypeScript + Zod + ES Modules

## Core Principles
- This is a Node.js Express API using TypeScript with strict mode and ES Modules.
- TypeScript strict mode is mandatory. Never use \`any\` — prefer \`unknown\` with type guards.
- Zod for ALL runtime validation (request bodies, query params, environment variables).
- ES Module syntax: use \`import/export\`, file extensions in imports (\`.js\`), and \`"type": "module"\` in package.json.
- Follow the Controller → Service → Repository layered architecture.

## Project Structure
\`\`\`
src/
├── index.ts                # Server entry point (listen)
├── app.ts                  # Express app setup, middleware, routes
├── config/
│   └── env.ts              # Zod-validated environment variables
├── routes/
│   ├── index.ts            # Main router aggregating all sub-routers
│   ├── users.ts            # User routes
│   └── items.ts            # Item routes
├── controllers/            # Route handlers (thin — delegate to services)
│   └── user.controller.ts
├── services/               # Business logic layer
│   └── user.service.ts
├── middleware/
│   ├── error-handler.ts    # Global error handling middleware
│   ├── validate.ts         # Zod validation middleware
│   └── auth.ts             # Authentication middleware
├── schemas/                # Zod validation schemas
│   └── user.schema.ts
├── types/                  # TypeScript type definitions
│   └── index.ts
└── utils/                  # Helper functions
    └── index.ts
\`\`\`

## Routing
- Use \`express.Router()\` for modular route organization.
- Prefix API versions: \`/api/v1/\`.
- Keep route files thin: define routes and apply middleware, delegate logic to controllers.
- Use proper HTTP methods: GET, POST, PUT, PATCH, DELETE.
- Use proper HTTP status codes: 201 (Created), 204 (No Content), 400 (Bad Request), 401, 403, 404, 500.

## Validation with Zod
- Define Zod schemas in \`src/schemas/\` for every request shape.
- Use the \`validate()\` middleware for automatic request validation.
- Infer TypeScript types from Zod schemas: \`type User = z.infer<typeof userSchema>\`.
- Validate environment variables at startup with Zod (fail fast).
- Never trust client input — validate everything.

## Error Handling
- Use a centralized \`errorHandler\` middleware (must be the LAST middleware).
- Create a custom \`AppError\` class extending \`Error\` with \`statusCode\` and \`isOperational\`.
- Catch Zod validation errors and return structured 400 responses.
- Never expose stack traces in production.
- All error responses must follow: \`{ status: "error", message: string }\`.

## Middleware
- Apply middleware in order: security → parsing → routes → error handling.
- Use \`helmet()\` for security headers.
- Use \`cors()\` with explicit origin configuration.
- Use \`express-rate-limit\` for rate limiting.
- Create reusable middleware for auth, validation, and logging.

## TypeScript Standards
- Enable \`strict: true\` in \`tsconfig.json\`.
- Use ES Module syntax with \`.js\` extensions in all imports.
- Define custom types in \`src/types/\`.
- Use \`interface\` for object shapes, \`type\` for unions and primitives.
- Type all Express handlers: \`(req: Request, res: Response, next: NextFunction)\`.
- Avoid \`any\`. Use \`unknown\` with type narrowing.

## Module System
- This project uses ES Modules (\`"type": "module"\` in package.json).
- ALL imports must include the \`.js\` extension: \`import { foo } from './bar.js'\`.
- Use \`import type {}\` for type-only imports.
- No CommonJS: do NOT use \`require()\`, \`module.exports\`, or \`__dirname\`.
- For \`__dirname\` equivalent: \`import.meta.dirname\` (Node 21+) or \`path.dirname(fileURLToPath(import.meta.url))\`.

## Security
- Store secrets in environment variables; validate with Zod at startup.
- Use \`helmet()\` for HTTP security headers.
- Sanitize and validate all inputs.
- Implement rate limiting on public and auth endpoints.
- Use parameterized queries for database operations (never string concatenation).

## Testing
- Use Vitest for unit and integration tests.
- Test routes with \`supertest\`.
- Mock external services and databases in tests.
- Test validation schemas, error handling, and edge cases.
- Aim for high coverage on business logic in services.
`;
}

export function getReactViteRules(): string {
  return `# React + Vite SPA — AI Coding Standards
# Architecture: React 19 + Vite + TypeScript + Tailwind CSS v4

## Core Principles
- This is a React SPA using Vite as the build tool.
- TypeScript with strict mode is mandatory. Never use \`any\` — prefer \`unknown\` with type guards.
- Use functional components exclusively. No class components.
- Use Tailwind CSS v4 for styling. Do NOT use inline styles or CSS modules unless explicitly justified.
- Vite handles all bundling and HMR. Never manually configure webpack.

## Project Structure
\`\`\`
src/
├── main.tsx                # App entry point (renders into #root)
├── App.tsx                 # Root component with routing
├── index.css               # Global styles & Tailwind imports
├── vite-env.d.ts           # Vite client types
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Card, Input)
│   └── features/           # Feature-specific composed components
├── pages/                  # Route page components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions, constants
├── types/                  # TypeScript type definitions
├── services/               # API clients, data fetching
└── assets/                 # Static assets (images, fonts)
\`\`\`

## Component Guidelines
- Use functional components with arrow function syntax.
- Co-locate component-specific types in the same file.
- Keep components small and focused. Extract reusable logic into hooks.
- Prefer composition over prop drilling — use Context sparingly.
- Use \`React.memo()\` only when profiling shows re-render performance issues.

## State Management
- Use \`useState\` and \`useReducer\` for local state.
- Use React Context for global state that rarely changes (theme, auth).
- For complex async state, use TanStack Query or SWR.
- Avoid prop drilling deeper than 2-3 levels.

## Routing
- Use React Router v6+ with \`createBrowserRouter\`.
- Define routes in a central routes file.
- Use lazy loading for route components: \`React.lazy(() => import(...))\`.
- Wrap lazy routes in \`Suspense\` with a loading fallback.

## Styling
- Use Tailwind CSS v4 utility classes exclusively.
- Use \`cn()\` utility for conditional class merging.
- Use responsive prefixes (\`sm:\`, \`md:\`, \`lg:\`) for responsive design.
- Prefer dark mode support via \`dark:\` variant.

## TypeScript Standards
- Enable \`strict: true\` in \`tsconfig.json\`.
- Define shared types in \`src/types/\`.
- Use \`interface\` for object shapes, \`type\` for unions/intersections.
- Use Zod schemas for runtime validation when needed.

## Environment Variables
- Prefix all env vars with \`VITE_\` for client access.
- Access via \`import.meta.env.VITE_*\`.
- Define types in \`src/vite-env.d.ts\`.
- Never expose sensitive values to the client bundle.

## Performance
- Use \`React.lazy()\` and \`Suspense\` for code splitting.
- Use the \`loading=\"lazy\"\` attribute on images.
- Minimize bundle size with tree-shaking (avoid barrel exports).
- Use Vite's built-in asset optimization.
`;
}

export function getNestjsRules(): string {
  return `# NestJS API — AI Coding Standards
# Architecture: NestJS 10 + TypeScript + Decorators + Dependency Injection

## Core Principles
- This is a NestJS application using TypeScript with strict mode.
- TypeScript strict mode is mandatory. Never use \`any\`.
- Use decorators for all metadata: \`@Controller\`, \`@Injectable\`, \`@Module\`, etc.
- Follow NestJS's Dependency Injection pattern. Never instantiate services manually.
- Use the modular architecture: every feature is a self-contained Module.

## Project Structure
\`\`\`
src/
├── main.ts                 # Bootstrap function (NestFactory)
├── app.module.ts           # Root module
├── app.controller.ts       # Root controller
├── app.service.ts          # Root service
├── common/
│   ├── decorators/         # Custom decorators
│   ├── filters/            # Exception filters
│   ├── guards/             # Auth guards
│   ├── interceptors/       # Response interceptors
│   ├── pipes/              # Validation pipes
│   └── dto/                # Shared DTOs
├── config/
│   └── configuration.ts    # ConfigModule settings
├── modules/
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   └── entities/
│   └── auth/
│       ├── auth.module.ts
│       ├── auth.controller.ts
│       └── auth.service.ts
└── prisma/ or typeorm/     # Database integration
\`\`\`

## Module Architecture
- Every feature gets its own Module, Controller, Service, DTOs, and Entities.
- Import modules via \`imports: []\` in the parent module.
- Export services via \`exports: []\` to make them available to other modules.
- Use \`@Global()\` sparingly — only for truly global modules (config, database).

## Controllers
- Controllers handle HTTP requests and delegate to services.
- Use decorators: \`@Get()\`, \`@Post()\`, \`@Put()\`, \`@Patch()\`, \`@Delete()\`.
- Use \`@Param()\`, \`@Query()\`, \`@Body()\` for extracting request data.
- Apply validation pipes: \`@UsePipes(ValidationPipe)\` or use the global pipe.
- Keep controllers thin — no business logic.

## Services
- Services contain all business logic.
- Mark with \`@Injectable()\` decorator.
- Inject dependencies via constructor injection.
- Use repository pattern for database operations.

## DTOs & Validation
- Define DTOs using \`class-validator\` decorators.
- Create separate DTOs: \`CreateUserDto\`, \`UpdateUserDto\`, \`UserResponseDto\`.
- Use \`class-transformer\` for serialization.
- Enable global ValidationPipe in \`main.ts\`.

## Error Handling
- Use NestJS built-in exceptions: \`NotFoundException\`, \`BadRequestException\`, etc.
- Create custom exception filters with \`@Catch()\` for specialized handling.
- All error responses follow: \`{ statusCode, message, error }\`.

## Guards & Middleware
- Use \`@UseGuards(AuthGuard)\` for authentication.
- Use interceptors for response transformation and logging.
- Apply global middleware in \`main.ts\` or the root module.

## Testing
- Use \`@nestjs/testing\` for unit and integration tests.
- Create a \`TestingModule\` for each test suite.
- Mock services with \`{ provide: Service, useValue: mockService }\`.
- Test controllers, services, and guards independently.
`;
}

export function getDjangoRules(): string {
  return `# Python Django — AI Coding Standards
# Architecture: Django 5 + Django REST Framework + SQLite/PostgreSQL

## Core Principles
- This is a Django project using Django REST Framework for APIs.
- Python 3.11+ features: type hints everywhere, modern syntax.
- Use Django's ORM for all database operations. Never write raw SQL unless performance-critical.
- Follow Django's "fat models, thin views" philosophy.
- Use class-based views (CBVs) for DRF — prefer \`ModelViewSet\` and \`GenericAPIView\`.

## Project Structure
\`\`\`
project/
├── manage.py               # Django CLI entry point
├── config/
│   ├── __init__.py
│   ├── settings.py         # Project settings (env-driven)
│   ├── urls.py             # Root URL configuration
│   ├── wsgi.py             # WSGI application
│   └── asgi.py             # ASGI application
├── apps/
│   ├── core/               # Shared models, utilities
│   │   ├── models.py       # Abstract base models (TimeStampedModel)
│   │   ├── views.py        # Health check, utility endpoints
│   │   └── urls.py
│   ├── users/              # User management app
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   └── ...                 # Feature apps
├── templates/              # Django templates (if using SSR)
├── static/                 # Static files
├── media/                  # User uploads
├── requirements.txt
└── Dockerfile
\`\`\`

## Models
- Inherit from a custom \`TimeStampedModel\` for \`created_at\`/\`updated_at\`.
- Use \`models.TextChoices\` for enum fields.
- Add \`class Meta\` with \`ordering\`, \`verbose_name\`, \`db_table\`.
- Create indexes on frequently queried fields.
- Define \`__str__\` on every model.
- Keep models focused: one model = one database table concept.

## Django REST Framework
- Use \`ModelSerializer\` for standard CRUD serializers.
- Create separate serializers for Create, Update, and List/Detail.
- Use \`ModelViewSet\` for full CRUD endpoints.
- Apply \`permission_classes\` on every view.
- Use \`filterset_fields\` and \`search_fields\` for filtering.
- Paginate all list endpoints.

## URL Patterns
- Use \`DefaultRouter\` for ViewSet-based URLs.
- Namespace all app URLs: \`app_name = "users"\`.
- API URLs under \`/api/v1/\` prefix.
- Use \`path()\` not \`re_path()\` for clean URL patterns.

## Admin
- Register all models in \`admin.py\`.
- Customize with \`list_display\`, \`list_filter\`, \`search_fields\`.
- Use \`fieldsets\` for complex model admin forms.

## Settings
- Use environment variables for all secrets and configuration.
- Use \`python-dotenv\` to load \`.env\` files.
- Never commit \`.env\` to version control.
- Split settings for dev/staging/production if needed.

## Migrations
- Always run \`makemigrations\` after model changes.
- Review migration files before applying.
- Never modify existing migrations — create new ones.
- Commit all migration files to version control.

## Testing
- Use Django's \`TestCase\` or \`pytest-django\`.
- Use factories (e.g., \`factory_boy\`) for test data.
- Test models, serializers, views, and permissions independently.
- Use \`APIClient\` for DRF endpoint testing.

## Security
- Use Django's built-in CSRF protection (for SSR).
- Store secrets in \`.env\` — never in code.
- Use \`django-cors-headers\` for CORS configuration.
- Validate all input via serializers.
- Hash passwords with Django's auth system.
`;
}

export function getRulesForTemplate(template: Template): string {
  switch (template) {
    case 'nextjs':
      return getNextjsRules();
    case 'react-vite':
      return getReactViteRules();
    case 'fastapi':
      return getFastapiRules();
    case 'django':
      return getDjangoRules();
    case 'express':
      return getExpressRules();
    case 'nestjs':
      return getNestjsRules();
  }
}
