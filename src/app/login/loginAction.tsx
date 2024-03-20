"use server";
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

  const res = await fetch(process.env.ROOT_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();
  console.log(json);

  // Set cookie
  cookies().set("Authorization", json.token, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 3, // 3 days
    path: "/",
    sameSite: "strict",
  });

  // Redirect user to login page on success
  if (res.ok) {
    redirect("/protected");
  } else return json.message;
}
