import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { handleEditProfile } from '../actions';

class Profile extends Component {

  render() {
    return (
      <div className="user-profile">
        <h1>{this.props.currUser.username}</h1>
        <p>{this.props.currUser.bio}</p>
        <p>Followers: {this.props.currUser.followers.length}</p>
        <p>Following: {this.props.currUser.followees.length}</p>
        <button onClick={() => {this.props.handleEditProfile(this.props.currUserId)}}>Edit Profile</button>
      </div>
    )
  }

  findBookObj = () => {
    return this.props.allBooks.find(book => book.id === this.props.currBookId)
  }

  
} //end of class

const mapStateToProps = (state) => {
  console.log(state)
  return { currUserId: state.currUserId }
}

export default connect(mapStateToProps, { handleEditProfile })(Profile);
