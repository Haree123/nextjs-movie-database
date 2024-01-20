type MediaType = "movie" | "tv";
type MoviesType = "now_playing" | "popular" | "top_rated";
type TvShowsType = "on_the_air" | "popular" | "top_rated";
type TimeFrame = "day" | "week";

export const getTrending = async (page: number, timeFrame: TimeFrame) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/trending/all/${timeFrame}?${queryParams}`
  );
  return data.json();
};

export const getUpcoming = async (page: number, type: MediaType) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${type}/upcoming?${queryParams}`
  );
  return data.json();
};

export const getMovies = async (page: number, type: MoviesType) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${type}?${queryParams}`
  );
  return data.json();
};

export const getTvShows = async (page: number, type: TvShowsType) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/${type}?${queryParams}`
  );
  return data.json();
};

export const getInfoByIdCredits = async (type: MediaType, id: string) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    append_to_response: "credits",
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${type}/${id}?${queryParams}`
  );
  return data.json();
};

export const getInfoByIdVideos = async (type: MediaType, id: string) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    append_to_response: "videos",
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${type}/${id}?${queryParams}`
  );
  return data.json();
};

export const getSimilarByMovieId = async (type: MediaType, id: string) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(1),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${type}/${id}/similar?${queryParams}`
  );
  return data.json();
};
