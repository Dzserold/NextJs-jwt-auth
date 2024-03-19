import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  // Read data off req body
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
  // Hash the password
  const hashedPass = await bcrypt.hashSync(password, 13);

  // Create user in db
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPass,
    },
  });

  // Return success
  return Response.json(
    {
      message: "Successfully created user",
    },
    { status: 200 }
  );
}
