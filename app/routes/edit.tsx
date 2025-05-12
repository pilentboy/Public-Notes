import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { supabase } from "~/supabase-clinet";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { Route } from "./+types/edit";
import { toast } from "react-toastify";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editing Note ${params.id}` },
    {
      name: "description",
      content:
        "this page only displays the selected task from the home page form editing",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      return { error: error.message };
    }

    return { item: data };
  } catch (error) {
    return { error: "an error occurred" };
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) return { error: "the task ID can not be undefied" };
  try {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "delete") {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", params.id);
      if (error) {
        return { error: error.message };
      }
      return redirect("/");
    } else {
      const { error } = await supabase
        .from("tasks")
        .update({
          title: formData.get("title"),
          content: formData.get("content"),
        })
        .eq("id", params.id);
      if (error) {
        return { error: error.message };
      }
      return { updated: true };
    }
  } catch (error) {
    return { error: "an error occurred" };
  }
}

export default function Edit({ loaderData, actionData }: Route.ComponentProps) {
  const { item } = loaderData;
  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData?.error, {
        position: "top-center",
      });
    } else if (actionData?.updated) {
      toast.info("Updated", {
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
            defaultValue={item.title}
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
            maxLength={500}
            defaultValue={item.content}
            className="outline-none  rounded-2xl p-2 w-92 h-92 overflow-x-hidden overflow-y-auto  bg-gray-900 text-white"
            required
          />
        </div>

        <div className="flex  gap-2 ">
          <button
            type="submit"
            value={"update"}
            name="intent"
            className="w-27 h-10 flex items-center justify-center bg-gray-900 ms-1 rounded-2xl duration-200 cursor-pointer "
          >
            <FaRegEdit className="hover:text-blue-500   text-lg   duration-200 cursor-pointer " />
          </button>
          <button
            type="submit"
            value={"delete"}
            name="intent"
            className="w-27 h-10 flex items-center justify-center bg-gray-900 ms-1 rounded-2xl duration-200 cursor-pointer "
          >
            <MdDeleteForever className="hover:text-red-500  text-lg  duration-200 cursor-pointer" />
          </button>
        </div>
      </Form>
    </div>
  );
}
