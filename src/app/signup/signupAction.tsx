"use server";
import { redirect } from "next/navigation";

export default async function signupAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get data off form
  const email = formData.get("email");
  const password = formData.get("password");

  // Send to our api route

  const res = await fetch(process.env.ROOT_URL + "/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();
  console.log(json);

  // Redirect user to login page on success
  if (res.ok) {
    redirect("/login");
  } else return json.message;
}
