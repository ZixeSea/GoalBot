module.exports = {
	run: async ({ GoalBot, interaction }) => {
		const donatorRolesMember = interaction.member.roles.filter((r) => GoalBot.config.modRole.includes(r));
		if (donatorRolesMember.length <= 0)
			return interaction.createFollowup("You don't have to required role(s) to run the command.");

		const options = interaction.data.options;
		const goalName = !options ? undefined : await options.find((o) => o.name === 'name').value.toLowerCase();

		const doesExist = await GoalBot.DB.getDataById('goal', goalName);
		if (!doesExist) return interaction.createFollowup(`There isn't a goal named **${goalName}**, pick another name.`);

		GoalBot.DB.deleteGoal(goalName)
			? interaction.createFollowup(`The goal named **${goalName}** has been deleted.`) &&
				GoalBot.logger(GoalBot, `Delete goal succeeded, started by ${interaction.member.username} (name: ${goalName}).`)
			: interaction.createFollowup(`Failed to delete the goal named **${goalName}**.`) &&
				GoalBot.logger(
					GoalBot,
					`Delete goal failed, started by ${interaction.member.username} (name: ${goalName}).`,
					'warn'
				);
	},
	slashJSON: {
		name: 'deletegoal',
		description: 'Delete an existing goal',
		options: [
			{
				name: 'name',
				description: 'The name from the goal',
				type: 3,
				required: true,
				focused: false
			}
		]
	}
};
