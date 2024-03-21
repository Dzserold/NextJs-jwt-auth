import { cookies } from "next/headers";

export async function LogOut() {
  cookies().delete("Authorization");
}
