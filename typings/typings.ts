export interface CardResults {
  id: number;
  name: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: string;
}

export interface CardData {
  page: number;
  results: CardResults[];
}
