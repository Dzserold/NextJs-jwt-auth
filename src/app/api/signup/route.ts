export async function POST(req: Request) {
  // Read data off req body
  const body = await req.json();
  const { email, password } = body;
  // Validate data

  // Hash the password

  // Create user in db

  // Return success
  return Response.json({});
}
