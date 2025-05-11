import { Form, type ActionFunctionArgs } from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/register";
import { register } from "~/api";

export function meta({}: Route.ActionArgs) {
  return [
    { title: "Register" },
    {
      name: "description",
      content: "Register page",
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const { error } = await register({
      username: formData.get("username"),
      password: formData.get("password"),
    });
    if (error) {
      console.log(error);
      return { error: error[0].msg || error };
    }
    return { registered: true };
  } catch (error) {
    return { error: "an unknown error occured" };
  }
}

export default function Register({ actionData }: Route.ComponentProps) {
  const [displayPass, setDisplayPass] = useState<boolean>(false);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  useEffect(() => {
    if (actionData?.error) {
      setDisplayModal(true);
    }
  }, [actionData]);
  return (
    <Form
      method="post"
      className="flex flex-col items-center gap-3 mt-40  mx-auto p-5 rounded-md  "
    >
      <h1 className="mb-5 ">Register</h1>
      <div className="flex flex-col gap-1 ">
        <label htmlFor="username" className="ms-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="outline-none rounded-2xl p-2 w-92 bg-gray-900 text-white"
          required
        />
      </div>
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="password" className="ms-1">
          Password
        </label>
        <input
          type={displayPass ? "text" : "password"}
          name="password"
          id="password"
          className="outline-none rounded-2xl p-2 w-92 bg-gray-900 text-white"
          required
        />
        <button
          type="button"
          className="absolute w-5 h-5 bg-blue-700 rounded-full right-2 top-[55%] hover:bg-amber-400 duration-200 cursor-pointer z-40"
          onClick={() => setDisplayPass((pre) => !pre)}
        ></button>
      </div>
      <button
        type="submit"
        className="w-27 h-10 bg-gray-900 ms-1 rounded-2xl duration-200 cursor-pointer hover:text-orange-400"
      >
        Submit
      </button>
      {displayModal && (
        <div
          className="fixed top-0 left-0 w-screen h-screen backdrop-blur-[1px] flex items-center justify-center"
          onClick={() => setDisplayModal(false)}
        >
          {actionData?.error && (
            <span className="text-red-500 font-bold  bg-white p-5">
              {actionData.error}
            </span>
          )}
        </div>
      )}
      {actionData?.registered && (
        <span className="text-orange-400 font-bold  bg-white">
          Registered Successfully
        </span>
      )}
    </Form>
  );
}
