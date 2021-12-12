

export interface Game {
  id: number;
  title: string;
  publisher: string;
  genre:  string;
  image : string;
  system: string;
  release_date: number;
  value: number;
  rating: number;
}

export interface GamesOwned {
  id: number;
  game: {
    id: number;
    title: string;
    publisher: string;
    genre: string;
    image: string;
    system: string;
    release_date: number;
    value: number;
    rating: number;
  },
  owner_rating: number;
  review: string;
}
