import React from "react";
import { Link } from "react-router";
import ajax from "../common/ajax-functions.js";

class MyPolls extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: undefined, polls: [], response: false};
  }

  componentDidMount() {
    ajax('GET', "/api/user/:id", "", function(data){
      console.log(data);
      if (data != 'no user'){
        var user = JSON.parse(data);
        this.setState({ user: user });
        this.setState({ polls: user.polls })
      }
      this.setState({ response: true })
    }.bind(this))
  }

  render() {
      if (this.state.response) {
        var polls = <p>You have no polls yet.<Link to="/newpoll">Click here to add a new Poll!</Link></p>;
        if (this.state.polls.length > 0) {
          polls = this.state.polls.map(function(data) {
            var target = "/poll/" + data.title;
            return <li key={data.title}><Link to={target}>{data.title}</Link></li>;
          }.bind(this));
        }

        return(
          <div className="container text-center" id="myPolls">
            <ul id="pollList">
              {polls}
            </ul>
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

module.exports = MyPolls;
