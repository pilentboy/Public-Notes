import CustomLink from "./CustomLink";

export default function Nav() {
  return (
    <nav className="py-3 rounded-2xl  w-86 mx-auto bg-gray-800 shadow z-50  ">
      <ul className="mx-auto flex items-center justify-evenly ">
        <CustomLink title="Notes" path={"/"} />
        <CustomLink title="Write" path={"managing/write"} />
        <CustomLink title="Auth" path={"auth"} />
      </ul>
    </nav>
  );
}
