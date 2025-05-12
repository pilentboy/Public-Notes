import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Form } from "react-router";

export default function CustomForm({
  isTyping,
  setIsTyping,
  displayPass,
  setDisplayPass,
  title,
  isSubmiting,
}: {
  isTyping: boolean;
  setIsTyping: any;
  displayPass: boolean;
  setDisplayPass: any;
  title: string;
  isSubmiting: boolean;
}) {
  return (
    <Form
      method="post"
      className="flex flex-col items-center gap-3  mx-auto p-5 rounded-md  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <div
        className={`absolute -top-10 w-[300px] h-[400px] bg-gray-800 rounded-2xl -z-1 border-b border-l border-orange-400 duration-500 ${
          isTyping ? "-left-5" : "-left-10"
        }`}
      ></div>
      <h1 className="mb-5 ">{title}</h1>
      <div className="flex flex-col gap-1 ">
        <label htmlFor="username" className="ms-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="outline-none rounded-2xl p-2 w-72  sm:w-92 bg-gray-900 text-white"
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
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
          className="outline-none rounded-2xl p-2 w-72  sm:w-92 bg-gray-900 text-white"
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          required
        />
        {displayPass ? (
          <FaRegEye
            className="absolute w-5 h-5 rounded-full right-2 top-[55%] hover:scale-105  duration-200 cursor-pointer z-40"
            onClick={() => setDisplayPass((pre: boolean) => !pre)}
          />
        ) : (
          <FaRegEyeSlash
            className="absolute w-5 h-5 rounded-full right-2 top-[55%] hover:scale-105  duration-200 cursor-pointer z-40"
            onClick={() => setDisplayPass((pre: boolean) => !pre)}
          />
        )}
      </div>
      <button
        type="submit"
        className={`w-27 h-10  ms-1 rounded-2xl duration-200  hover:text-orange-400 ${
          isSubmiting ? "bg-gray-500 cursor-not-allowed" : "bg-gray-900 cursor-pointer"
        }`}
        disabled={isSubmiting}
      >
        Submit
      </button>
    </Form>
  );
}
