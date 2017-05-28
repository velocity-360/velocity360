var mongoose = require('mongoose')

var SubscriberSchema = new mongoose.Schema({
	name: {type:String, trim:true, default:''},
	email: {type:String, trim:true, default:''},
	score: {type:Number, default:0},
	survey: {type:Array, default:[]},
	cta: {type:String, trim:true, lowercase:true, default:''},
	// workshop: {type:String, trim:true, lowercase:true, default:''},
	timestamp: {type:Date, default:Date.now},
})

SubscriberSchema.methods.summary = function() {
	var summary = {
		'name':this.name,
		'email':this.email,
		'score':this.score,
		'survey':this.survey,
		'cta':this.cta,
		'timestamp':this.timestamp,
		'id':this._id.toString()
	}

	return summary
}

module.exports = mongoose.model('SubscriberSchema', SubscriberSchema)