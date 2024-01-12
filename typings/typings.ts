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
