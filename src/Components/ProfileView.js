import React from 'react';

export const ProfileView = (props) => {
  const {user, gamesOwned} = props;
  console.log(gamesOwned);

  const totalGameValue = gamesOwned
    .map(ownedGame => ownedGame.game.value)
    .reduce((a, b) => a + b, 0);

  return (
    <div>
      <p>Welcome to the user profile page</p>
      <p>Name: {user?.username}</p>
      <p>favorite game: {user?.favorite_game}</p>
      <p>Users will be able to delete owned video games</p>
      <p>Users will be able to add games to their collection</p>
      <p>Users will be able to leave reviews for games they own, as well as leave a rating</p>
      <p>As a collector, I want to view data visualization on my collection.
        Displaying information in the form of charts and graphs. I want to be able to see
        number of games I own per release year. I want to view number of games per
        system. And I want to see a Pie chart of games broken down by price or value. </p>
      <p>User has the following games: {user?.gamesOwned}</p>
      <p>Total value of collection is: {totalGameValue} </p>

      <table>
        {gamesOwned.map((ownedGame) => {
            // rename "id" as "ownedGameId" when destructuring from "ownedGame"
            const {id: gamesOwnedId, game} = ownedGame;
            return (
              <tr>
                <td>
                  <p>Id: {gamesOwnedId}</p>
                  <p>Title: {game.title}</p>
                  <p>GameId: {game.id}</p>
                  <p>Genre: {game.genre}</p>
                  <p>Value: {game.value}</p>
                  <button onClick={() => props.deleteGame(gamesOwnedId)}>Delete</button>
                </td>
              </tr>
            );
          }
        )}
      </table>
    </div>
  )
}
