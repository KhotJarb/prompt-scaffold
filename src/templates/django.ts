import type { GeneratedFile } from '../types.js';

export function getDjangoFiles(projectName: string): GeneratedFile[] {
  const pyProjectName = projectName.replace(/-/g, '_');

  return [
    {
      path: 'requirements.txt',
      content: `django>=5.0
djangorestframework>=3.15.0
django-cors-headers>=4.3.0
python-dotenv>=1.0.0
gunicorn>=22.0.0
`,
    },
    {
      path: 'manage.py',
      content: `#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""

import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
`,
    },
    {
      path: 'config/__init__.py',
      content: '',
    },
    {
      path: 'config/settings.py',
      content: `"""
Django settings for ${projectName}.

Built with prompt-scaffold — AI-ready from day one.
"""

import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / "subdir".
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "False").lower() in ("true", "1", "yes")

ALLOWED_HOSTS = [
    h.strip()
    for h in os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
    if h.strip()
]

# ---------------------------------------------------------------------------
# Application definition
# ---------------------------------------------------------------------------

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "corsheaders",
    # Local
    "apps.core",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# ---------------------------------------------------------------------------
# Database
# ---------------------------------------------------------------------------

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ---------------------------------------------------------------------------
# Password validation
# ---------------------------------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ---------------------------------------------------------------------------
# Internationalization
# ---------------------------------------------------------------------------

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ---------------------------------------------------------------------------
# Static & Media files
# ---------------------------------------------------------------------------

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# ---------------------------------------------------------------------------
# Default primary key field type
# ---------------------------------------------------------------------------

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ---------------------------------------------------------------------------
# Django REST Framework
# ---------------------------------------------------------------------------

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
}

# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
]

CORS_ALLOW_CREDENTIALS = True
`,
    },
    {
      path: 'config/urls.py',
      content: `"""
URL configuration for ${projectName}.
"""

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("apps.core.urls")),
]
`,
    },
    {
      path: 'config/wsgi.py',
      content: `"""
WSGI config for ${projectName}.

It exposes the WSGI callable as a module-level variable named \`\`application\`\`.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

application = get_wsgi_application()
`,
    },
    {
      path: 'config/asgi.py',
      content: `"""
ASGI config for ${projectName}.

It exposes the ASGI callable as a module-level variable named \`\`application\`\`.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

application = get_asgi_application()
`,
    },
    {
      path: 'apps/__init__.py',
      content: '',
    },
    {
      path: 'apps/core/__init__.py',
      content: '',
    },
    {
      path: 'apps/core/apps.py',
      content: `"""App configuration for the core app."""

from django.apps import AppConfig


class CoreConfig(AppConfig):
    """Configuration for the core application."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.core"
    verbose_name = "Core"
`,
    },
    {
      path: 'apps/core/models.py',
      content: `"""Core models for ${projectName}."""

from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with created_at and updated_at timestamps."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]
`,
    },
    {
      path: 'apps/core/admin.py',
      content: `"""Admin configuration for the core app."""

from django.contrib import admin  # noqa: F401

# Register your models here.
`,
    },
    {
      path: 'apps/core/views.py',
      content: `"""Views for the core app."""

from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response


@api_view(["GET"])
def health_check(request: Request) -> Response:
    """Health check endpoint."""
    return Response({"status": "ok", "message": "API is running"})
`,
    },
    {
      path: 'apps/core/urls.py',
      content: `"""URL patterns for the core app."""

from django.urls import path

from apps.core import views

urlpatterns = [
    path("health-check/", views.health_check, name="health-check"),
]
`,
    },
    {
      path: 'apps/core/serializers.py',
      content: `"""Serializers for the core app."""

from rest_framework import serializers  # noqa: F401
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

# Environment
.env
.env.local

# Database
db.sqlite3

# Media
media/

# Static (collected)
staticfiles/

# IDE
.idea/
.vscode/
*.swp
*.swo

# Distribution
dist/
build/
*.egg-info/
*.egg

# Testing
.coverage
htmlcov/
.pytest_cache/
`,
    },
    {
      path: '.env.example',
      content: `# Environment Variables
# Copy this file to .env and fill in the values

SECRET_KEY=change-me
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
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

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
`,
    },
    {
      path: 'ruff.toml',
      content: `# Ruff — Fast Python Linter & Formatter
# Docs: https://docs.astral.sh/ruff/

target-version = "py311"
line-length = 88

[lint]
select = [
    "E",     # pycodestyle errors
    "W",     # pycodestyle warnings
    "F",     # pyflakes
    "I",     # isort
    "N",     # pep8-naming
    "UP",    # pyupgrade
    "B",     # flake8-bugbear
    "SIM",   # flake8-simplify
    "TCH",   # flake8-type-checking
]
ignore = ["E501"]

[lint.isort]
known-first-party = ["apps", "config"]

[format]
quote-style = "double"
indent-style = "space"
`,
    },
    {
      path: '.editorconfig',
      content: `root = true

[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{json,yml,yaml,toml}]
indent_size = 2

[*.md]
trim_trailing_whitespace = false
`,
    },
  ];
}
