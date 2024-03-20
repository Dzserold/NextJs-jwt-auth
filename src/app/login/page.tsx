"use client";

import { useFormState } from "react-dom";
import loginAction from "./loginAction";

export default function Signup() {
  const [error, formAction] = useFormState(
    loginAction,
    undefined
  );
  return (
    <main>
      <h1>Login</h1>
      <form
        action={formAction}
        className="flex flex-col max-w-sm gap-2 text-black"
      >
        <input type="text" placeholder="email" name="email" />
        <input
          type="text"
          placeholder="password"
          name="password"
        />
        <button className="text-white bg-blue-950" type="submit">
          Signup
        </button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
