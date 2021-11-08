import React from "react";

export const Home = (props) => {
  console.log(props.user)
  return (
    <div>
      <p>Welcome to the home page</p>
      <p>Hello user: {props.username}</p>
    </div>
  )
}
