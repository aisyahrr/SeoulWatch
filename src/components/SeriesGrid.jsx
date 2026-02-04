import SeriesCard from "./SeriesCard";

export default function SeriesGrid({ data }) {
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
        grid grid-cols-3
        sm:grid-cols-4
        lg:grid-cols-6
        gap-4
      "
    >
      {data.map(item => (
        <SeriesCard key={item.id} item={item} type="tv" />
      ))}
    </div>
  );
}
