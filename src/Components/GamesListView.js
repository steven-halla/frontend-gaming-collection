import React from "react"

export const GamesListView = (props) => {
  const games = props.games;
  console.log(games);
  if(props.games.length > 0){
    let renderedGames = props.games.map(game => {
      return(
        <p key={game.id}>{game.title} {game.genre}</p>
      )
    })
    return(
      <div>
        {renderedGames}
      </div>
    )

  } else {
    return <div>Loading...</div>
  }
}
