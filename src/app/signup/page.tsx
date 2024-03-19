import { redirect } from "next/navigation";

export default function Signup() {
  async function signup(formData: FormData) {
    "use server";
    // Get data off form
    const email = formData.get("email");
    const password = formData.get("password");

    // Send to our api route

    const res = await fetch(
      process.env.ROOT_URL + "/api/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await res.json();
    console.log(json);

    // Redirect user to login page on success
    if (res.ok) {
      redirect("/login");
    } else return json.error;
  }

  return (
    <main>
      <h1>Signup</h1>
      <form
        className="flex flex-col max-w-sm gap-2 text-black"
        action={signup}
      >
        <input type="text" placeholder="email" name="email" />
        <input
          type="text"
          placeholder="password"
          name="password"
        />
        <button className="bg-slate-600" type="submit">
          Signup
        </button>
      </form>
    </main>
  );
}
