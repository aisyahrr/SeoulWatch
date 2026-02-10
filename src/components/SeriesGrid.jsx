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
        grid grid-cols-4
        md:grid-cols-5
        lg:grid-cols-6
        2xl:grid-cols-9
        md:gap-4 gap-3
      "
    >
      {data.map(item => (
        <SeriesCard key={item.id} item={item} type="tv" />
      ))}
    </div>
  );
}
