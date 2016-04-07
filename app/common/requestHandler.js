var Poll = require("../models/poll.js");
var User = require("../models/users.js");

var path = process.cwd();

module.exports =  {

  newPoll(req, res) {
    Poll.findOne({title: req.body.title}, function(err, poll) {
      if (poll) {
        res.json("duplicate poll");
      }
      else {
        console.log(req.user);
        var newPoll = new Poll();
        newPoll.title = req.body.title;
        newPoll.options = req.body.options;
        newPoll.owner = req.user.github.id;

        newPoll.save(function(err) {
          if (err) { throw err; }
          console.log("Saved new Poll:\n" + newPoll);
        });

        // Add the new poll to the current users polls.
        req.user.polls.push(newPoll);
        req.user.save(function(err) {
          if (err) { throw err; }
          console.log("Added poll to MyPolls");
          res.send(newPoll.title);
        });
      }
    });
  },

  getPoll(req, res) {
    Poll.findOne({title: req.params.title}, function(err, poll) {
      if (err) { throw err; }
      if (poll) {
        res.json(poll);
      }
      else {
        res.send("no poll");
      }
    })
  },

  deletePoll(req, res) {
    Poll.remove({title: req.params.title}, function(err) {
      if (err) { throw err; }
      else {
        // Remove the  poll from the current users polls.
        var polls = req.user.polls;
        for (var i = 0; i < polls.length; i++) {
          if (polls[i].title === req.params.title) {
            polls.splice(i, 1);
          }
        }
        var conditions = {displayName: req.user.displayName}
          , update = { $set: {polls: polls} }
          , options = { multi: false };

        User.update(conditions, update, options, function(err) {
          if (err) { throw err; }
          console.log("Poll succesfully removed!");
          res.json("success");
        });
      }
    })
  },

  addVoteToPoll(req, res) {

  }
};
