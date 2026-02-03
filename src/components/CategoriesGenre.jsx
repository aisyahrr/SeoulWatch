import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
export default function CategoriesGenre({ genres, active, onSelect }) {
    return (
        <ul className="space-y-3 font-lato">
            <li
            onClick={() => onSelect(null)}
            className={`cursor-pointer flex justify-between items-center${
                active === null ? "text-white" : "text-neutral-400"
            }`}
            >
            All  {active === null ? (
                <FaAngleRight className="text-white transition" />
                ) : (
                <FaAngleLeft className="text-neutral-500 transition" />
                )}
            </li>

            {genres.map(g => (
            <li
                key={g.id}
                onClick={() => onSelect(Number(g.id))}
                className={`cursor-pointer flex justify-between items-center ${
                active === g.id
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
            >
                {g.name} {active === g.id ? (
                <FaAngleRight className="text-white transition" />
                ) : (
                <FaAngleLeft className="text-neutral-500 transition" />
                )}
            </li>
            ))}
        </ul>
    );
}
