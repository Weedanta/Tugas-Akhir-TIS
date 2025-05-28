import { CircularButton } from "@/components/circular-button";
import { TbBrandGithubFilled } from "react-icons/tb";
import { TbBrandGoogleFilled } from "react-icons/tb";
import { signInWithGithub, signInWithGoogle } from "@/app/actions";

export default function ProviderSignInButtons() {
    return (
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
    )
}