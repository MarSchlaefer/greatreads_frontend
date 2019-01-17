import React, { Component } from 'react';
import CurrentlyReading from './currentlyReading';
import WantToRead from './wantToRead';
import Read from './read';
import Feed from './feed';


class UserHome extends Component {
  render() {
    return (
      <div>
        <h1>Private Home Page</h1>
        <CurrentlyReading />
        <WantToRead />
        <Read />
        <Feed />
      </div>
    )
  }
}

export default UserHome;
