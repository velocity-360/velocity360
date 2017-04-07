var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, lowercase:true, default:''},
	lastName: {type:String, trim:true, lowercase:true, default:''},
	slug: {type:String, trim:true, lowercase:true, default:''},
	featured: {type:String, default:'no'},
	confirmed: {type:String, default:'no'},
	promoCode: {type:String, trim:true, lowercase:true, default:''},
	email: {type:String, trim:true, lowercase:true, default:''},
	accountType: {type:String, trim:true, lowercase:true, default:'basic'}, // basic, premium
	city: {type:String, trim:true, lowercase:true, default:''},
	githubId: {type:String, trim:true, default:''},
	stripeId: {type:String, trim:true, default:''},
	creditCard: {type:mongoose.Schema.Types.Mixed, default:{}},
	resume: {type:String, trim:true, default:''},
	// about: {type:String, trim:true, default:''},
	tags: {type:Array, default:[]},
	password: {type:String, default:''},
	bio: {type:String, default:''},
	username: {type:String, trim:true, default:''},
	credits: {type: Number, default: 20},
	monthlyRate: {type: Number, default: 0},
	image: {type:String, trim:true, default:'qeodpw-g'}, // default profile icon
	isAdmin: {type:String, trim:true, lowercase:true, default:'no'},
	timestamp: {type:Date, default:Date.now},
})

ProfileSchema.methods.summary = function() {
	var summary = {
		firstName: this.firstName,
		lastName: this.lastName,
		slug: this.slug,
		featured: this.featured,
		confirmed: this.confirmed,
		githubId: this.githubId,
		accountType: this.accountType,
		email: this.email,
		tags: this.tags,
		bio: this.bio,
		username: this.username,
		monthlyRate: this.monthlyRate,
		image: this.image,
		// promoCode: this.promoCode,
		// city: this.city,
		// stripeId:this.stripeId,
		// about: this.about,
		// resume: this.resume,
		// credits: this.credits,
		// isAdmin: this.isAdmin,
		timestamp: this.timestamp,
		id: this._id.toString()
	}
	
	return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)