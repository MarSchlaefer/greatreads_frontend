import React, { Component } from 'react';

class Profile extends Component {

  render() {
    return (
      <div className="user-profile">
        <h1>{this.props.currUser.username}</h1>
        <p>Followers: {this.props.currUser.followers.length}</p>
        <p>Following: {this.props.currUser.followees.length}</p>
      </div>
    )
  }

  findBookObj = () => {
    return this.props.allBooks.find(book => book.id === this.props.currBookId)
  }
} //end of class

export default Profile;
