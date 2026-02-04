import { Link } from "react-router-dom"

export default function TopSeriesList({ data, type }) {
    return (
        <div className="space-y-4">
        {data.map((item, index) => (
            <Link
            key={item.id} 
            className="flex items-start gap-4"
            to={`/detail/${type}/${item.id}`}>        
                    {/* Rank */}
                    <div className="text-2xl font-bold font-figtree text-white w-6">
                        {index + 1}°
                    </div>

                    {/* Poster */}
                    <img
                        src={item.poster}
                        alt={item.title}
                        className="w-16 h-24 rounded-md object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-white leading-tight font-figtree">
                        {item.title}
                        </h3>

                        <p className="text-xs text-neutral-400 font-lato">
                        {item.meta}
                        </p>

                        <div className="mt-1 text-sm text-yellow-400">
                        ⭐ {item.rating}/10
                        </div>
                    </div>
            </Link>
        ))}
        </div>
    )
}
