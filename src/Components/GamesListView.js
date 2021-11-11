import React, {useState} from "react"
import {SearchBar} from "./SearchBar";
import {Link} from "react-router-dom";

export const GamesListView = (props) => {
  const games = props.games;
  const [searchQuery, setSearchQuery] = useState("");

  console.log(games);
  // if(props.games.length > 0){
  //   let renderedGames = props.games.map(game => {
  //     return(
  //       <p key={game.id}>{game.title} {game.genre}</p>
  //     )
  //   })
  //
  //   return(
  //     <div>
  //       {renderedGames}
  //     </div>
  //   )
  //
  // } else {
  //   return <div>Loading...</div>
  // }

  return (
    <div>
      <p>Hi Im a search bar</p>
      <input
        type="text"
        placeholder="Search by game info"
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
      />
      <table>
        {props.games
          .filter((foundGames) => {
            if (searchQuery === "") {
              return foundGames;
            } else if (
              foundGames.title
                .toLowerCase()
                .includes(searchQuery.toLocaleLowerCase()) ||
              foundGames.genre
                .toLowerCase()
                .includes(searchQuery.toLocaleLowerCase())
            ) {
              return foundGames;
            }
          })
          .map((game) => (
            <tr key={game.id}>
              <td>
                <div className="border">
                  <p>Title:{game.title}</p>
                  <p>Value: {game.value}</p>
                  <p>Genre: {game.genre}</p>
                </div>
              </td>
              <td >
                  <button

                    // onClick={() => props.addGameToCollection(game.id)}
                  >
                    Add to game list
                  </button>
              </td>

            </tr>
          ))}
      </table>
    </div>
  );

}
