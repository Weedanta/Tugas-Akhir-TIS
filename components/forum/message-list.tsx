// components/forum/message-list.tsx
"use client";

import { useEffect, useState } from "react";
import { Message } from "./types/forum";
import { MessageItem } from "./message-item";
import { createClient } from "@/utils/supabase/client";

interface MessagesListProps {
  initialMessages: Message[];
  apodId: string;
}

export function MessagesList({ initialMessages, apodId }: MessagesListProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  // const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`apod_${apodId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "apod_messages",
          filter: `apod_id=eq.${apodId}`,
        },
        (payload: { new: Message }) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [apodId]);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}