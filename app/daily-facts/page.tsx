import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Camera, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Daily Space Facts | NASA APOD",
  description: "Discover today's Astronomy Picture of the Day from NASA",
};

export default async function DailyFacts() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];
  
  // Fetch today's APOD entry
  const { data: entry } = await supabase
    .from("apod_entry")
    .select("*")
    .eq("date", today)
    .single();

  if (!entry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">No APOD for Today</h1>
          <p className="text-muted-foreground mb-6">
            There&apos;s no Astronomy Picture of the Day available for today. Please check back later or explore our gallery.
          </p>
          <Button asChild>
            <Link href="/gallery">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View Gallery
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Today&apos;s Space Discovery</h1>
        <p className="text-muted-foreground">
          Your daily dose of space exploration and astronomical wonders
        </p>
      </div>

      <Card className="overflow-hidden group">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{entry.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                {new Date(entry.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </CardDescription>
            </div>
            {entry.copyright && (
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Camera className="h-4 w-4" />
                <span>{entry.copyright}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            {entry.media_type === 'image' ? (
              <img
                src={entry.url}
                alt={entry.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <iframe
                src={entry.url}
                title={entry.title}
                className="w-full aspect-video"
                allowFullScreen
              />
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-4 p-6">
          <div className="prose max-w-none dark:prose-invert">
            <p className="whitespace-pre-line">{entry.explanation}</p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full mt-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/gallery">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Gallery
              </Link>
            </Button>
            {entry.hdurl && (
              <Button asChild variant="outline" size="sm">
                <a href={entry.hdurl} target="_blank" rel="noopener noreferrer">
                  <Camera className="mr-2 h-4 w-4" />
                  View HD Version
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-8 p-4 bg-muted/50 rounded-lg flex items-start gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium mb-1">About NASA&apos;s Astronomy Picture of the Day</h3>
          <p className="text-sm text-muted-foreground">
            Each day a different image or photograph of our fascinating universe is featured, 
            along with a brief explanation written by a professional astronomer.
          </p>
        </div>
      </div>
    </div>
  );
}
