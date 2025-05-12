import {
  useNavigate,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "./+types/login";
import { login } from "~/api";

import { useAuth } from "~/context/AuthContext";
import CustomForm from "~/components/form/CustomForm";
import { toast } from "react-toastify";

export function meta({}: Route.ActionArgs) {
  return [
    { title: "Login" },
    {
      name: "description",
      content: "Login page",
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const { data, error } = await login({
      username: formData.get("username"),
      password: formData.get("password"),
    });
    if (error) {
      return { error: error[0].msg || error };
    }

    return { token: data.token };
  } catch (error) {
    console.log(error);
    return { error: "an unknown error occurred" };
  }
}
export default function Login({ actionData }: Route.ComponentProps) {
  const [displayPass, setDisplayPass] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { state } = useNavigation();

  const navigate = useNavigate();
  const { setLogin } = useAuth();
  useEffect(() => {
    if (actionData?.token) {
      setLogin(actionData.token);
      navigate("/");
    } else if (actionData?.error) {
      toast.error(actionData?.error, {
        position: "top-center",
      });
    }
  }, [actionData]);

  return (
    <>
      <CustomForm
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        setDisplayPass={setDisplayPass}
        displayPass={displayPass}
        title="Login"
        isSubmiting={state === "submitting"}
      />
    </>
  );
}
