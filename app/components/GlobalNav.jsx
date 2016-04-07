import React from "react";
import { Link } from "react-router";

class GlobalNav extends React.Component {
  constructor() {
    super();
    this.state = { user: undefined };
  }

  componentDidMount() {
      this.setState({ user: this.props.user });
  }

  render() {
    var log = <li><Link to="/login"> Login </Link></li>;
    if (this.state.user) {
      log = <li><Link to="/profile"> {this.state.user.github.displayName} </Link></li>;
    }

    return (
      <nav id="myNav" className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header"> <h3 className="navbar-text">Voting App</h3> </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/mypolls">My Polls</Link>
            </li>
            <li>
              <Link to="/newpoll">New Polls</Link>
            </li>
            {log}
          </ul>
        </div>
      </nav>
    );
  }
}

module.exports = GlobalNav;
