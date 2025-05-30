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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border py-10">
                {data?.map((entry, index) => (
                    <Link 
                        key={entry.id}
                        href={`/gallery/${entry.id}`}
                        className="block w-full"
                    >
                        <Card key={index} className="flex flex-col w-full hover:scale-105 transition-transform cursor-pointer">
                            <CardHeader>
                                <CardTitle>{entry.title}</CardTitle>
                                <CardDescription>{entry.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                { entry.url ? (
                                    <img src={entry.url} alt={entry.title} className="aspect-square object-cover w-full rounded-md" />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-muted-foreground rounded-md">
                                        <p>No Image Available</p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <p className="text-xs text-muted-foreground">{entry.copyright}</p>    
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}