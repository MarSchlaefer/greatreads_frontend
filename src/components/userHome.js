import React, { Component } from 'react';
import CurrentlyReading from './currentlyReading';
import WantToRead from './wantToRead';
import Read from './read';
import Feed from './feed';


class UserHome extends Component {
  render() {
    return (
      <div className="userHome-container">
        <div className="userHome-left">
          <CurrentlyReading />
          <WantToRead />
          <Read />
        </div>
        <Feed />
      </div>
    )
  }
}

export default UserHome;
