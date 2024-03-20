import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose";

export async function POST(req: Request) {
  // Extract data sent in
  const body = await req.json();
  const { email, password } = body;

  // Validate data
  if (!validateEmail(email) || !validatePassword(password))
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
    password,
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
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  );
  const alg = "HS256";

  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({
      alg,
    })
    .setExpirationTime("72h")
    .setSubject(user.id.toString())
    .sign(secret);

  // Respond jwt token
  return Response.json({ token: jwt });
}
