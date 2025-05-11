import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth", "routes/auth.tsx"),

  route("/auth/login", "routes/login.tsx"),
  route("/auth/register", "routes/register.tsx"),
  route("managing", "routes/protectedRoute.tsx", [
    route("add-task", "routes/addTask.tsx"),
    route("task/:id", "routes/task.tsx"),
  ]),
] satisfies RouteConfig;
