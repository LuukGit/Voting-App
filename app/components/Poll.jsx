import React from "react";
import PollResult from "./PollResult.jsx";
import ajax from "../common/ajax-functions.js";

// Split the div in two, with the voting in the left side, results on the right side.
class Poll extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { user: undefined, poll: undefined, response: false};
    context.router;
  }

  componentDidMount() {
    ajax("GET", "/api/user/:id", "", function(data) {
      if (data !== "no user") {
        this.setState({user: JSON.parse(data)});
      }
      else {
        this.setState({user: "guest"});
      }
    }.bind(this));
    ajax("GET", "/api/poll/" + this.props.params.title, "", function(data) {
      if (data !== "no poll") {
        this.setState({poll: JSON.parse(data)});
      }
      this.setState({response: true});
    }.bind(this));
  }

  // Post zowel userVote() als addOption() naar addVoteToPoll. Kijk binnen addVoteToPoll of de option al bestaat,
  // anders initialiseer met vote count 1.
  userVote() {

  }
  // Add input field?
  addOption() {

  }

  deletePoll() {
    ajax('DELETE', "/api/poll/" + this.props.params.title, "", function(){
      this.setState({ poll: undefined });
      console.log(this.context.router);
      this.context.router.push("/mypolls");
    }.bind(this))
  }

  render() {
    if (this.state.response) {
      if (this.state.poll) {
        var deleteButton = <div></div>;
        if (this.state.user.github) {
          if (this.state.user.github.id === this.state.poll.owner) {
            deleteButton = <button className="btn btn-danger" id="delete-btn" onClick={this.deletePoll.bind(this)}>Delete</button>
          }
        }
        return(
          <div id="poll">
            <div className="row">
              <div className="col-md-4" id="pollIndex">
                Title: <p>{this.state.poll.title}</p>

                <button className="btn btn-primary" id="vote-btn" onClick={this.userVote.bind(this)}>Vote</button>
                {deleteButton}
              </div>
              <div className="col-md-8" id="pollResult">
                <PollResult />
              </div>
            </div>
          </div>
        );
      }
      else {
          return (
            <div>This poll does not exist!</div>
          );
      }
    }
    else {
      return (
          <div></div>
      );
    }
  }
}

Poll.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Poll;
