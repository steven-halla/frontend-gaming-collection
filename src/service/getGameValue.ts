import {GamesOwned} from "../model/GamesOwned";

// return either a value or fixed value, but not both
export const getGameValue = (ownedGame: GamesOwned) => {
  console.log("getGameValue function start");
  if (ownedGame.fixed_value > 0) {
    return ownedGame.fixed_value;
  }
  return ownedGame.game.value;
}


