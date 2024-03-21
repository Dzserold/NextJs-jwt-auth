"use server";

import register from "@/lib/register";
import { redirect } from "next/navigation";

export default async function signupAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get data off form
  const email = formData.get("email");
  const password = formData.get("password");

  // Send to our api route

  const res = await register(
    email as string,
    password as string
  );

  const json = await res.json();

  // Redirect user to login page on success
  if (res.ok) {
    redirect("/login");
  } else return json.message;
}
