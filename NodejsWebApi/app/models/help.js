var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HelpSchema   = new Schema({
	desciption: String, 
	example: String
});
module.exports = mongoose.model('Help', HelpSchema);