const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
	// TODO userId = mongoose.Types.ObjectId(userId)
	email: {
		type: String,
		uniaque: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	links: [
		{
			type: Types.ObjectId,
			ref: 'Link',
		},
	],
});

module.exports = model('user', schema);
