import { supabase } from "~/supabase-clinet";
import type { Route } from "./+types/notes";
import TaskItem from "~/components/note/NoteItem";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Notes" },
    {
      name: "description",
      content: "it's a simple To-Do App created by React Router V7",
    },
  ];
}

export async function loader() {
  try {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      return { error: error.message };
    }
    return { data };
  } catch (error) {
    return { error: "an error occured" };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <ul className="flex flex-col gap-4 items-center  w-full min-h-[400px] mt-10">
      {loaderData.data?.map((task) => (
        <TaskItem id={task.id} title={task.title} content={task.content} />
      ))}
    </ul>
  );
}
