export default function CastRow({ actors = [] }) {
    if (!actors.length) return null;

    return (
        <section className="py-8">
        <h2 className="text-lg font-semibold text-white mb-4">Cast</h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {actors.slice(0, 15).map(actor => (
            <div
                key={actor.id}
                className="min-w-[100px] md:min-w-[130px] text-center"
            >
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-neutral-800">
                <img
                    src={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/avatar.png"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                </div>

                <p className="mt-2 text-xs md:text-sm text-white font-medium line-clamp-1">
                {actor.name}
                </p>
                <p className="text-xs text-neutral-400 line-clamp-1">
                {actor.character}
                </p>
            </div>
            ))}
        </div>
        </section>
    );
}
