// components/forum/actions/forum.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface FormState {
  success?: boolean;
  error?: string | null;
}

export async function sendMessage(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const content = formData.get("content") as string;
  const apodId = formData.get("apodId") as string;
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await supabase
    .from("profile")
    .select("username, profile_url")
    .eq("id", user.id)
    .single();

  if (!profile) return { error: "Profile not found" };

  const { error } = await supabase
    .from("apod_messages")
    .insert({
      apod_id: apodId,
      profile_id: user.id,
      username: profile.username,
      profile_url: profile.profile_url,
      content,
    });

  if (error) return { error: error.message };

  revalidatePath(`/gallery/${apodId}`);
  return { success: true };
}

export async function getMessages(apodId: string) {
  const supabase = await createClient();
  return await supabase
    .from("apod_messages")
    .select("*")
    .eq("apod_id", apodId)
    .order("created_at", { ascending: true });
}