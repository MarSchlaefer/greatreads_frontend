import React, { Component } from 'react';

class Profile extends Component {

  render() {
    return (
      <div className="user-profile">
        <h1>{this.props.currUser.username}</h1>
        <p>{this.props.currUser.bio}</p>
        <p>Followers: {this.props.currUser.followers.length}</p>
        <p>Following: {this.props.currUser.followees.length}</p>
        <button onClick={HANDLE CLICK}>Edit Profile</button>
      </div>
    )
  }

  findBookObj = () => {
    return this.props.allBooks.find(book => book.id === this.props.currBookId)
  }

} //end of class

export default Profile;
