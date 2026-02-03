export default function SectionTitle({
  title,
  accentWidth = "w-20",
  accentColor
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg md:text-xl font-bold uppercase font-fighter text-white">
        {title}
      </h2>

      {/* underline */}
      <div className="h-0.5 w-full bg-neutral-700 rounded">
        <div className={`h-0.5 ${accentWidth} ${accentColor} rounded`} />
      </div>
    </div>
  )
}
