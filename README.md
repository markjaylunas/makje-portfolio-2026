# 🚀 makje-portfolio-2026

A high-performance, professional portfolio website built with the cutting-edge **TanStack Start** ecosystem. This project serves as a comprehensive showcase of work, experience, and technical expertise, featuring a robust admin dashboard and seamless Cloudflare integration.

![Banner](https://img.shields.io/badge/Status-In%20Development-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Overview

This portfolio is designed for speed, scalability, and modern UX. It leverages server-side rendering (SSR) via **TanStack Start**, a type-safe database layer with **Drizzle ORM**, and is deployed on **Cloudflare's** global edge network.

---

## 🛠️ Technology Stack

### **Core Framework & Language**

- **[React 19](https://react.dev/):** The latest version of the world's most popular UI library, utilizing the **React Compiler** for automatic memoization.
- **[TypeScript](https://www.typescriptlang.org/):** Strong typing for reliable and maintainable code.
- **[TanStack Start](https://tanstack.com/start/latest):** Full-stack React framework with built-in SSR and type-safe routing.

### **Data & State Management**

- **[TanStack Query (v5)](https://tanstack.com/query/latest):** Powerful asynchronous state management.
- **[TanStack Router](https://tanstack.com/router/latest):** Fully type-safe routing for React.
- **[TanStack Table](https://tanstack.com/table/latest):** Headless UI for building powerful tables & datagrids.
- **[TanStack Form](https://tanstack.com/form/latest):** Type-safe form logic and validation.

### **Database & Authentication**

- **[Drizzle ORM](https://orm.drizzle.team/):** TypeScript ORM for safe and fast database interactions.
- **[Cloudflare D1](https://developers.cloudflare.com/d1/):** Distributed SQLite database at the edge.
- **[Better Auth](https://www.better-auth.com/):** Modern authentication with Google, GitHub, and Anonymous session support.

### **Styling & UI**

- **[Tailwind CSS v4](https://tailwindcss.com/):** The next generation of utility-first CSS.
- **[Motion (Framer Motion)](https://motion.dev/):** Fluid animations and transitions.
- **[HugeIcons](https://hugeicons.com/):** High-quality, professional icon set.
- **[Shadcn UI](https://ui.shadcn.com/):** Reusable, accessible component library.

### **Infrastructure & Utilities**

- **[Cloudflare Pages & Workers](https://workers.cloudflare.com/):** Edge computing and hosting.
- **[Cloudflare R2](https://developers.cloudflare.com/r2/):** S3-compatible object storage for images and assets.
- **[Resend](https://resend.com/):** Email delivery platform for contact forms.
- **[React Email](https://react.email/):** Modular email templates built with React.
- **[Biome](https://biomejs.dev/):** Ultra-fast toolchain for linting and formatting.

---

## 📂 Project Structure

```bash
src/
├── assets/           # Static assets, icons, and images
├── components/       # Reusable UI components (common, home, admin)
├── data/             # Server-side queries, mutations, and API logic
├── db/               # Database schema, migrations, and Drizzle config
├── form-validators/  # Zod schemas for form validation
├── hooks/            # Custom React hooks
├── lib/              # Shared utilities, auth setup, and constants
├── routes/           # TanStack Router page definitions
└── styles.css        # Tailwind V4 and global CSS
```

---

## 🚀 Getting Started

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v8+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-cli/) (for Cloudflare)

### **1. Clone & Install**

```bash
git clone https://github.com/markjaylunas/makje-portfolio-2026.git
cd makje-portfolio-2026
pnpm install
```

### **2. Environment Setup**

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

*Required: `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `CLOUDFLARE_ACCOUNT_ID`, `RESEND_API_KEY`.*

### **3. Database Setup (D1)**

Initialize your local or remote database and run migrations:

```bash
# Generate migrations
pnpm db:generate

# Push to local/remote D1
pnpm db:push
```

### **4. Local Development**

Start the development server with Vite:

```bash
pnpm dev
```

Access the site at `http://localhost:3000`.

---

## 🚢 Deployment

The project is optimized for **Cloudflare Pages**.

```bash
# Build the application
pnpm build

# Deploy via Wrangler
pnpm deploy
```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

**Mark Jay Lunas** - [LinkedIn](https://linkedin.com/in/markjaylunas) - [Website](https://markjay.dev)

Project Link: [https://github.com/markjaylunas/makje-portfolio-2026](https://github.com/markjaylunas/makje-portfolio-2026)
