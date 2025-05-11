import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  NavLink,
} from "react-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LuNotebookPen } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";

import type { Route } from "./+types/root";
import "./app.css";
import Nav from "./components/header/Nav";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// we define the HTML of the APP we want to work on it from here
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* children is actully the App component which is in this file */}
        <AuthProvider>{children}</AuthProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isAuthenticated, setLogout } = useAuth();

  return (
    <>
      <header className="container  mx-auto my-2  flex justify-between items-center ">
        {isAuthenticated && (
          <CiLogout
            className="text-4xl hover:text-red-500 duration-200 cursor-pointer"
            title="logout"
            onClick={setLogout}
          />
        )}
        <Nav />
        <LuNotebookPen
          className="text-4xl hover:text-orange-400 duration-200 cursor-pointer hidden md:block"
        />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
