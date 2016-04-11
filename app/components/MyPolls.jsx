import React from "react";
import { Link } from "react-router";
import ajax from "../common/ajax-functions.js";

class MyPolls extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: undefined, polls: [], response: false};
  }

  componentDidMount() {
    ajax('GET', "/api/user/:id", "", function(user){
      user = JSON.parse(user);
      if (user.github.username != ""){
        this.setState({ user: user });
        this.setState({ polls: user.polls })
      }
      this.setState({ response: true })
    }.bind(this))
  }

  render() {
      if (this.state.response) {
        var polls = <p>You have no polls yet.<br></br><Link to="/newpoll">Click here to add a new Poll!</Link></p>;
        if (this.state.polls.length > 0) {
          polls = this.state.polls.map(function(data) {
            var target = "/poll/" + data._id;
            return <Link to={target}><div className="text-center poll" key={data._id}>{data.title}</div></Link>;
          }.bind(this));
        }

        return(
          <div id="mypolls">
            <div id="pollList">
              {polls}
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

module.exports = MyPolls;
