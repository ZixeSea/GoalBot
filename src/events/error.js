exports.handle = async function(err) {
	if (err.code === 1006) return this.logger(this, 'Connection reset by peer.', 'warn');

	return this.logger(this, `The bot just ran into an error, ${err.message} (${err.stack}).`, 'error');
};
