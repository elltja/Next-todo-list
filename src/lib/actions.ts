"use server";

import { createClient } from "@/lib/supabase";
import { TodoType } from "@/types/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const addAction = async (newTodo: TodoType) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user || userError) {
    console.error(userError);
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("todos")
    .insert([{ ...newTodo, user_id: user.id }]);
  if (error) {
    console.error(error);
    throw new Error("Error adding todo");
  }
};

export const deleteAction = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error);
  }
};

export const toggleAction = async (id: string, value: boolean) => {
  const supabase = await createClient();

  const { error, data } = await supabase
    .from("todos")
    .update({ isComplete: value })
    .eq("id", id);
  if (error) {
    console.error("Error toggling todo:", error);
    return null;
  }
  return data;
};

export const authenticateAction = async () => {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
  }

  if (data.url) {
    return redirect(data.url);
  }
};

export const signOutUser = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) console.error(error);
  return redirect("/auth");
};
