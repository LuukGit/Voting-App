import React from "react";
import ajax from "../common/ajax-functions.js";

class NewPoll extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {title: "", options: ""};
    context.router;
  }

  handleTitleChange(event) {
      this.setState({title: event.target.value});
  }

  handleOptionsChange(event) {
      this.setState({options: event.target.value});
  }

  handleSubmit() {
      var title = this.state.title.trim();
      if (!title || this.state.options === "")
      {
          return;
      }
      var options = this.state.options.split(",").map(function(item) {
          return item.trim();
      });
      ajax("POST", "/newpoll", JSON.stringify({title: title, options: options}), function(data) {
        if (data === "duplicate poll") {
          alert("A poll with this name already exists!");
        }
        else {
          document.getElementById("title").value = "";
          document.getElementById("options").value = "";
          this.setState({title: "", options: ""});
          this.context.router.push("/poll/" + title);
        }
      }.bind(this));
  }

  render() {
      return(
          <div className="newPoll">
              <h4> Add a new poll: </h4>
              <form className="reactForm">
                  <input type="text" name="title" value={this.state.title} placeholder="Poll title" onInput={this.handleTitleChange.bind(this)} id="title"/>
                  <input type="text" name="options" value={this.state.options} placeholder="Options, separated by comma's..." id="options" onChange={this.handleOptionsChange.bind(this)}/>
                  <input type="button" value="Add Poll" onClick={this.handleSubmit.bind(this)}/>
              </form>
          </div>
      );
  }
}

NewPoll.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = NewPoll;
