import { useState, useRef, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { searchTMDB } from "@/services/tmdb";

export default function Navbar({ onOpenSidebar }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const abortControllerRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const handleQueryChange = useCallback((e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!newQuery.trim()) {
      setOpen(false);
      setResults([]);
      return;
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      // Perform search
      searchTMDB(newQuery, { signal: abortControllerRef.current.signal })
        .then(data => {
          setResults(data.slice(0, 8));
          setOpen(true);
        })
        .catch(() => {
          // Ignore aborted requests
        });
    }, 400);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-neutral-800">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <button
            onClick={onOpenSidebar}
            className="md:hidden text-white text-xl"
          >
            <GiHamburgerMenu />
          </button>

          <span className="text-xl font-extrabold text-red-600">
            Seoul<span className="text-white text-sm ml-1">Watch</span>
          </span>
        </div>

        {/* SEARCH */}
        <div className="relative w-full max-w-105">
          <div className="flex items-center border border-neutral-700 bg-neutral-900 rounded-lg h-10 focus-within:border-red-600">
            <input
              value={query}
              onChange={handleQueryChange}
              onFocus={() => query && setOpen(true)}
              placeholder="Cari drakor, film Korea..."
              className="ml-2 w-full bg-transparent text-white text-sm focus:outline-none"
            />
            <FiSearch className="mx-3 text-neutral-400" />
          </div>

          {/* DROPDOWN RESULT */}
          {open && results.length > 0 && (
            <div className="absolute top-11 w-full bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden">
              {results.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 hover:bg-neutral-800 cursor-pointer"
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="text-white text-sm">{item.title}</p>
                    <p className="text-neutral-400 text-xs">
                      ⭐ {item.rating} • {item.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
