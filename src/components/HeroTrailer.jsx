export default function HeroTrailer({
    trailerKey,
    backdrop,
    onPlay,
    onExit,
}) {
    if (trailerKey) {
        return (
        <div className="relative w-full h-[30vh] md:h-[100vh]">
            <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
            allow="autoplay; fullscreen"
            onLoad={onPlay}
            />
        </div>
        );
    }

    return (
        <div
        className="relative w-full h-[30vh] md:h-[75vh] bg-cover bg-center"
        style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
        }}
        onClick={onExit}
        >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
    );
}
