const Eris = require('eris');
const config = require('./config');
const { readdirSync } = require('fs');
const { join } = require('path');
const DB = require('../database/DB');
const createSlash = require('../utils/createSlash');
const { logger } = require('../utils/additional');

class GoalBot {
	constructor() {
		this.cmds = [];
		this.btns = [];

		process.on('unhandledRejection', crashHandler.bind(this));
		process.on('uncaughtException', crashHandler.bind(this));

		this.DB = new DB(this);
		this.logger = logger;
	}

	get client() {
		return this._client;
	}

	get config() {
		return config;
	}

	get erisVersion() {
		Eris.VERSION;
	}

	get erisConst() {
		return Eris.Constants;
	}

	async setup() {
		this.clientOptions = config.clientOptions;
		this._client = new Eris(config.botOptions.token, config.clientOptions);

		this.client.once('shardReady', () => {
			this.user = this._client.user;
			this.userid = this._client.user.id;
		});

		loadEvents.call(this);
		loadSlash.call(this);

		this.client.once('ready', ready.bind(this));
		login.call(this);
	}
}

function login() {
	this.client.connect();

	setTimeout(() => {
		addSlashCommands.call(this);
	}, 3000);

	return false;
}

async function ready() {
	this.logger(this, `The bot is ready in ${this.client.guilds.size} guilds.`);

	const isConnected = await this.DB.connect();
	if (!isConnected) process.kill(process.pid, 'SIGTERM');

	this.user = this._client.user;
	this.userid = this._client.user.id;

	this.client.editStatus('online', {
		name: this.config.status.text,
		type: this.config.status.type || Eris.Constants.ActivityTypes.WATCHING
	});
}

function loadEvents() {
	const events = readdirSync(this.config.paths.events)
		.filter((file) => file.endsWith('.js'))
		.map((l) => l.split('.')[0]);

	for (const event of events) {
		this.client.on(event, require(join(this.config.paths.events, event)).handle.bind(this));
	}
}

function loadSlash() {
	const categories = readdirSync(this.config.paths.slash).filter((file) => !file.endsWith('.js'));

	for (const categoryPath of categories) {
		const cmdInteracts = readdirSync(join(this.config.paths.slash, categoryPath)).filter((file) =>
			file.endsWith('.js')
		);

		for (const cmdInteract of cmdInteracts) {
			const slash = require(join(this.config.paths.slash, categoryPath, cmdInteract));
			this.cmds.push(slash);
		}
	}
}

const crashHandler = (reason) => {
	console.error(reason);
};

module.exports = GoalBot;

function addSlashCommands() {
	this.logger(this, 'Slash command adder has been started.');
	if (!this.client.guilds.get(this.config.guild))
		return this.logger(this, 'Slash command adder failed, guild not found.');

	return createSlash(this);
}
