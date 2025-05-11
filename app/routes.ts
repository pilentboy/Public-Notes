import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("add-task", "routes/addTask.tsx"),
  route("task/:id", "routes/task.tsx"),
] satisfies RouteConfig;
