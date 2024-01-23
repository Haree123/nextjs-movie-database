export interface CardResults {
  first_air_date: string;
  id: number;
  media_type: string;
  name: string;
  original_name: string;
  original_title: string;
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

export interface MovieReviewResult {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: string;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
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

export interface MovieReviews {
  id: number;
  page: number;
  results: MovieReviewResult[];
  total_pages: number;
  total_results: number;
}

interface PeopleKnownForResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: 206647;
  media_type: string;
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface PeopleResults {
  profile_path: string;
  adult: boolean;
  id: number;
  known_for: PeopleKnownForResults[];
  name: string;
  popularity: number;
}

export interface PeopleData {
  page: number;
  results: PeopleResults[];
  total_pages: number;
}

interface CommonPersonCredits {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  first_air_date: string;
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export interface PersonCast extends CommonPersonCredits {
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
}

export interface PersonCrew extends CommonPersonCredits {
  credit_id: string;
  department: string;
  job: string;
  media_type: string;
}

export interface PersonData {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  combined_credits: {
    cast: PersonCast[];
    crew: PersonCrew[];
  };
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}
