export default function SeriesCard({ item }) {
  return (
    <div className="flex-shrink-0 w-[160px]">
      <div className="relative rounded-xl overflow-hidden group cursor-pointer aspect-[2/3]">
        <img
          src={item.poster}
          alt={item.title}
          className="w-full h-full object-cover
                     transition-transform duration-300
                     group-hover:scale-105"
        />

        {/* Content */}
        <div className="absolute w-full h-24  bg-gradient-to-t
                        from-black/90 via-black/90 to-transparent bottom-0 py-5 text-center">
          <h3 className="text-white font-semibold text-sm font-lato leading-tight line-clamp-2">
            {item.title}
          </h3>

          <div className="mt-1 text-yellow-400 text-xs font-medium">
            ⭐ {item.rating?.toFixed(1)}/10
          </div>
        </div>
      </div>
    </div>
  );
}
