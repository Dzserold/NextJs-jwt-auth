import { getSession, logout } from "@/lib/actions";

import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  return (
    <main>
      <h1>Protected</h1>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button className="p-3 bg-gray-800" type="submit">
          Sign Out
        </button>
        {session && (
          <div>
            <p>{session.email}</p> <p>{session.id}</p>
          </div>
        )}
      </form>
    </main>
  );
}
