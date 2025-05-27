import { signInAction, signInWithGoogle } from "@/app/actions";
import { signInWithGithub } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { CircularButton } from "@/components/circular-button";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TbBrandGoogleFilled } from "react-icons/tb";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <>
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link className="text-foreground font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link className="text-xs text-foreground underline" href="/forgot-password">
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton formAction={signInAction} pendingText="Signing in...">
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <div className="flex flex-col text-center justify-center min-w-64">
        <p className="text-sm text-foreground mb-4">Other Sign-in Option:</p>
        <form className="flex flex-row justify-center gap-4">
          <CircularButton
            type="submit"
            formAction={signInWithGithub}
            logo={<TbBrandGithubFilled className="relative w-full h-full aspect-square p-1 pt-2 border rounded-full" />}
          />
          <CircularButton
            type="submit"
            formAction={signInWithGoogle}
            logo={<TbBrandGoogleFilled className="relative w-full h-full aspect-square p-1 border rounded-full" />}
          />
        </form>
      </div>
    </>
  );
}
