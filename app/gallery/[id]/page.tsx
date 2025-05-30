import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function APODDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const { data: entry } = await supabase
    .from("apod_entry")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!entry) {
    notFound()
  }

  return (
    <div className="flex flex-col border rounded-md p-4 gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/gallery">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-medium">{entry.title}</h1>
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
          
          {entry.hdurl && (
            <Button asChild>
              <a 
                href={entry.hdurl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4"
              >
                View HD Version
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}