import React from 'react';

export const ProfileView = (props) => {
  const user = props.user;

  return (
    <div>
      <p>Welcome to the user profile page</p>
      <p>Name: {user?.username}</p>
      <p>favorite game: {user?.favorite_game}</p>
      <p>In near future will have full listing of owned video games</p>
      <p>Users will be able to delete owned video games</p>
      <p>Users will be able to leave reviews for games they own, as well as leave a rating</p>
      <p>Users will be able to see the total value of their collection</p>
      <p>As a collector, I want to view data visualization on my collection.
        Displaying information if the form of charts and graphs.  I want to be able to see
        number of games I own per release year.  I want to view number of games per
        system. And I want to see a Pie chart of games broken down by price or value. </p>
    </div>
  )
}
