import MostCard from "./MostCard";

export default function MostGrid({ data }) {
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
        <MostCard key={item.id} item={item} type={item.media_type || "tv"} />
      ))}
    </div>
  );
}
