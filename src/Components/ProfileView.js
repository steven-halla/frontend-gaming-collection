import React from 'react';

export const ProfileView = (props) => {
  const user = props.user;

  return (
    <div>
      <p>Welcome to the user profile page</p>
      <p>Name: {user?.username}</p>
      <p>favorite game: {user?.favorite_game}</p>
    </div>
  )
}
