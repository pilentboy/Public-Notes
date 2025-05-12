import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/auth": {};
  "/auth/login": {};
  "/auth/register": {};
  "/managing": {};
  "/managing/write": {};
  "/managing/edit/:id": {
    "id": string;
  };
};