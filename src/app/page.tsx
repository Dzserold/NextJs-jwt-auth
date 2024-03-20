import { cookies } from "next/headers";
import Link from "next/link";

export default function Home() {
  const isLoggedIn = cookies().get("Authorization");
  return (
    <main>
      Hello Nextjs
      <div className="flex flex-col w-24 gap-3 m-4">
        {isLoggedIn ? (
          <Link
            className="p-2 bg-indigo-950"
            href={"/protected"}
          >
            Protected
          </Link>
        ) : (
          <>
            <Link className="p-2 bg-blue-950" href={"/login"}>
              Login
            </Link>
            <Link className="p-2 bg-slate-600" href={"/signup"}>
              Signup
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
