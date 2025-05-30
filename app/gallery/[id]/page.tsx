import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/gallery/wishlist-button";
import BackButton from "@/components/gallery/back-button";
import { MessageForm, MessagesList, getMessages } from "@/components/forum";
import { Suspense } from "react";

async function ForumSection({ apodId }: { apodId: string }) {
  const { data: messages } = await getMessages(apodId);
  
  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Discussion</h2>
      <div className="bg-card rounded-lg border">
        <MessagesList 
          initialMessages={messages || []} 
          apodId={apodId} 
        />
        <MessageForm apodId={apodId} />
      </div>
    </div>
  );
}

export default async function APODDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()
  const { data: entry } = await supabase
    .from("apod_entry")
    .select("*")
    .eq("id", (await params).id)
    .single()

  if (!entry) {
    notFound()
  }



  const apodId = (await params).id;
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="bg-card rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <BackButton />
            <h1 className="text-2xl font-bold">{entry.title}</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative aspect-square w-full">
              {entry.url ? (
                <img 
                  src={entry.url} 
                  alt={entry.title} 
                  className="rounded-md object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-muted rounded-md text-muted-foreground">
                  <p>No Image Available</p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">Date</h2>
                <p>{new Date(entry.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              
              {entry.copyright && (
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">Copyright</h2>
                  <p>{entry.copyright}</p>
                </div>
              )}
              
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">Explanation</h2>
                <p className="whitespace-pre-line">{entry.explanation || 'No explanation available.'}</p>
              </div>
              
              <div className="flex gap-4 items-center pt-4">
                {entry.hdurl && (
                  <Button asChild>
                    <a 
                      href={entry.hdurl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none"
                    >
                      View HD Version
                    </a>
                  </Button>
                )}
                <WishlistButton apodId={entry.id} title={entry.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Suspense fallback={<div>Loading discussion...</div>}>
        <ForumSection apodId={apodId} />
      </Suspense>
    </div>
  )
}