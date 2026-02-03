import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { fetchGenres, fetchFromList } from "@/services/tmdb";

const LIST_ID = "8631455";

export default function Layoutpage() {
    const [items, setItems] = useState([]);
    const [genres, setGenres] = useState([]);
    const [activeGenre, setActiveGenre] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    // categories
    useEffect(() => {
        async function load() {
        const listItems = await fetchFromList(LIST_ID);
        setItems(listItems);

        const allGenres = await fetchGenres();
        const usedGenreIds = new Set(
            listItems.flatMap(i => i.genre_ids || [])
        );

        setGenres(allGenres.filter(g => usedGenreIds.has(g.id)));
        }
        load();
    }, []);
    // scrolling
    useEffect(() => {
    if (showSidebar) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }

    return () => {
        document.body.style.overflow = "";
    };
    }, [showSidebar]);


    return (
        <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
        {/* NAVBAR */}
        <Navbar onOpenSidebar={() => setShowSidebar(true)} />

        <div className="flex flex-1 overflow-hidden py-5">
            {/* SIDEBAR DESKTOP */}
            <aside className="hidden md:block px-6">
            <Sidebar
                items={items}
                genres={genres}
                activeGenre={activeGenre}
                onSelectGenre={setActiveGenre}
            />
            </aside>

            {/* MAIN */}
            <main className="flex-1 overflow-y-auto  px-4 md:px-12">
            <Outlet context={{ activeGenre, items }} />
            </main>
        </div>

        {/* SIDEBAR MOBILE */}
        {showSidebar && (
            <div className="fixed inset-0 z-50 md:hidden">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowSidebar(false)}
            />

            {/* Drawer */}
            <div className="
                absolute left-0 top-0 h-full w-72
                bg-neutral-900 p-5
                shadow-xl
                overflow-y-auto
                overscroll-contain
                animate-slideIn
            ">
                <Sidebar
                items={items}
                genres={genres}
                activeGenre={activeGenre}
                onSelectGenre={g => {
                    setActiveGenre(g);
                    setShowSidebar(false); 
                }}
                />
            </div>
            </div>
        )}

        <Footer />
        </div>
    );
}
