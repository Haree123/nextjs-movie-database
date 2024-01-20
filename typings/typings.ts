export interface CardResults {
  id: number;
  media_type: string;
  name: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: string;
}

export interface CardData {
  page: number;
  results: CardResults[];
  total_pages: number;
}

export interface MovieCast {
  adult: boolean;
  cast_id: string;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface MovieCrew {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  jobs: string[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface MovieGenres {
  id: number;
  name: string;
}

interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface MovieData {
  backdrop_path: string;
  genres: MovieGenres[];
  poster_path: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
}

export interface MovieCredits extends MovieData {
  credits: {
    cast: MovieCast[];
    crew: MovieCrew[];
  };
}

export interface MovieVideos extends MovieData {
  videos: {
    results: MovieVideo[];
  };
}
