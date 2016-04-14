import React from "react";
import ajax from "../common/ajax-functions.js";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined, response: false};
  }

  componentDidMount() {
    ajax('GET', "/api/user/:id", "", function(user){
      user = JSON.parse(user);
      if (user.github.username != ""){
        this.setState({ user: user})
      }
      this.setState({ response: true })
    }.bind(this))
  }

  render() {
    if (this.state.response) {
      var link = "https://github.com/" + this.state.user.github.username;
        return(
          <div id="profile">
            <div id="profile-info">
              <div id="profile-img"><img src="../client/img/gh-mark-32px.png" /></div>
              <ul>
                <li><span><strong>ID:</strong></span><span>&nbsp;{this.state.user.github.id}</span></li>
                <li><span><strong>Username:</strong></span><span>&nbsp;{this.state.user.github.username}</span></li>
                <li><span><strong>Display Name:</strong></span><span>&nbsp;{this.state.user.github.displayName}</span></li>
                <li><span><strong>Polls:</strong></span><span>&nbsp;{this.state.user.polls.length}</span></li>
              </ul>
              <div id="profile-buttons">
                <a href={link} target="_blank"><button>Github</button></a>
                <a href="/logout"><button>Logout</button></a>
              </div>
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
