export interface genresList {
  id: number;
  name: string;
}

export interface ErrorData {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface CardResults {
  first_air_date: string;
  id: number;
  media_type: string;
  name: string;
  original_name: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: string;
}

export interface CardData {
  page: number;
  results: CardResults[];
  total_pages: number;
  total_results: number;
}

export interface CommonMediaData {
  backdrop_path: string;
  genres: MovieGenres[];
  poster_path: string;
  overview: string;
  tagline: string;
  vote_average: number;
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

interface MediaVideo {
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

interface MovieData extends CommonMediaData, ErrorData {
  original_title: string;
  release_date: string;
  runtime: number;
  title: string;
}

export interface MovieCredits extends MovieData {
  credits: {
    cast: MovieCast[];
    crew: MovieCrew[];
  };
}

export interface MovieVideos extends MovieData {
  videos: {
    results: MediaVideo[];
  };
}

export interface MovieReviews {
  id: number;
  page: number;
  results: MovieReviewResult[];
  total_pages: number;
  total_results: number;
}

interface TvCastData {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

export interface TvCrewData {
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

export interface TvSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface TvData extends CommonMediaData, ErrorData {
  adult: boolean;
  credits: {
    cast: TvCastData[];
    crew: TvCrewData[];
  };
  first_air_date: string;
  last_air_date: string;
  homepage: string;
  id: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_language: string;
  original_name: string;
  popularity: number;
  seasons: TvSeason[];
  status: string;
  type: string;
}

export interface TvCredits extends TvData {
  credits: {
    cast: MovieCast[];
    crew: MovieCrew[];
  };
}

export interface TvVideos extends TvData {
  videos: {
    results: MediaVideo[];
  };
}

interface PeopleKnownForResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
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
  adult: boolean;
  id: number;
  known_for: PeopleKnownForResults[];
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string;
  popularity: number;
}

export interface PeopleData {
  page: number;
  results: PeopleResults[];
  total_pages: number;
  total_results: number;
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

export interface PersonData extends ErrorData {
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

export interface LanguageList {
  id: number;
  iso: string;
  language: string;
}
