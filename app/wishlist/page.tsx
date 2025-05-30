import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { WishlistItem } from "@/components/wishlist/wishlist-item";

export default async function WishlistPage() {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  // Redirect to login if not authenticated
  if (!user) {
    return redirect("/login");
  }

  // Get wishlist items with APOD details
  const { data } = await supabase
    .from("apod_to_profile")
    .select("*")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
        <p className="text-muted-foreground">
          {data?.length || 0} items in your wishlist
        </p>
      </div>

      {data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <WishlistItem
              key={index}
              id={item.apod_id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">Your wishlist is empty</h3>
            <p className="text-sm text-muted-foreground">
              Add items to your wishlist from the gallery
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
