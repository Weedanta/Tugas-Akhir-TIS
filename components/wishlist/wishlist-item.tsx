"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface WishlistItemProps {
  id: string;
}

interface APOD {
  id: string;
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl: string;
  media_type: string;
  copyright: string;
  service_version: string;
}

export function WishlistItem({ id }: WishlistItemProps) {
  const router = useRouter();
  const supabase = createClient();

  const [apod, setApod] = useState<APOD | null>(null);

  useEffect(() => {
    const fetchApod = async () => {
      const { data, error } = await supabase
        .from("apod_entry")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setApod(data);
    };

    fetchApod();
  }, [id]);

  const handleDelete = async () => {
    const { error } = await supabase
      .from("apod_to_profile")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to remove from wishlist");
      return;
    }

    toast.success("Removed from wishlist");
    router.refresh();
  };

  return (
    <Link href={`/gallery/${apod?.id}`} className="hover:scale-105 transition-transform">
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
        <div className="relative aspect-video bg-muted">
          {apod?.media_type === "image" ? (
            <img
              src={apod?.url}
              alt={apod?.title}
              className="object-cover"
              width={500}
              height={500}
            />
          ) : (
            <iframe
              src={apod?.url}
              title={apod?.title}
              className="w-full h-full"
              allowFullScreen
            />
          )}
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg line-clamp-2 h-14">
            {apod?.title}
          </CardTitle>
        </CardHeader>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <time className="text-sm text-muted-foreground">
            {apod && new Date(apod.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove from wishlist</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
