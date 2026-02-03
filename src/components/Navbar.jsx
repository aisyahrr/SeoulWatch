import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar({ onOpenSidebar }){
    return (
        <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-neutral-800">
            <div className="h-16 px-6 flex items-center justify-between">
                <div className="flex gap-2 items-center font-figtree">
                    <button
                    onClick={onOpenSidebar}
                    className="md:hidden text-white text-xl"
                    >
                    <GiHamburgerMenu/>
                    </button>
                <div className="flex items-end">
                <span className="text-lg md:text-xl font-extrabold text-red-600">
                    Seoul
                    <span className="ml-0.5 text-sm md:text-base font-bold align-baseline text-white">
                    Watch
                    </span>
                </span>
                </div>
                </div>
                <div className="flex justify-end px-2 w-50 md:w-full">
                <form
                    className="
                    flex items-center
                    border border-neutral-700
                    bg-neutral-900
                    rounded-lg
                    h-10
                    w-full max-w-[420px]
                    focus-within:border-red-600
                    transition
                    "
                >
                    <input
                    type="text"
                    placeholder="Cari drakor, film Korea..."
                    className="
                        ml-2 pl-2
                        w-full
                        bg-transparent
                        text-white
                        placeholder:text-neutral-400
                        text-sm
                        focus:outline-none
                    "
                    />
                    <button
                    type="submit"
                    className="px-3 text-neutral-300 hover:text-white transition"
                    >
                    <FiSearch className="text-base" />
                    </button>
                </form>
                </div>
            </div>
        </header>
    );
}
