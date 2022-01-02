exports.handle = async function(interaction) {
	let action;
	if (interaction.type === this.erisConst.InteractionTypes.APPLICATION_COMMAND) {
		action = this.cmds.find((b) => b.trigger === interaction.data.name);
	}

	if (action) {
		const slashStart = Date.now();
		await interaction.acknowledge();

		return action
			.run({ GoalBot: this, interaction, cLatency: Date.now() - slashStart })
			.catch((err) => interaction.createFollowup(`Command failed because: \`${err.message}\``));
	}

	return this.logger(this, `Unsupported interaction ran: ${interaction.type}.`, 'warn');
};
