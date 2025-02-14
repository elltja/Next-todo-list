import { createClient } from "@/lib/supabase";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw new Error("Error: " + error);
  }

  return new Response(JSON.stringify(user));
}
