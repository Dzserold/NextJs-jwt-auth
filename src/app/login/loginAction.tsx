"use server";
import login from "@/lib/login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get data off form
  const email = formData.get("email");
  const password = formData.get("password");

  // Send to our api route

  const res = await login(email as string, password as string);

  const json = await res.json();

  // Redirect user to login page on success
  if (res.status === 200) {
    redirect("/protected");
  } else return json.message;
}
