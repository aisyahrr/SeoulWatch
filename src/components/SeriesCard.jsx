export default function SeriesCard({ item }) {
  return (
    <div className="flex flex-col text-center">
        <div className="relative w-full rounded-xl overflow-hidden group cursor-pointer">
        {/* Poster */}
        <img
            src={item.poster}
            alt={item.title}
            className="w-full h-[180px] md:h-[220px]  object-cover 
                    transition-transform duration-300 
                    group-hover:scale-105"
        />
        </div>
        <p className="font-lato text-sm">{item.title} ({item.year})</p>
    </div>
  );
}
