import { Link } from "react-router";
import type { Route } from "./+types/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auth" },
    {
      name: "description",
      content: "authentication page",
    },
  ];
}
export default function Auth() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 h-52 ">
      <Link
        to={"/auth/login"}
        className=" w-36 h-10 flex items-center justify-center  bg-gray-800  rounded-md border border-transparent"
      >
        Login
      </Link>
      <Link
        to={"/auth/register"}
        className=" w-36 h-10 flex items-center justify-center  bg-gray-800  rounded-md border border-transparent"
      >
        Register
      </Link>
    </div>
  );
}
