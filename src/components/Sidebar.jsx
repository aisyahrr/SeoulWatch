import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import TopSeriesList from "./TopSeriesList";
import { fetchFromList } from "@/services/tmdb";
import CategoriesGenre from "./CategoriesGenre";

const LIST_ID = import.meta.env.VITE_LIST_ID; 

export default function  Sidebar({ genres, activeGenre, onSelectGenre }) {
    const [topSeries, setTopSeries] = useState([]);

  useEffect(() => {
    async function loadTopSeries() {
      const items = await fetchFromList(LIST_ID);

      const topRated = items
        .filter(item => item.rating > 0)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      setTopSeries(topRated);
    }

    loadTopSeries();
  }, []);

  return (
    <div className="space-y-8 w-62">
        <SectionTitle
            title="Top 5 Series I Watched"
            accentColor="bg-yellow-500"
        />
        <TopSeriesList data={topSeries} type={topSeries.media_type || "tv"} />

        <SectionTitle title="Categories" accentColor="bg-red-500" />
        <CategoriesGenre
            genres={genres}
            active={activeGenre}
            onSelect={onSelectGenre}
        />
    </div>
  );
}
