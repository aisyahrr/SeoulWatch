import { IoIosPlay } from "react-icons/io";
export default function TitleHome({
    title,
    accentWidth = "w-18",
    accentColor,
    onViewAll,
    isExpanded,
}) {
  return (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <h5 className="text-xl font-bold font-fighter text-white">
                {title}
            </h5>
            <button 
            onClick={onViewAll}
            className="text-sm text-white flex items-center gap-2 font-lato">
                <IoIosPlay size={20} className="text-red-600"/> 
                {isExpanded ? "Show Less" : "View All"}
            </button>
        </div>

        {/* underline */}
        <div className="h-0.5 w-full bg-neutral-700 rounded">
            <div className={`h-0.5 ${accentWidth} ${accentColor} rounded`} />
        </div>
    </div>
  )
}
