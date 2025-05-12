import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/notes.tsx"),
  route("auth", "routes/auth.tsx"),

  route("/auth/login", "routes/login.tsx"),
  route("/auth/register", "routes/register.tsx"),
  route("managing", "routes/protectedRoute.tsx", [
    route("write", "routes/write.tsx"),
    route("edit/:id", "routes/edit.tsx"),
  ]),
] satisfies RouteConfig;
