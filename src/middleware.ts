import { NextResponse } from "next/server";
import { createClient } from "./lib/supabase";

export async function middleware(request: Request) {
  const supabase = await createClient();
  const requestUrl = new URL(request.url);
  const {
    error,
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || error) {
    return NextResponse.redirect(`${requestUrl.origin}/auth`);
  }
  const response = NextResponse.next();
  response.headers.set("Authenticated-User", JSON.stringify(user));
  return response;
}

export const config = {
  matcher: ["/"],
};
