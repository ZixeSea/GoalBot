exports.handle = async function(msg) {
	return this.logger(this, `The bot just ran into a non-breaking error, ${msg}.`, 'warn');
};
