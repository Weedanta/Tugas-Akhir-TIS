"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface WishlistButtonProps {
  apodId: string;
  title: string;
}

export function WishlistButton({ apodId, title }: WishlistButtonProps) {
  const handleWishlist = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please sign in to add to wishlist");
      return;
    }

    const { error } = await supabase
      .from("apod_to_profile")
      .upsert(
        {
          profile_id: user.id,
          apod_id: apodId,
        },
        { onConflict: "profile_id,apod_id" }
      );

    if (error) {
      toast.error("Failed to add to wishlist");
      return;
    }

    toast.success("Added to wishlist", {
      description: title,
    });
  };

  return (
    <Button onClick={handleWishlist}>
      Add to Wishlist
    </Button>
  );
}
