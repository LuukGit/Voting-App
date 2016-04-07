import React from "react";
import ajax from "../common/ajax-functions.js";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined, response: false};
  }

  componentDidMount() {
    ajax('GET', "/api/user/:id", "", function(data){
      console.log(data);
      if (data != 'no user'){
        this.setState({ user: JSON.parse(data) })
      }
      this.setState({ response: true })
    }.bind(this))
  }

  render() {
    if (this.state.response) {
        return(
          <div className="container">
            <div id="user">
              <p>Display Name: {this.state.user.github.displayName}</p>
              <p>ID: {this.state.user.github.id}</p>
              <p>Username: {this.state.user.github.username}</p>
              <p>Polls: {this.state.user.polls.length}</p>
            </div>
            <div id="logout">
              <a href="/logout">
                logout
              </a>
            </div>
          </div>
        );
    }
    else {
      return(
        <div>
        </div>
      );
    }
  }
}

module.exports = Profile;
