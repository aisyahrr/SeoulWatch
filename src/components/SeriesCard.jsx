import { Link } from "react-router-dom";

export default function SeriesCard({ item, type }) {
  return (
    <Link to={`/detail/${type}/${item.id}`}>
      <div className="flex-shrink-0 gap-3 w-[90px] md:w-[150px] text-center space-y-2">
        <div className="relative rounded-xl overflow-hidden group cursor-pointer aspect-[2/3]">
          <img
            src={item.poster}
            alt={item.title}
            className="w-full h-full object-cover 
                        transition-transform duration-300 
                        group-hover:scale-105"
          />
        </div>

        <p className="font-lato text-xs md:text-sm">
          {item.title} ({item.year})
        </p>
      </div>
    </Link>
  );
}
