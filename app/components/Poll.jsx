import React from "react";
import BarChart from "./BarChart.jsx";
import ajax from "../common/ajax-functions.js";

// Split the div in two, with the voting in the left side, results on the right side.
class Poll extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { user: undefined, poll: undefined, response: false, alreadyvoted: false, addOptionTitle: "", addOption: false};
    this.setSelectVote = this.setSelectVote.bind(this);
    context.router;
  }

  componentDidMount() {
    ajax("GET", "/api/user/:id", "", function(user) {
      user = JSON.parse(user);
      this.setState({user: user});
      ajax("GET", "/api/poll/" + this.props.params.id, "", function(poll) {
        if (poll !== "no poll") {
          poll = JSON.parse(poll);
          this.setState({poll: poll});
          if (poll.voters.indexOf(user.github.id) > -1) {
            this.setState({alreadyVoted: true});
          }
        }
        this.setState({response: true});
      }.bind(this));
    }.bind(this));
  }

  submitVote(vote) {
    ajax("POST", "/api/poll/" + this.state.poll._id, JSON.stringify( {user: this.state.user, poll: this.state.poll, vote: vote }), function(data) {
      if(data === "duplicate") {
        alert("You supplied a duplicate vote option. Please try again.");
      }
      else {
        this.setState({ poll: JSON.parse(data) });
        this.setState({ alreadyVoted: true });
      }
      this.setState({ addOptionTitle: "" });
    }.bind(this))
  }

  handleVote(e) {
    e.preventDefault();
    // If the vote adds a new option
    var vote = "";
    if (this.state.addOption) {
      vote = this.state.addOptionTitle;
    }
    // If the option already existed check which option was selected.
    else {
      var options = this.state.poll.options;
      for (var i = 0; i < options.length; i++) {
        if (document.getElementById(options[i]).checked) {
          vote = options[i];
          break;
        }
      }
    }
    // Submit the vote if it has a valid input.
    if (vote !== "") {
      this.submitVote(vote);
      // Reset the radio buttons
      for (var j = 0; j < options.length; j++) {
        document.getElementById(options[j]).checked = false;
      }
    }
  }

  handleOptionButton() {
    this.setState({ addOption: document.getElementById("addOption").checked });
  }

  handleAddOptionText(event) {
    this.setState({ addOptionTitle: event.target.value});
  }

  deletePoll() {
    ajax('DELETE', "/api/poll/" + this.state.poll._id, "", function(){
      this.setState({ poll: undefined });
      this.context.router.push("/mypolls");
    }.bind(this))
  }

  setSelectVote(options, addOption, deleteButton) {
    return  <div><div id="poll-options">
              <form>
                {options}
                  <label>
                  <input type="radio" name="option" id="addOption" onChange={this.handleOptionButton.bind(this)} value="addOption"></input>
                  Add Option
                  </label>
              </form>
              {addOption}
            </div>
            <div id="poll-buttons">
              <button onClick={this.handleVote.bind(this)}>Vote</button>
              {deleteButton}
            </div></div>;
  }

  render() {
    var addOption = <div></div>;
    var deleteButton = <div></div>;
    var content = <div></div>;
    if (this.state.response) {
      if (this.state.poll) {
        var options = this.state.poll.options.map(function(option) {
          return <label>
              <input type="radio" name="option" id={option} onChange={this.handleOptionButton.bind(this)} value={option}></input>
              {option}
            </label>;
        }.bind(this));
        if (this.state.user.github.id === this.state.poll.owner) {
          deleteButton = <button onClick={this.deletePoll.bind(this)}>Delete Poll</button>
        }
        if (this.state.addOption) {
          addOption = <div id="add-option-form"><form onSubmit={this.handleVote.bind(this)}><input type="text" placeholder="Enter the title" value={this.state.addOptionTitle} onChange={this.handleAddOptionText.bind(this)} id="addOptionTitle"></input></form></div>;
        }
        if (this.state.alreadyVoted) {
          content = <BarChart data={this.state.poll.results} />;
        }
        else {
          content = this.setSelectVote(options, addOption, deleteButton);
        }

        return(
          <div id="poll">
                <h3 className="text-center">{this.state.poll.title}</h3>
                {content}
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
  router: function() {return React.PropTypes.func.isRequired;}
};

module.exports = Poll;
