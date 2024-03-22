import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { cookies } from "next/headers";

export default async function login(
  email: string,
  pass: string
) {
  // Validate data
  if (!validateEmail(email) || !validatePassword(pass))
    return Response.json(
      {
        message: "Invalid email or password",
      },
      { status: 400 }
    );

  // Lookup the user
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user)
    return Response.json(
      {
        message: "Invalid email or password",
      },
      { status: 400 }
    );

  // Compate password
  const isCorrectPassword = bcrypt.compareSync(
    pass,
    user.password
  );

  if (!isCorrectPassword)
    return Response.json(
      {
        message: "Invalid email or password",
      },
      { status: 400 }
    );

  // Create jwt token
  const { password, ...withoutPass } = user;
  console.log(withoutPass);

  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  );

  const alg = "HS256";

  const jwt = await new jose.SignJWT(withoutPass)
    .setProtectedHeader({
      alg,
    })
    .setExpirationTime("72h")
    .sign(secret);

  // Set cookie
  cookies().set("Authorization", jwt, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 3, // 3 days
    path: "/",
    sameSite: "strict",
  });

  return Response.json(
    {
      message: "Success",
    },
    { status: 200 }
  );
}
