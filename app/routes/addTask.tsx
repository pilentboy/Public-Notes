import { supabase } from "~/supabase-clinet";
import type { Route } from "./+types/home";
import { Form, redirect, type ActionFunctionArgs } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add Task" },
    {
      name: "description",
      content: "You can add your tasks from this page",
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
      return { error: "please fill out all the form inputs" };
    }
    return redirect("/");
  } catch (error) {
    return { error: "an error occured" };
  }
}

export default function AddTask() {
  return (
    <div >
      <Form method="post" className="flex flex-col items-center gap-2">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="title" className="ms-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-27 h-10 bg-gray-900 ms-1 rounded-2xl duration-200 cursor-pointer hover:text-orange-400"
        >
          Add
        </button>
      </Form>
    </div>
  );
}
