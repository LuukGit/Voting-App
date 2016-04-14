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
      }).filter(function(item) {
          return (item !== " " && item !== "");
      });
      // Check for duplicates
      var duplicates = false;
      var arr = options.slice().map(function(item) {
        var newItem = "" + item;
        newItem = newItem.toLowerCase();
        return newItem;
      });
      arr = arr.sort();
      for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i+1]){
          duplicates = true;
        }
      }
      // Post the new poll to the database and move the page to the users MyPolls page.
      if (!duplicates) {
        ajax("POST", "/newpoll", JSON.stringify({title: title, options: options}), function(data) {
            document.getElementById("title").value = "";
            document.getElementById("options").value = "";
            this.setState({title: "", options: ""});
            this.context.router.push("/poll/" + JSON.parse(data));
        }.bind(this));
      }
      else {
        alert("Please remove the duplicate value(s).");
      }
  }

  render() {
      return(
          <div id="newpoll">
              <form className="reactForm">
                  <label for="title">Title</label>
                  <input type="text" name="title" value={this.state.title} placeholder="Poll title" onChange={this.handleTitleChange.bind(this)} id="title"/>
                  <label for="ptions">Options</label>
                  <input type="text" name="options" value={this.state.options} placeholder="Enter options, separated by comma's..." id="options" onChange={this.handleOptionsChange.bind(this)}/>
                  <input type="button" value="Add Poll" onClick={this.handleSubmit.bind(this)}/>
              </form>
          </div>
      );
  }
}

NewPoll.contextTypes = {
  router: function() {return React.PropTypes.func.isRequired;}
};

module.exports = NewPoll;
