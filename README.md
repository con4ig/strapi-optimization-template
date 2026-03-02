# Intelligent Blog System with AI SEO Support

An open-source template integrating Strapi v5, Next.js (App Router), and PostgreSQL.

The architecture incorporates the Sensinum MCP Plugin, allowing external AI models to interface directly with the CMS content nodes for SEO analysis and automated metadata generation.

---

## Architecture Overview

The project relies on a containerized environment to manage the stack:

- **Headless CMS:** Strapi v5 (TypeScript)
- **Frontend App:** Next.js 15+ (App Router, Tailwind CSS, TypeScript)
- **Database:** PostgreSQL 16
- **Reverse Proxy:** Nginx Proxy Manager (SSL termination, routing)
- **Orchestration:** Docker & Docker Compose

---

## AI & MCP Integration

This system exposes internal Strapi content structures via the Model Context Protocol (MCP) using the `@sensinum/strapi-plugin-mcp`.

### Core Capabilities:

1. **Context Exposure:** Exposes Strapi Collection Types (e.g., Articles, Categories, Tags) to authorized AI clients.
2. **SEO Analysis:** Allows an external AI agent to read rich-text article drafts and compare them against target keywords.
3. **Automated Updates:** Enables the AI agent to propose or directly inject generated meta titles, meta descriptions, and structured data back into the Strapi database.

---

## Quick Start

### Prerequisites

- Docker Engine and Docker Compose
- Node.js 20+

### Deployment

Initialize the entire stack utilizing Docker Compose:

```bash
docker compose up -d --build
```

### Access Points

- **Strapi Admin Panel:** [http://localhost:1337/admin](http://localhost:1337/admin)
- **Next.js Frontend:** [http://localhost:3000](http://localhost:3000)
- **Nginx Proxy Manager:** [http://localhost:81](http://localhost:81)

---

## Technical Features

- **SEO Component Support:** Standardized schema for metadata, keywords, and structured data handling.
- **Media Optimization:** Configured for WebP conversion within the CMS asset pipeline.
- **Strict Typing:** 100% TypeScript coverage enforced across backend models and frontend consuming layers.
- **Code Standards:** Pre-configured ESLint, Prettier, and adherence to Conventional Commits.

## License

This project is licensed under the [MIT License](LICENSE).
