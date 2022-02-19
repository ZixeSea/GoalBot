module.exports = {
	run: async ({ GoalBot, interaction }) => {
		const donatorRolesMember = interaction.member.roles.filter((r) => GoalBot.config.modRole.includes(r));
		if (donatorRolesMember.length <= 0)
			return interaction.createFollowup("You don't have to required role(s) to run the command.");

		GoalBot.cmds.forEach((c) => {
			GoalBot.logger(GoalBot, `Edited ${c.slashJSON.name}, should now be up to date.`);
			GoalBot.client.createGuildCommand(GoalBot.config.guild, c.slashJSON, 1);
		});

		return interaction.createFollowup('Reload from the slash commands is done.');
	},
	slashJSON: { name: 'reload', description: 'Force reloads the slash command(s).' }
};
