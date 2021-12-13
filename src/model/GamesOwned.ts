import {Game} from "./Game";

export interface GamesOwned {
  id: number;
  game: Game;
  owner_rating: number;
  review: string;
}
