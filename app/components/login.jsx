import React from "react";

class Login extends React.Component {

  render() {
    return(
      <div className="container">
        <div id="login">
          <a href="/auth/github/callback">
            <div className="btn" id="login-btn">
              <img src="/client/img/github_32px.png" />
              <p>LOGIN WITH GITHUB</p>
            </div>
          </a>
        </div>
      </div>
    )
  }
}

module.exports = Login;
