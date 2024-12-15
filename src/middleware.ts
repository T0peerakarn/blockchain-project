import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabaseServerClient";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error || data?.user?.role !== "authenticated") {
      return NextResponse.redirect(new URL("/auth/", request.url));
    }

    // All ok
    return NextResponse.next();
  } catch (error) {
    console.error("Error during authentication", error);
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/api/:path*", "/patient/:path*", "/doctor/:path*"], // Check auth on these routes only
};
