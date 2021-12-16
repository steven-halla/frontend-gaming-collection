import {Game} from "./Game";

export interface GamesOwned {
  id: number;
  game: Game;
  notes: string;
  fixed_value: number;
}
