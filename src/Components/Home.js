import React from "react";

export const Home = (props) => {
  const user = props.user;

  return (
    <div>
      <p>Welcome to the home page</p>
      <p>Hello {user?.username}</p>
    </div>
  )
}
