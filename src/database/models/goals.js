const { Schema, model } = require('mongoose');

const goalSchema = Schema(
	{
		_id: String,
		goal: Number,
		current: Number,
		channelId: String,
		messageId: String
	},
	{ versionKey: false }
);

module.exports = model('Goals', goalSchema);
