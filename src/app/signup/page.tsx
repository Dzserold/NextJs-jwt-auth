"use client";
import { useFormState } from "react-dom";
import signupAction from "./signupAction";

export default function Signup() {
  const [error, formAction] = useFormState(
    signupAction,
    undefined
  );

  return (
    <main>
      <h1>Signup</h1>
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
        <button className="bg-slate-600" type="submit">
          Signup
        </button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
