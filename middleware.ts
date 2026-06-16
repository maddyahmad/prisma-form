import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  console.log("==== MIDDLEWARE DEBUG ====");
  console.log("URL:", request.url);
  console.log("AUTH HEADER:", authHeader);
  console.log("ENV KEY:", process.env.APPLICATION_API_KEY);
  console.log("==========================");

  if (!authHeader) {
    return NextResponse.json(
      { success: false, error: "Authorization header missing" },
      { status: 401 },
    );
  }

  const [bearer, token] = authHeader.split(" ");
  console.log("🚀 ~ middleware ~ bearer, token:", bearer, token);

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
