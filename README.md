
# My React Router App

A modern web application built with React Router v7, designed for server-side rendering (SSR), and integrated with Supabase for backend services. This app uses the latest React 19 features and a Vite-powered build system for an optimized developer experience.

## Features

* 🚀 **React Router v7** – Full SSR support with routing defined in `react-router.config.ts`
* ⚡ **Vite** – Fast bundling, hot module reload, and dev experience
* 🧑‍💻 **TypeScript** – Type-safe development environment
* 🎨 **TailwindCSS** – Utility-first styling for rapid UI development
* 🌐 **Supabase** – Backend as a service for authentication, database, and more
* 🔥 **React 19** – Leveraging the latest React version for improved performance and new features
* 📦 **Docker Support** – Easily containerized with the provided `Dockerfile`

## Getting Started

### Prerequisites

* Node.js >= 18
* Docker (optional)
* Git

### Installation

```bash
git clone https://github.com/your-username/my-react-router-app.git
cd my-react-router-app
npm install
```

### Development

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

### Start SSR Server

```bash
npm start
```

## Configuration

* **Routing** is managed in `react-router.config.ts`
* **Environment variables** (e.g., Supabase credentials) should be stored securely and not committed to version control.

## Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start development server                  |
| `npm run build`     | Build project for production              |
| `npm start`         | Serve the SSR build                       |
| `npm run typecheck` | Run type generation and TypeScript checks |

## Deployment

To deploy using Docker:

```bash
docker build -t my-react-router-app .
docker run -p 3000:3000 my-react-router-app
```

For static deployment (if SSR not needed), use `gh-pages`:

```bash
npm run build
npx gh-pages -d build/client
```

## Technologies Used

* [React Router v7](https://reactrouter.com)
* [React 19](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [TailwindCSS](https://tailwindcss.com/)
* [Supabase](https://supabase.com/)
* [Docker](https://www.docker.com/)
* [TypeScript](https://www.typescriptlang.org/)


