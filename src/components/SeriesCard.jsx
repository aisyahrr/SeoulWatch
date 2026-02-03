export default function SeriesCard({ item }) {
  return (
    <div className="flex flex-col gap-2 text-center">
        <div className="relative w-full h-full rounded-xl overflow-hidden group cursor-pointer">
        {/* Poster */}
        <img
            src={item.poster}
            alt={item.title}
            className="w-full  object-cover 
                    transition-transform duration-300 
                    group-hover:scale-105"
        />
        </div>
        <p className="font-lato text-xs md:text-sm">{item.title} ({item.year})</p>
    </div>
  );
}
