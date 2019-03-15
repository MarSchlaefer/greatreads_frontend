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
          <CurrentlyReading allBooks={this.props.allBooks} currUser={this.props.currUser} handleBookClick={this.props.handleBookClick} handleBookChange={this.props.handleBookChange}/>
          <WantToRead allBooks={this.props.allBooks} currUser={this.props.currUser} handleBookClick={this.props.handleBookClick} handleBookChange={this.props.handleBookChange}/>
          <Read allBooks={this.props.allBooks} currUser={this.props.currUser} handleBookClick={this.props.handleBookClick} handleBookChange={this.props.handleBookChange}/>
        </div>
        <Feed currUser={this.props.currUser}/>
      </div>
    )
  }


} //end of class

export default UserHome;
