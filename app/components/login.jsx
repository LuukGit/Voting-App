import React from "react";

class Login extends React.Component {

  render() {
    return(
        <div id="login">
          <div id="github-img">
            <img src="/client/img/GitHub-Mark-120px-plus.png" />
          </div>
          <div id="github-btn">
            <a href="/auth/github/callback">
              <div className="btn" id="login-btn">
                <p>LOGIN WITH GITHUB</p>
              </div>
            </a>
          </div>
        </div>
    )
  }
}

module.exports = Login;
