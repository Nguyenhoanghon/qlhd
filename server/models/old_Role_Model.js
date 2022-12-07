const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
	roleId:{type: Number},
	nameRole: {
		type: String
	}
})

module.exports = mongoose.model('Role', RoleSchema)
