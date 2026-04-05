# Mark Jay Lunas Portfolio (makje-portfolio-2026)

This project is a personal portfolio website built with modern web technologies, primarily using React, TanStack Start, and TypeScript, with a focus on performance, scalability, and ease of content management. It showcases projects, experience, and contact info, with an admin dashboard for content updates.

## Core Technologies

- **React & TypeScript:** The main framework and language for building UI components.
- **Vite:** The build tool, indicated by `vite.config.ts`.
- **Tailwind CSS:** For styling, inferred from the class-based styling approach.
- **TanStack (formerly React Query & Router):** For data fetching and routing, suggested by the project structure and naming conventions.
- **Drizzle ORM:** For database interactions, as seen in the `drizzle.config.ts` and `db/` directory.
- **SQLite:** The database system, implied by the migrations and schema files.
- **Cloudflare Workers / Vercel:** Deployment targets, suggested by the presence of worker configuration and server files.
- **Auth & User Management:** Custom auth logic, with files like `lib/auth.ts`, `lib/auth.server.ts`, and `data/query/` files for server-side data fetching.

## Project Structure Highlights

- **`src/` Directory:** Contains all source code, including components, hooks, data queries, server handlers, and UI elements.
- **`components/`:** Modular React components for layout, UI, forms, and admin features.
- **`routes/`:** Defines the app's routing structure, including protected routes (`_protected/`) and admin pages.
- **`data/`:** Contains server-side data fetching logic, options, and database queries.
- **`db/`:** Database schema, migrations, and types.
- **`lib/`:** Utility functions, constants, and auth helpers.
- **`assets/`:** Icons, images, and SVGs used across the site.
- **`styles.css`:** Tailwind and custom styles.

## Getting Started

### Prerequisites

- **Node.js & pnpm:** Ensure you have Node.js installed, and `pnpm` package manager.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/markjaylunas/makje-portfolio-2026.git
cd makje-portfolio-2026
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

- Copy `.env.example` to `.env` or `.env.local`.
- Set database connection strings, secrets, and API keys as needed.

4. Set up the database:

- Run migrations to sync schema:

```bash
pnpm dlx drizzle-kit push
```

### Running the Development Server

Start the local dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Building & Deployment

- Build for production:

```bash
pnpm build
```

- Preview production build locally:

```bash
pnpm start
```

- Deployment targets include Cloudflare Workers and Vercel, configured via project settings and deployment scripts.

## Content Management & Admin

- The admin dashboard, located under `routes/_protected/admin/`, allows managing projects, technologies, experience, and contact messages.
- Authentication is handled via custom logic in `lib/auth.ts`, enabling Google Sign-In and session management.
- Data queries and mutations are managed through server files in `data/query/` and `data/server/`.

## Additional Notes

- The project uses a modular, component-based architecture for scalability.
- Styling is consistent with Tailwind CSS, ensuring responsiveness.
- The codebase is organized to separate client-side UI, server-side data, and database schema.
