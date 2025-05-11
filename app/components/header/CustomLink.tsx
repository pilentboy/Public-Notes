import { NavLink } from "react-router";

export default function CustomLink({
  title,
  path,
}: {
  title: string;
  path: any;
}) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? "text-orange-400" : "text-white"
        }
      >
        {title}
      </NavLink>
    </li>
  );
}
