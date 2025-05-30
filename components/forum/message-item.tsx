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

// Generate a consistent color based on the username
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Generate a pastel color
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 75%)`;
}

export function MessageItem({ message }: MessageItemProps) {
  const initials = getInitials(message.username);
  const bgColor = stringToColor(message.username);

  return (
    <div className="flex gap-3 p-4 hover:bg-muted/50">
      <div 
        className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium text-gray-800"
        style={{ backgroundColor: bgColor }}
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
}