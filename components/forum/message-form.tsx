// components/forum/message-form.tsx
"use client";

import { useActionState } from "react";
import { sendMessage } from "@/components/forum/actions/forum";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

interface MessageFormProps {
  apodId: string;
}

interface FormState {
  success?: boolean;
  error?: string | null;
  apodId?: string;
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button 
      type="submit" 
      disabled={isPending}
      size="icon"
      className="h-10 w-10 rounded-full"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Send className="h-4 w-4" />
      )}
      <span className="sr-only">Send message</span>
    </Button>
  );
}

export function MessageForm({ apodId }: MessageFormProps) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    sendMessage,
    { apodId }, // Initial state
    apodId // Optional key for resetting the form
  );
  
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
      router.refresh();
    }
    
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
  };

  return (
    <div className="p-2">
      <form
        ref={formRef}
        action={formAction}
        className="flex items-end gap-4"
      >
        <input type="hidden" name="apodId" value={apodId} />
        <div className="relative flex-1">
          <Textarea
            ref={inputRef}
            name="content"
            placeholder="Write a comment..."
            className="min-h-[40px] max-h-32 resize-none pr-12"
            rows={1}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            required
          />
        </div>
        <SubmitButton isPending={isPending} />
      </form>
    </div>
  );
}