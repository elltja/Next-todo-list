import { createClient } from "@/lib/supabase";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error(userError);
    return;
  }
  const todos = await supabase.from("todos").select("*").eq("user_id", user.id);
  return Response.json(todos);
}
