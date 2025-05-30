// components/forum/message-item.tsx
"use client";

import { Message } from "@/components/forum/types/forum";
import { formatDistanceToNow } from "date-fns";

interface MessageItemProps {
  message: Message;
}

function getInitials(username: string): string {
  // Get first letter of first word and first letter of last word
  const words = username.trim().split(/\s+/);
  if (words.length === 0) return 'U';
  if (words.length === 1) return username[0].toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function MessageItem({ message }: MessageItemProps) {
  const initials = getInitials(message.username);

  if (message.profile_url) {
    return (
      <div className="flex gap-3 p-4 hover:bg-muted/50">
        <img 
          className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium text-foreground bg-background border-2"
          src={message.profile_url}
          alt={message.username}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{message.username}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm mt-1 break-words">{message.content}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex gap-3 p-4 hover:bg-muted/50">
        <div 
          className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium text-foreground bg-background border-2"
        >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{message.username}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm mt-1 break-words">{message.content}</p>
          </div>
        </div>
      );
  };
}