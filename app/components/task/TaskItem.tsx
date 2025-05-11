import { useState } from "react";

import { Link } from "react-router";

export async function action(id: string) {
  try {
    console.log("id:", id);
  } catch (error) {}
}

export default function TaskItem({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  const [displayContent, setDisplayContent] = useState<boolean>(false);

  return (
    <li
      id={id}
      className={`w-[420px] md:w-[800px] flex items-center justify-between  p-3  bg-gray-800 rounded-md ${
        displayContent ? "h-fit" : " h-24 md:h-16"
      } `}
    >
      <Link to={`managing/task/${id}`} className="w-32">
        {title}
      </Link>
      <p
        className="text-sm w-2/4"
        onClick={() => setDisplayContent((pre) => !pre)}
      >
        {displayContent || content.length < 90 ? content : content.slice(0, 90)}
        {displayContent || content.length < 90 ? null : "..."}
      </p>
    
    </li>
  );
}
