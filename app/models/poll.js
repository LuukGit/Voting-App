'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	title: String,
	owner: String,
  options: [],
  results: [],
  voters: []
});

module.exports = mongoose.model('Poll', Poll);
