export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
      {/* add autoplay */}
      <iframe className="h-full w-full aspect-video" src="https://www.youtube.com/embed/xvFZjo5PgG0?autoplay=1" title="Apapun" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
    </div>
  )}