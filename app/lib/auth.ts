import { NextRequest, NextResponse } from "next/server";

export function authenticate(request: NextRequest): NextResponse | null {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { success: false, error: "Authorization header missing" },
      { status: 401 },
    );
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid authorization format. Use: Bearer <token>",
      },
      { status: 401 },
    );
  }

  const validApiKey = process.env.APPLICATION_API_KEY;

  if (!validApiKey || token !== validApiKey) {
    return NextResponse.json(
      { success: false, error: "Invalid API key" },
      { status: 401 },
    );
  }

  return null;
}
