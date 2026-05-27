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

export function getRulesForTemplate(template: Template): string {
  switch (template) {
    case 'nextjs':
      return getNextjsRules();
    case 'fastapi':
      return getFastapiRules();
    case 'express':
      return getExpressRules();
  }
}
