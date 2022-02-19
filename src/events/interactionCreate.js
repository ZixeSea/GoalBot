exports.handle = async function(interaction) {
	if (interaction.guildID !== this.config.guild) return;

	const start = Date.now();
	await interaction.acknowledge();
	const latency = Date.now() - start;

	let action;
	if (interaction.type === this.erisConst.InteractionTypes.APPLICATION_COMMAND) {
		action = this.cmds.find((b) => b.slashJSON.name === interaction.data.name);
	}

	if (action)
		return action
			.run({ GoalBot: this, interaction, latency })
			.catch((err) => interaction.createFollowup(`Interaction failed because: \`${err.message}\``));

	this.logger(this, `Unsupported interaction ran: ${interaction.type}.`, 'warn');
	return interaction.createFollowup(`Unsupported interaction ran or no reply.`);
};
