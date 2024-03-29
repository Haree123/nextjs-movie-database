import { InitialStateInterface } from "@/components/filters/filterReducer";
import dayjs from "dayjs";

export type MediaType = "movie" | "tv";
export type QueryType = MediaType | "person";
type CommonSubjects = "popular" | "top_rated";
type MoviesType = "now_playing" | CommonSubjects;
type TvShowsType = "on_the_air" | CommonSubjects;
type TimeFrame = "day" | "week";

export const getTrending = async (page: number, timeFrame: TimeFrame) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/trending/all/${timeFrame}?${queryParams}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  return data.json();
};

export const getUpcoming = async (page: number, type: MediaType) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${type}/upcoming?${queryParams}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  return data.json();
};

export const getMovies = async (page: number, type: MoviesType) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${type}?${queryParams}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  return data.json();
};

export const getTvShows = async (page: number, type: TvShowsType) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/${type}?${queryParams}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  return data.json();
};

export const discoverMedia = async (
  page: number,
  state: InitialStateInterface,
  type: MediaType
) => {
  const { fromDate, genres, language, toDate } = state;

  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
    with_genres:
      genres !== undefined && genres.length > 0 ? genres.join(",") : "",
    with_original_language: language ? language : "",
  });

  if (type === "movie") {
    queryParams.append(
      "primary_release_date.gte",
      String(fromDate) ? dayjs(String(fromDate)).format("YYYY-MM-DD") : ""
    );

    queryParams.append(
      "primary_release_date.lte",
      String(toDate) ? dayjs(String(toDate)).format("YYYY-MM-DD") : ""
    );
  }

  if (type === "tv") {
    queryParams.append(
      "first_air_date.gte",
      String(fromDate) ? dayjs(String(fromDate)).format("YYYY-MM-DD") : ""
    );

    queryParams.append(
      "first_air_date.lte",
      String(toDate) ? dayjs(String(toDate)).format("YYYY-MM-DD") : ""
    );
  }

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/${type}?${queryParams}`,
    {
      next: {
        revalidate: 3600,
      },
    }
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

export const getSimilarById = async (type: MediaType, id: string) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(1),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${type}/${id}/similar?${queryParams}`
  );
  return data.json();
};

export const getReviewsById = async (
  type: MediaType,
  id: string,
  page: number
) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${type}/${id}/reviews?${queryParams}`
  );
  return data.json();
};

export const getPopularPeople = async (page: number) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: String(page),
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/person/popular?${queryParams}`
  );
  return data.json();
};

export const getPeopleInfoById = async (id: string) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    append_to_response: "combined_credits",
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/person/${id}?${queryParams}`
  );
  return data.json();
};

export const getSearchInfoByQuery = async (
  type: QueryType,
  page: string,
  query: string
) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    page: page,
    query,
  });

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/${type}?${queryParams}`
  );

  return data.json();
};
