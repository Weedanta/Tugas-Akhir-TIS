"use server"

import { getAuthContext } from "../actions";
import { encodedRedirect } from "@/utils/utils";

export default async function updateProfile(formData: FormData) {
    const username = formData.get("username")?.toString();
    const birthdate = formData.get("birthdate")?.toString();
    const { supabase } = await getAuthContext();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return encodedRedirect("error", "/profile", "User not found");
    }

    const { data, error } = await supabase.from("profile").update({
        username,
        birthdate,
    }).eq("id", user.id);

    if (error) {
        return encodedRedirect("error", "/profile", error.message);
    }

    return encodedRedirect("success", "/profile", "Profile updated successfully");
}