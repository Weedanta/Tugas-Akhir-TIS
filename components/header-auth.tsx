import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IoIosMenu } from "react-icons/io";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profile")
      .select()
      .eq("id", user.id)
      .single();
      
    if (data) {
      profile = data;
    }
  }

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4">
      <Link className="hover:underline" href="/profile">Hey, {profile?.username || user.email}!</Link>
      <DropdownMenu>
      <DropdownMenuTrigger className="p-2 border rounded-md hover:bg-accent">
          <IoIosMenu className="aspect-square h-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>        
        <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
        { profile?.status == "admin" && (
          <DropdownMenuItem asChild><Link href="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><form onClick={signOutAction} className="text-red-600">Sign out</form></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
