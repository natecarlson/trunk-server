var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var sourcesSchema = mongoose.Schema({
  shortName: String,
  srcId: Number,
  srcNickname: String,
});

sourcesSchema.index({shortName: 1, srcId: 1});

module.exports = mongoose.model('Sources', sourcesSchema);
