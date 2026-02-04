import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TitleHome from "@/components/TitleHome";
import SeriesGrid from "@/components/SeriesGrid";
import MovieGrid from "@/components/MovieGrid";
import { fetchFromList, fetchMostWatchedKoreanSeries, fetchGenres } from "@/services/tmdb";
import MostGrid from "@/components/MostGrid";

const LIST_ID = import.meta.env.VITE_LIST_ID; 

const Home = () => {
    const [items, setItems] = useState([]);
    const [genres, setGenres] = useState([]);
    const [mostWatched, setMostWatched] = useState([]);
    const [showAllMovie, setShowAllMovie] = useState(false);
    const [showAllSeries, setShowAllSeries] = useState(false);
    const { activeGenre } = useOutletContext();

    useEffect(() => {
        fetchMostWatchedKoreanSeries().then(data => {
            setMostWatched(data.slice(0, 10));
        });
    }, []);

    useEffect(() => {
        fetchGenres().then(setGenres);
    }, []);

    useEffect(() => {
        fetchFromList(LIST_ID).then(setItems);
    }, []);
    

    const filteredItems = activeGenre
    ? items.filter(i => i.genre_ids?.includes(activeGenre))
    : items;

  // FILTER
    const series = filteredItems.filter(i => i.type === "tv");
    const movies = filteredItems.filter(i => i.type === "movie");

    const displayedSeries = showAllSeries
    ? series 
    : series.slice(0,12);
    const displayedMovie = showAllMovie
    ? movies
    : movies.slice(0,5);

    const activeGenreName =
    activeGenre
        ? genres.find(g => g.id === activeGenre)?.name
        : null;

    if (!items) {
        return (
        <div className="flex items-center justify-center py-20 min-h-screen gap-2 text-white font-lato">
            <div className="w-10 h-10 border-5 border-red-800 border-t-red-500 rounded-full animate-spin" />
            <p>Loading</p>
        </div>
        );
    }
    return (
        <div className="space-y-12">
            <section className="space-y-8">
                <TitleHome 
                title="Most Watched Series" accentColor="bg-red-600" />
                <MostGrid data={mostWatched} />
            </section>
            <section className="space-y-8">
                <TitleHome
                    title={activeGenreName
                    ? `${activeGenreName} Series`
                    : "All Series"} accentColor="bg-red-600" 
                    onViewAll={() => setShowAllSeries(p => !p)}
                    isExpanded={showAllSeries}
                />
                <SeriesGrid data={displayedSeries} />
            </section>

            <section className="space-y-8">
                <TitleHome
                    title={activeGenreName
                    ? `${activeGenreName} Movie`
                    : "All Movie"}  accentColor="bg-red-600" 
                    onViewAll={() => setShowAllMovie(p => !p)}
                    isExpanded={showAllMovie}
                />
                <MovieGrid data={displayedMovie} />
            </section>
        </div>
    );
};

export default Home;
