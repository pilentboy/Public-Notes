import { supabase } from "~/supabase-clinet";
import type { Route } from "./+types/write";
import {
  Form,
  redirect,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Write" },
    {
      name: "description",
      content: "You can add your notes from this page",
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const { error } = await supabase.from("tasks").insert({
      title: formData.get("title"),
      content: formData.get("content"),
    });
    if (error) {
      return { error: "an error occurred" };
    }
    return redirect("/");
  } catch (error) {
    return { error: "an error occurred" };
  }
}

export default function Write({ actionData }: Route.ComponentProps) {
  const { state } = useNavigation();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData?.error, {
        position: "top-center",
      });
    }
  }, [actionData]);
  return (
    <div className="mt-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <Form method="post" className="flex flex-col items-center gap-2">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="title" className="ms-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
			maxLength={20}
            className="outline-none rounded-2xl p-2 w-92 bg-gray-900 text-white"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="ms-1">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            className="outline-none  rounded-2xl p-2 w-92 h-92 overflow-x-hidden overflow-y-auto  bg-gray-900 text-white"
			 maxLength={500}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-27 h-10  ms-1 rounded-2xl duration-200  hover:text-orange-400 ${
            state == "submitting"
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gray-900 cursor-pointer"
          }`}
          disabled={state === "submitting"}
        >
          Add
        </button>
      </Form>
    </div>
  );
}
