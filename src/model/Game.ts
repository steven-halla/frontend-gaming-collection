
export type Year = number;

export interface Game {
  id: number;
  title: string;
  publisher: string;
  genre: string;
  image : string;
  system: string;
  release_date: Year;
  value: number;
  rating: number;
}

