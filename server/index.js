import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, NavLink, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, Link, redirect, Form } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function Header({ children }) {
  return /* @__PURE__ */ jsx("header", { className: "container  mx-auto my-2 ", children });
}
function CustomLink({
  title,
  path
}) {
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
    NavLink,
    {
      to: path,
      className: ({ isActive }) => isActive ? "text-orange-400" : "text-white",
      children: title
    }
  ) });
}
function Nav() {
  return /* @__PURE__ */ jsx("nav", { className: "py-3 rounded-2xl  w-86 mx-auto bg-gray-800 shadow z-50  ", children: /* @__PURE__ */ jsxs("ul", { className: "mx-auto flex items-center justify-evenly ", children: [
    /* @__PURE__ */ jsx(CustomLink, { title: "My Tasks", path: "/" }),
    /* @__PURE__ */ jsx(CustomLink, { title: "Add Task", path: "add-task" })
  ] }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Header, {
      children: /* @__PURE__ */ jsx(Nav, {})
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const URL = "https://knfrepuopwryrpbxfgxa.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZnJlcHVvcHdyeXJwYnhmZ3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MzA5ODQsImV4cCI6MjA2MjQwNjk4NH0.KYumy3vL5zLD13UzOLx1zp99cHbGgfKYM___I3ID5FU";
const supabase = createClient(URL, API_KEY);
function TaskItem({
  id,
  title,
  content
}) {
  const [displayContent, setDisplayContent] = useState(false);
  return /* @__PURE__ */ jsxs(
    "li",
    {
      id,
      className: `w-[420px] md:w-[800px] flex items-center justify-between  p-3  bg-gray-800 rounded-md ${displayContent ? "h-fit" : " h-24 md:h-16"} `,
      children: [
        /* @__PURE__ */ jsx(Link, { to: `/task/${id}`, className: "w-32", children: title }),
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "text-sm w-2/4",
            onClick: () => setDisplayContent((pre) => !pre),
            children: [
              displayContent || content.length < 90 ? content : content.slice(0, 90),
              displayContent || content.length < 90 ? null : "..."
            ]
          }
        )
      ]
    }
  );
}
function meta$2({}) {
  return [{
    title: "My Tasks"
  }, {
    name: "description",
    content: "it's a simple To-Do App created by React Router V7"
  }];
}
async function loader$1() {
  try {
    const {
      data,
      error
    } = await supabase.from("tasks").select("*");
    if (error) {
      return {
        error: error.message
      };
    }
    return {
      data
    };
  } catch (error) {
    return {
      error: "an error occured"
    };
  }
}
const home = withComponentProps(function Home({
  loaderData
}) {
  var _a;
  return /* @__PURE__ */ jsx("ul", {
    className: "flex flex-col gap-4 items-center  w-full min-h-[400px] mt-10",
    children: (_a = loaderData.data) == null ? void 0 : _a.map((task2) => /* @__PURE__ */ jsx(TaskItem, {
      id: task2.id,
      title: task2.title,
      content: task2.content
    }))
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader: loader$1,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Add Task"
  }, {
    name: "description",
    content: "You can add your tasks from this page"
  }];
}
async function action$1({
  request
}) {
  try {
    const formData = await request.formData();
    const {
      error
    } = await supabase.from("tasks").insert({
      title: formData.get("title"),
      content: formData.get("content")
    });
    if (error) {
      return {
        error: "please fill out all the form inputs"
      };
    }
    return redirect("/");
  } catch (error) {
    return {
      error: "an error occured"
    };
  }
}
const addTask = withComponentProps(function AddTask() {
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsxs(Form, {
      method: "post",
      className: "flex flex-col items-center gap-2",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-1 ",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "title",
          className: "ms-1",
          children: "Title"
        }), /* @__PURE__ */ jsx("input", {
          type: "text",
          name: "title",
          id: "title",
          className: "outline-none rounded-2xl p-2 w-92 bg-gray-900 text-white",
          required: true
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-1",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "content",
          className: "ms-1",
          children: "Content"
        }), /* @__PURE__ */ jsx("textarea", {
          name: "content",
          id: "content",
          className: "outline-none  rounded-2xl p-2 w-92 h-92 overflow-x-hidden overflow-y-auto  bg-gray-900 text-white",
          required: true
        })]
      }), /* @__PURE__ */ jsx("button", {
        type: "submit",
        className: "w-27 h-10 bg-gray-900 ms-1 rounded-2xl duration-200 cursor-pointer hover:text-orange-400",
        children: "Add"
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: addTask,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({
  params
}) {
  return [{
    title: `Edigin task ${params.id}`
  }, {
    name: "description",
    content: "this page only displays the selected task from the home page form editing"
  }];
}
async function loader({
  params
}) {
  try {
    const {
      data,
      error
    } = await supabase.from("tasks").select("*").eq("id", params.id).single();
    if (error) {
      return {
        error: error.message
      };
    }
    return {
      item: data
    };
  } catch (error) {
    return {
      error: "an error occured"
    };
  }
}
async function action({
  request,
  params
}) {
  if (!params.id) return {
    error: "the task ID can not be undefied"
  };
  try {
    const formData = await request.formData();
    const intent = formData.get("intent");
    if (intent === "delete") {
      const {
        error
      } = await supabase.from("tasks").delete().eq("id", params.id);
      if (error) {
        return {
          error: error.message
        };
      }
      return redirect("/");
    } else {
      const {
        error
      } = await supabase.from("tasks").update({
        title: formData.get("title"),
        content: formData.get("content")
      }).eq("id", params.id);
      if (error) {
        return {
          error: error.message
        };
      }
      return {
        updated: true
      };
    }
  } catch (error) {
    return {
      error: "an error occured"
    };
  }
}
const task = withComponentProps(function Task({
  loaderData,
  actionData
}) {
  const {
    item
  } = loaderData;
  const [displayModal, setDisplayModal] = useState(false);
  useEffect(() => {
    if (actionData == null ? void 0 : actionData.error) {
      setDisplayModal(true);
    }
  }, [actionData]);
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsxs(Form, {
      method: "post",
      className: "flex flex-col items-center gap-2",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-1 ",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "title",
          className: "ms-1",
          children: "Title"
        }), /* @__PURE__ */ jsx("input", {
          type: "text",
          name: "title",
          id: "title",
          defaultValue: item.title,
          className: "outline-none rounded-2xl p-2 w-92 bg-gray-900 text-white",
          required: true
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-1",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "content",
          className: "ms-1",
          children: "Content"
        }), /* @__PURE__ */ jsx("textarea", {
          name: "content",
          id: "content",
          defaultValue: item.content,
          className: "outline-none  rounded-2xl p-2 w-92 h-92 overflow-x-hidden overflow-y-auto  bg-gray-900 text-white",
          required: true
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex  gap-2 ",
        children: [/* @__PURE__ */ jsx("button", {
          type: "submit",
          value: "update",
          name: "intent",
          className: "w-27 h-10 flex items-center justify-center bg-gray-900 ms-1 rounded-2xl duration-200 cursor-pointer ",
          children: /* @__PURE__ */ jsx(FaRegEdit, {
            className: "hover:text-blue-500   text-lg   duration-200 cursor-pointer "
          })
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          value: "delete",
          name: "intent",
          className: "w-27 h-10 flex items-center justify-center bg-gray-900 ms-1 rounded-2xl duration-200 cursor-pointer ",
          children: /* @__PURE__ */ jsx(MdDeleteForever, {
            className: "hover:text-red-500  text-lg  duration-200 cursor-pointer"
          })
        })]
      }), displayModal && /* @__PURE__ */ jsx("div", {
        className: "fixed top-0 left-0 w-screen h-screen backdrop-blur-[1px] flex items-center justify-center",
        onClick: () => setDisplayModal(false),
        children: (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ jsx("span", {
          className: "text-red-500 font-bold  bg-white",
          children: actionData.error
        })
      }), (actionData == null ? void 0 : actionData.updated) && /* @__PURE__ */ jsx("span", {
        className: "text-orange-400 font-bold  bg-white",
        children: "Updated Successfully"
      })]
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: task,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CQjWHx6l.js", "imports": ["/assets/chunk-D4RADZKF-DQDCwO_H.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BFjoN22B.js", "imports": ["/assets/chunk-D4RADZKF-DQDCwO_H.js", "/assets/with-props-CTFtL5MB.js"], "css": ["/assets/root-Cr3ugJgS.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DnKRQCI-.js", "imports": ["/assets/with-props-CTFtL5MB.js", "/assets/chunk-D4RADZKF-DQDCwO_H.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/addTask": { "id": "routes/addTask", "parentId": "root", "path": "add-task", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/addTask-DyctE4KU.js", "imports": ["/assets/with-props-CTFtL5MB.js", "/assets/chunk-D4RADZKF-DQDCwO_H.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/task": { "id": "routes/task", "parentId": "root", "path": "task/:id", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/task-Cq5kn_xU.js", "imports": ["/assets/with-props-CTFtL5MB.js", "/assets/chunk-D4RADZKF-DQDCwO_H.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-3727d4f3.js", "version": "3727d4f3", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/addTask": {
    id: "routes/addTask",
    parentId: "root",
    path: "add-task",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/task": {
    id: "routes/task",
    parentId: "root",
    path: "task/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
