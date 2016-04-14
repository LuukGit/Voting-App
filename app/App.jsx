import React from "react";
import ReactDOM from "react-dom";
import { browserHistory, Router, Route, IndexRoute } from "react-router";
import Main from "./components/Main.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import NewPoll from "./components/NewPoll.jsx";
import MyPolls from "./components/MyPolls.jsx";
import Poll from "./components/Poll.jsx";
import ajax from "./common/ajax-functions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: undefined, response: false};
  }

  componentDidMount() {
    if(!this.state.user){
      ajax('GET', "/api/user/:id", "", function(user){
        user = JSON.parse(user);
        if (user.github.username != ""){
          this.setState({ user: user })
        }
        this.setState({ response: true })
      }.bind(this))
    }
  }

  requireLogin(nextState, replaceState) {
    if (!this.state.user) {
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
  }

  render() {
      if(this.state.response) {
        return (
          <Router history={browserHistory}>
            <Route path="/" component={Main} user={this.state.user}>
              <IndexRoute component={MyPolls} onEnter={this.requireLogin.bind(this) }/>
              <Route path="/mypolls" onEnter={this.requireLogin.bind(this)} component={MyPolls}/>
              <Route path="/profile" onEnter={this.requireLogin.bind(this)} component={Profile}/>
              <Route path="/newpoll" onEnter={this.requireLogin.bind(this)} component={NewPoll}/>
              <Route path="/poll/:id" component={Poll} />
              <Route path="/login" component={Login} />
            </Route>
          </Router>
        );
      }
      else {
        return (
          <div></div>
        );
      }
  }
}

ReactDOM.render((
  <App />
  ), document.getElementById("app"));
