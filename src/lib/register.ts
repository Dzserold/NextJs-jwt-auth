import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function register(
  email: string,
  password: string
) {
  // Validate data
  if (!validateEmail(email) || !validatePassword(password))
    return Response.json(
      {
        message: "Invalid email or password",
      },
      { status: 400 }
    );

  // Check if user already registered
  const isExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isExist)
    return Response.json(
      {
        message: "Email already registered",
      },
      { status: 400 }
    );
  console.log(isExist);

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
