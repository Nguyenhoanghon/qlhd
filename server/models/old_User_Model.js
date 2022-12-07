const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]

})

module.exports = mongoose.model('users', UserSchema)
