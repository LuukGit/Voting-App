"use strict";

var path = process.cwd();
var requestHandler = require("../common/requestHandler.js");

module.exports = function(app, passport) {
	app.route("/")
		.get(function (req, res) {
				res.sendFile(path + '/client/index.html');
		});
	app.route('/login')
		.get(function (req, res) {
				res.sendFile(path + '/client/index.html');
		});

	app.route('/logout')
    .get(function (req, res) {
        req.logout();
        res.redirect('/');
    });

	app.route("/mypolls")
		.get(function(req, res) {
			res.sendFile(path + '/client/index.html');
		});

	app.route('/newpoll')
		.post(requestHandler.newPoll)
		.get(function (req, res) {
				res.sendFile(path + '/client/index.html');
		});

	app.route('/profile')
		.get(function (req, res) {
				res.sendFile(path + '/client/index.html');
		});

	app.route("/poll")
		.get(function(req, res) {
			res.sendFile(path + "/client/index.html");
		});

	app.route("/poll/:title")
		.get(function(req, res) {
			res.sendFile(path + "/client/index.html");
		});

	app.route('/api/poll/:title')
		.get(requestHandler.getPoll)
		.post(requestHandler.addVoteToPoll)
		.delete(requestHandler.deletePoll);

	app.route('/api/user/:user')
		.get(function (req, res) {
				if (req.user) {
						res.json(req.user);
				}
				else {
						res.send('no user');
				}
		});

  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));
}
