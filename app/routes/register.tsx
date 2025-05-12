import {
  redirect,
  StaticRouterProvider,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/register";
import { register } from "~/api";

import CustomForm from "~/components/form/CustomForm";
import { toast } from "react-toastify";

export function meta({}: Route.ActionArgs) {
  return [
    { title: "Register" },
    {
      name: "description",
      content: "Register page",
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const { error } = await register({
      username: formData.get("username"),
      password: formData.get("password"),
    });
    if (error) {
      console.log(error);
      return { error: error[0].msg || error };
    }
    return redirect("/auth/login");
  } catch (error) {
    return { error: "an unknown error occurred" };
  }
}

export default function Register({ actionData }: Route.ComponentProps) {
  const [displayPass, setDisplayPass] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { state } = useNavigation();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData?.error, {
        position: "top-center",
      });
    }
  }, [actionData]);

  return (
    <CustomForm
      isTyping={isTyping}
      setIsTyping={setIsTyping}
      setDisplayPass={setDisplayPass}
      displayPass={displayPass}
      title="Register"
      isSubmiting={state === "submitting"}
    />
  );
}
