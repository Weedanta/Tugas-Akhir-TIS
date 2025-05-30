import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormMessage, Message } from "@/components/form-message";
import updateProfile from "./action";

export const metadata = {
    title: "Profile",
    description: "Profile",
};

export default async function Profile(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
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
            <div className="flex flex-col gap-2 items-center">
                { data.profile_url ? (
                    <img className="border-2 border-foreground rounded-full w-40 h-40 aspect-square" src={data.profile_url} />
                ) : (
                    <div className="border-2 border-foreground rounded-full w-40 h-40 aspect-square flex items-center justify-center">
                        {data.username ? (
                            <p className="text-5xl font-bold">
                                {data.username
                                    .split(" ")
                                    .map((name: string) => name[0])
                                    .slice(0, 2)
                                    .join("")}
                            </p>
                        ) : (
                            <p className="text-5xl font-bold">
                                {user.email
                                    ?.split("@")[0]
                                    .split("")
                                    .map((name: string) => name[0])
                                    .slice(0, 1)
                                    .join("")
                                    .toUpperCase()}
                            </p>
                        )}
                    </div>
                )}
                {/* Fetch details from supabase's public.profile */}
                <h2 className="text-2xl font-medium">Your Profile</h2>
                <form className="flex flex-col gap-4 min-w-[30%]" action={updateProfile}>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" placeholder="Email" defaultValue={user.email || ""} disabled />
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" name="username" placeholder="Username" defaultValue={data.username || ""} />
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input type="date" name="birthdate" defaultValue={data.birthdate || ""} />
                    <Button type="submit" className="mt-4 bg-secondary-foreground text-white">Update</Button>
                </form>
                <FormMessage message={searchParams} />
                <div className="my-2"></div>
            </div>
        </div>
    );
}
