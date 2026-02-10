import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchTMDB } from "@/services/tmdb";

export default function SearchPage() {
    const [params] = useSearchParams();
    const query = params.get("q");
    const [data, setData] = useState(() => {
        // Initialize with empty array, no effect needed
        return [];
    });
    const abortControllerRef = useRef(null);

    useEffect(() => {
        // Cleanup previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        if (!query) {
            // Don't synchronously set state - just return
            // The initial empty state is already correct
            return;
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        const fetchData = async () => {
            try {
                const result = await searchTMDB(query, { 
                    signal: abortController.signal 
                });
                
                // Only update state if not aborted
                if (!abortController.signal.aborted) {
                    setData(result);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Search failed:', error);
                }
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [query]);

    // Derive loading state - loading if we have a query but no data yet
    const loading = query && data.length === 0;

    if (loading) return <p className="text-white p-6">Loading...</p>;

    return (
        <div className="p-6">
        <h1 className="text-white text-xl mb-4">
            Hasil pencarian: <span className="text-red-500">{query}</span>
        </h1>

        {data.length === 0 && !loading && (
            <p className="text-neutral-400">Tidak ditemukan</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.map(item => (
            <div key={item.id}>
                <img
                src={item.poster}
                className="rounded"
                alt={item.title}
                />
                <h3 className="text-white text-sm mt-1">
                {item.title}
                </h3>
                <p className="text-neutral-400 text-xs">
                ⭐ {item.rating} • {item.year}
                </p>
            </div>
            ))}
        </div>
        </div>
    );
}
