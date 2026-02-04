import MovieCard from "./MovieCard";

export default function MovieGrid({ data }) {
  if (!data.length) {
    return (
      <p className="text-neutral-400 text-sm">
        Belum ada data
      </p>
    );
  }

  return (
    <div
      className="
        flex overflow-x-scroll
        gap-4 scrollbar-hide
      "
    >
      {data.map(item => (
        <MovieCard key={item.id} item={item} type="movie" />
      ))}
    </div>
  );
}
