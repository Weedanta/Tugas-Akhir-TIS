"use server"

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import type { UserIdentity } from "@supabase/supabase-js";

export default async function checkIdentity() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return encodedRedirect("error", "/sign-in", "User not found during callback");
    }

    // Get user identities
    const identities: UserIdentity[] = user.identities || [];

    // Check if user has valid identity from provider
    const hasValidIdentity = identities.some(identity => 
        identity.provider === "github" || identity.provider === "google"
    );
    
    if (!hasValidIdentity) {
        return encodedRedirect("error", "/sign-in", "No valid identity provider found (GitHub or Google)");
    }

    // Add data from "user_metadata" to supabase table "profile"
    // For id, username, and profile_url with upsert
    const { error } = await supabase.from("profile").upsert({
        id: user.id,
        username: user.user_metadata?.name?.toString() || user.user_metadata?.user_name?.toString() || "",
        profile_url: user.user_metadata?.avatar_url?.toString() || "",
    }, { onConflict: "id" });

    if (error) {
        return encodedRedirect("error", "/sign-in", error.message);
    }

    return;
}