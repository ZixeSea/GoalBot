let config = {};

const path = require('path');
const pkg = require('../../package.json');
const options = require('../../config/production.json');
const basePath = path.resolve(path.join(__dirname, '..'));

config.pkg = pkg;

config.name = 'GoalBot';

config.env = process.env;

config.status = {
	text: 'all goals',
	type: 3
};

config.clientOptions = {
	disableEvents: {
		CHANNEL_PINS_UPDATE: true,
		THREAD_CREATE: true,
		THREAD_UPDATE: true,
		THREAD_DELETE: true,
		THREAD_LIST_SYNC: true,
		THREAD_MEMBER_UPDATE: true,
		THREAD_MEMBERS_UPDATE: true,
		STAGE_INSTANCE_CREATE: true,
		STAGE_INSTANCE_UPDATE: true,
		STAGE_INSTANCE_DELETE: true
	},
	allowedMentions: {
		everyone: false,
		roles: true,
		users: true
	},
	getAllUsers: false,
	guildSubscriptions: false,
	largeThreshold: 0,
	messageLimit: 0,
	requestTimeout: 0,
	intents: [ 'guilds' ]
};

config.botOptions = options.bot;

config.dbOptions = options.db;

config.modRole = options.bot.modRole;

config.showForEveryone = options.bot.showForEveryone;

config.guild = options.bot.guild;

config.paths = {
	base: basePath,
	slash: path.join(basePath, 'slash'),
	events: path.join(basePath, 'events')
};

module.exports = config;
