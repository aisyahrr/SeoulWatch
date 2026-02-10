const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;

export async function fetchFromList(listId) {
  let allItems = [];
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch(
      `${BASE_URL}/list/${listId}?api_key=${API_KEY}&page=${page}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch TMDb list");
    }

    const data = await res.json();

    totalPages = data.total_pages;
    page++;

    const mapped = data.items
      .filter(
        item =>
          item.media_type === "tv" ||
          item.media_type === "movie"
      )
      .map(item => ({
        id: item.id,
        type: item.media_type,
        title: item.media_type === "tv" ? item.name : item.title,
        year:
          item.media_type === "tv"
            ? item.first_air_date?.slice(0, 4)
            : item.release_date?.slice(0, 4),
        rating: item.vote_average,
        genre_ids: item.genre_ids || [],
        poster: item.poster_path
        ? IMAGE_BASE + item.poster_path
        : "/images/placeholder.jpg",
      backdrop: item.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
        : null,
      }));

    allItems = allItems.concat(mapped);
  } while (page <= totalPages);

  return allItems;
}
// mostwatchedseries korea
export async function fetchMostWatchedKoreanSeries() {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}` +
    `&with_original_language=ko` +
    `&sort_by=popularity.desc` +
    `&vote_count.gte=100`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch most watched Korean series");
  }

  const data = await res.json();

  return data.results.map(item => ({
    id: item.id,
    type: "tv",
    title: item.name,
    year: item.first_air_date?.slice(0, 4) || "N/A",
    rating: item.vote_average,
    popularity: item.popularity,
    genre_ids: item.genre_ids || [],
    poster: item.poster_path
      ? IMAGE_BASE + item.poster_path
      : "/images/placeholder.jpg",
  }));
}
export async function fetchGenres() {
  const [tvRes, movieRes] = await Promise.all([
    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
  ]);

  if (!tvRes.ok || !movieRes.ok) {
    throw new Error("Failed to fetch genres");
  }

  const tv = await tvRes.json();
  const movie = await movieRes.json();

  // gabung & hapus duplikat
  const map = new Map();
  [...tv.genres, ...movie.genres].forEach(g => {
    map.set(g.id, g);
  });

  return Array.from(map.values());
}
// get trailer
export async function fetchDetail(id, type = "tv") {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) return null;

  return await res.json();
}

export async function fetchTrailer(id, type = "tv") {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
  );

  if (!res.ok) return null;

  const data = await res.json();

  const trailer = data.results.find(
    v =>
      v.site === "YouTube" &&
      (v.type === "Trailer" || v.type === "Teaser")
  );

  return trailer ? trailer.key : null;
}

export async function fetchActor(id, type = "tv") {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`
  );

  if (!res.ok) return null;

  const data = await res.json();

  return data.cast; 
}

// search drakor & movie
export async function searchTMDB(query, options = {}) {
  if (!query) return [];

  const { signal } = options;
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("Failed to search TMDB");
  }

  const data = await res.json();

  return data.results
    .filter(
      item =>
        item.media_type === "tv" ||
        item.media_type === "movie"
    )
    .map(item => ({
      id: item.id,
      type: item.media_type,
      title: item.media_type === "tv" ? item.name : item.title,
      year:
        item.media_type === "tv"
          ? item.first_air_date?.slice(0, 4)
          : item.release_date?.slice(0, 4),
      rating: item.vote_average,
      genre_ids: item.genre_ids || [],
      poster: item.poster_path
        ? IMAGE_BASE + item.poster_path
        : "/images/placeholder.jpg",
    }));
}




