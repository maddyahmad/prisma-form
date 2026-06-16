import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { success: false, error: "Authorization header missing" },
      { status: 401 },
    );
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || token !== process.env.APPLICATION_API_KEY) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/application/:path*"],
};
