'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	title: String,
	owner: String,
  options: [],
  results: [],		// keys: options, votes
  voters: []
});

module.exports = mongoose.model('Poll', Poll);
