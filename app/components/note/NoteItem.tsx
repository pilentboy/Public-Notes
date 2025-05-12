import { useState } from "react";
import { Link } from "react-router";
import { LuNotebookPen } from "react-icons/lu";

export default function NoteItem({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  const [displayContent, setDisplayContent] = useState<boolean>(false);
  const [displayEditIcon, setDisplayEditiIcon] = useState<
    "translate-x-0" | "translate-x-[-750%]"
  >("translate-x-[-750%]");
  return (
    <li
      key={id}
      className={`w-full md:w-[800px] flex flex-col items-start  md:items-center justify-between   p-3  bg-gray-800  md:flex-row rounded-md overflow-hidden ${
        displayContent ? "min-h-26 md:min-h-16  " : " h-26 md:h-16"
      } `}
    >
      <Link
        to={`managing/edit/${id}`}
        className="min-w-12 relative  border-b border-orange-400 pb-1 md:border-0"
        onMouseOver={() => setDisplayEditiIcon("translate-x-0")}
        onMouseOut={() => setDisplayEditiIcon("translate-x-[-750%]")}
      >
        {title}
        <LuNotebookPen
          className={`text-2xl  hover:text-orange-400 duration-300 cursor-pointer absolute top-0 -right-10 ${displayEditIcon}`}
        />
      </Link>
      <p
        className="text-sm md:w-2/4 cursor-pointer"
        onClick={() => setDisplayContent((pre) => !pre)}
      >
        {displayContent || content.length < 90 ? content : content.slice(0, 90)}
        {displayContent || content.length < 90 ? null : "..."}
      </p>
    </li>
  );
}
