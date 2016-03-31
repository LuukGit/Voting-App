"use strict";

var http = require("http");
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");

var app = express();
var server = http.createServer(app);
require("dotenv").load();
require("./app/config/passport")(passport);

app.use(express.static(process.cwd() + "/client"));
app.use("/components", express.static(process.cwd() + "/app/components"));
app.use("/public", express.static(process.cwd() + "/public"));
app.use("/common", express.static(process.cwd() + "/app/common"));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
