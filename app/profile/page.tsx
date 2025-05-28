import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Profile",
    description: "Profile",
};

export default async function Profile() {
    const supabase = await createClient();

    // Double-check (on top of middleware lmao)
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const {
        data
    } = await supabase.from("profile").select().eq("id", user.id).single();

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            {/* <div className="w-full">
                <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                <InfoIcon size="16" strokeWidth={2} />
                This is a protected page that you can only see as an authenticated
                user
                </div>
            </div> */}
            <div className="flex flex-col gap-2 items-center">
                <img className="border-2 border-foreground rounded-full w-40 h-40 aspect-square" src={data.profile_url} />
                <h2 className="font-bold text-2xl mb-4">Your user details</h2>
                {/* <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
                {JSON.stringify(user, null, 2)}
                </pre> */}
                {/* Fetch details from supabase's public.profile */}
                <p>{data.id}</p>
                <p>{data.username}</p>
                <p>{data.birthdate}</p>
            </div>
        </div>
    );
}
