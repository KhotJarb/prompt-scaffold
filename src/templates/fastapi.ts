import type { GeneratedFile } from '../types.js';

export function getFastapiFiles(projectName: string): GeneratedFile[] {
  const pyProjectName = projectName.replace(/-/g, '_');

  return [
    {
      path: 'pyproject.toml',
      content: `[project]
name = "${projectName}"
version = "0.1.0"
description = "Built with prompt-scaffold — AI-ready from day one"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
    "fastapi[standard]>=0.115.0",
    "sqlalchemy>=2.0.0",
    "pydantic>=2.0.0",
    "pydantic-settings>=2.0.0",
    "alembic>=1.14.0",
    "uvicorn[standard]>=0.34.0",
    "python-dotenv>=1.0.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "pytest-asyncio>=0.24.0",
    "httpx>=0.28.0",
    "ruff>=0.8.0",
    "mypy>=1.14.0",
]

[tool.ruff]
target-version = "py311"
line-length = 88

[tool.ruff.lint]
select = ["E", "F", "I", "N", "W", "UP", "B", "A", "SIM", "TCH"]

[tool.mypy]
python_version = "3.11"
strict = true
`,
    },
    {
      path: 'requirements.txt',
      content: `fastapi[standard]>=0.115.0
sqlalchemy>=2.0.0
pydantic>=2.0.0
pydantic-settings>=2.0.0
alembic>=1.14.0
uvicorn[standard]>=0.34.0
python-dotenv>=1.0.0
`,
    },
    {
      path: 'app/__init__.py',
      content: `"""${projectName} — Built with prompt-scaffold."""
`,
    },
    {
      path: 'app/main.py',
      content: `"""
${projectName} — FastAPI Application Entry Point
"""

from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan manager for startup/shutdown events."""
    # Startup
    print(f"🚀 Starting {settings.PROJECT_NAME}...")
    yield
    # Shutdown
    print(f"👋 Shutting down {settings.PROJECT_NAME}...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Built with prompt-scaffold — AI-ready from day one",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
async def health_check() -> dict[str, str]:
    """Health check endpoint."""
    return {"status": "ok", "version": settings.VERSION}
`,
    },
    {
      path: 'app/core/__init__.py',
      content: '',
    },
    {
      path: 'app/core/config.py',
      content: `"""Application configuration using Pydantic Settings."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    PROJECT_NAME: str = "${projectName}"
    VERSION: str = "0.1.0"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "sqlite:///./app.db"

    # CORS
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5173"]

    # Auth
    SECRET_KEY: str = "change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    model_config = {"env_file": ".env", "case_sensitive": True}


settings = Settings()
`,
    },
    {
      path: 'app/core/database.py',
      content: `"""Database configuration and session management."""

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from collections.abc import Generator

from app.core.config import settings


engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""
    pass


def get_db() -> Generator:
    """Dependency that provides a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
`,
    },
    {
      path: 'app/api/__init__.py',
      content: '',
    },
    {
      path: 'app/api/router.py',
      content: `"""Main API router that aggregates all endpoint routers."""

from fastapi import APIRouter

api_router = APIRouter()


@api_router.get("/")
async def root() -> dict[str, str]:
    """Root API endpoint."""
    return {"message": "Welcome to ${projectName} API"}
`,
    },
    {
      path: 'app/models/__init__.py',
      content: `"""SQLAlchemy models package."""
`,
    },
    {
      path: 'app/schemas/__init__.py',
      content: `"""Pydantic schemas package."""
`,
    },
    {
      path: 'tests/__init__.py',
      content: '',
    },
    {
      path: 'tests/test_main.py',
      content: `"""Tests for the main application."""

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_health_check() -> None:
    """Test the health check endpoint."""
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
`,
    },
    {
      path: '.gitignore',
      content: `# Python
__pycache__/
*.py[cod]
*$py.class
*.so

# Virtual environments
.venv/
venv/
env/

# Distribution
dist/
build/
*.egg-info/
*.egg

# IDE
.idea/
.vscode/
*.swp
*.swo

# Environment
.env
.env.local

# Database
*.db
*.sqlite3

# Testing
.coverage
htmlcov/
.pytest_cache/

# mypy
.mypy_cache/

# ruff
.ruff_cache/
`,
    },
    {
      path: '.env.example',
      content: `# Environment Variables
# Copy this file to .env and fill in the values

# Application
DEBUG=false
SECRET_KEY=change-me-in-production

# Database
DATABASE_URL=sqlite:///./app.db

# CORS
ALLOWED_ORIGINS=["http://localhost:3000"]
`,
    },
    {
      path: 'Dockerfile',
      content: `# --- Build stage ---
FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# --- Runtime stage ---
FROM python:3.11-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
`,
    },
    {
      path: 'tests/conftest.py',
      content: `"""Shared pytest fixtures for ${projectName}."""

from collections.abc import AsyncGenerator

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.database import Base, get_db
from app.main import app

# Use an in-memory SQLite database for tests
TEST_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(TEST_DATABASE_URL, echo=False)
TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(autouse=True)
def setup_database():
    """Create tables before each test and drop them after."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def _override_get_db():
    """Provide a test database session."""
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = _override_get_db


@pytest_asyncio.fixture
async def client() -> AsyncGenerator[AsyncClient, None]:
    """Async HTTP client wired to the FastAPI app."""
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac
`,
    },
  ];
}
