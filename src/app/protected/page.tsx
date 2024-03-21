import { LogOut } from "@/lib/actions";
import { redirect } from "next/navigation";

export default function page() {
  return (
    <main>
      <h1>Protected</h1>
      <form
        action={async () => {
          "use server";
          await LogOut();
          redirect("/");
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </main>
  );
}
