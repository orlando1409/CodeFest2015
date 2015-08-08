var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TroubleSchema   = new Schema({
	desciption: String, 
	assignee: String
});
module.exports = mongoose.model('Trouble', TroubleSchema);