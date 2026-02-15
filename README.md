# Mark Jay Lunas Portfolio (makje-portfolio-2026)

Welcome to the repository for **[makje.com](https://makje.com)**, the personal portfolio website of **Mark Jay Lunas**.

This project showcases my journey as a Web Developer, highlighting my skills, experience, and recent projects. It is built with performance and scalability in mind using modern web technologies.

## About The Project

This portfolio serves as a central hub for my professional identity. It includes:

- **Home Page**: An introduction to who I am and what I do.
- **Dynamic Projects Section**: showcase of my recent work, dynamically loaded from the database.
- **Admin Dashboard**: A secure area for managing content, such as updating the skills list and adding new projects.
- **Interactive Features**: Users can sign in via Google to "like" projects they find interesting.

## Features

- **Tech Stack**: Built with [TanStack Start](https://tanstack.com/start) for full-stack React capabilities.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first, responsive design.
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/)) managed with [Drizzle ORM](https://orm.drizzle.team/).
- **Authentication**: [Better Auth](https://www.better-auth.com/) for secure Google Sign-In and session management.
- **Deployment**: Optimized for edge deployment (e.g., Cloudflare Workers/Pages or Vercel).

## Getting Started

To run this application locally, follow these steps:

### Prerequisites

Ensure you have `pnpm` installed.

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/markjaylunas/makje-portfolio-2026.git
    cd makje-portfolio-2026
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Set up environment variables:
    - Copy `.env.example` to `.env` (or `.env.local`).
    - Configure your database connection string and authentication secrets.

4.  Run database migrations (if applicable):
    ```bash
    pnpm dlx drizzle-kit push
    # or
    pnpm db:push
    ```

### Running the App

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a production build:

```bash
pnpm build
```

You can verify the build locally with:

```bash
pnpm start
```

## Contact

**Mark Jay Lunas**  
Web Developer  
Email: [markjay.lunas@gmail.com](mailto:markjay.lunas@gmail.com)  
LinkedIn: [linkedin.com/in/markjaylunas](https://linkedin.com/in/markjaylunas)  
GitHub: [github.com/markjaylunas](https://github.com/markjaylunas)
