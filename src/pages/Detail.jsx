import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTrailer, fetchDetail,fetchActor} from "@/services/tmdb";
import HeroTrailer from "@/components/HeroTrailer";
import AppHeader from "@/components/AppHeader";
import CastRow from "@/components/CastRow";
import { FaStar } from "react-icons/fa";

export default function Detail() {
    const { id, type } = useParams();
    const [hideHeader, setHideHeader] = useState(false);
    const [detail, setDetail] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [actors, setActors] = useState([]);


    useEffect(() => {
        if (!id || !type) return;

        fetchDetail(id, type).then(setDetail);
        fetchTrailer(id, type).then(setTrailerKey);
    }, [id, type]);
    useEffect(() => {
    if (!id || !type) return;

    fetchActor(id, type).then(setActors);
    }, [id, type]);

    if (!detail) {
        return (
        <div className="flex items-center justify-center py-20 min-h-screen gap-2 text-white font-lato">
            <div className="w-10 h-10 border-5 border-red-800 border-t-red-500 rounded-full animate-spin" />
            <p>Loading</p>
        </div>
        );
    }

  return (
    <div className="bg-black min-h-screen text-white">
        {/* HEADER */}
        {!hideHeader && (
            <AppHeader title={detail.title || detail.name} />
        )}

        {/* HERO */}
        <HeroTrailer
            trailerKey={trailerKey}
            backdrop={detail.backdrop_path}
            onPlay={() => setHideHeader(true)}
            onExit={() => setHideHeader(false)}
        />

        {/* CONTENT */}
        <section className="px-4 md:px-10 py-5">
            <h1 className="text-lg md:text-4xl font-bold">
            {detail.title || detail.name}
            </h1>

            <div className="flex items-center gap-3 mt-3 text-sm text-neutral-400">
                <span>{detail.first_air_date?.slice(0, 4) || detail.release_date?.slice(0, 4)} </span>
                <span>•</span>
                <span className="flex items-center gap-2">{detail.vote_average?.toFixed(1)} <FaStar className="text-yellow-400" /> </span>
                {detail.number_of_episodes && (
                <span className=" flex items-center gap-2">•<span className=" text-red-700 font-lato font-semibold">{detail.number_of_episodes} Episodes</span></span>
                )}
            </div>
            <p className="mt-4 text-neutral-300 text-justify leading-relaxed max-w-5xl">
            {detail.overview}
            </p>
            <CastRow actors={actors} />
        </section>
    </div>
  );
}
