import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Gallery() {
    const supabase = await createClient();
    const { data } = await supabase.from("apod_entry").select().limit(16).order("date", { ascending: false });

    return (
        <div className="flex flex-col border rounded-md p-4 gap-3">
            <h1 className="text-2xl font-medium">Gallery</h1>
            <p className="text-sm text-muted-foreground">See All Available Astronomy Picture of The Day from NASA</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border p-6 rounded-lg">
                {data?.map((entry, index) => (
                    <Link 
                        key={entry.id}
                        href={`/gallery/${entry.id}`}
                        className="block w-full group"
                    >
                        <Card className="h-full flex flex-col group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg">
                            <CardHeader className="flex-shrink-0 p-4 pb-2">
                                <CardTitle className="text-sm font-semibold line-clamp-2 min-h-[2.5rem] leading-tight">
                                    {entry.title}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    {new Date(entry.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="flex-1 p-4 pt-0">
                                <div className="aspect-square w-full overflow-hidden rounded-md bg-muted">
                                    {entry.url ? (
                                        <img 
                                            src={entry.url} 
                                            alt={entry.title} 
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                            <p className="text-xs">No Image Available</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            
                            <CardFooter className="flex-shrink-0 p-4 pt-0">
                                <p className="text-xs text-muted-foreground truncate w-full">
                                    {entry.copyright || 'NASA'}
                                </p>    
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}