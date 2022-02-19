module.exports = {
	run: async ({ GoalBot, interaction }) => {
		const donatorRolesMember = interaction.member.roles.filter((r) => GoalBot.config.modRole.includes(r));
		if (donatorRolesMember.length <= 0)
			return interaction.createFollowup("You don't have to required role(s) to run the command.");

		const options = interaction.data.options;
		const goalName = !options ? undefined : await options.find((o) => o.name === 'name').value.toLowerCase();
		const goalAmount = !options ? undefined : await options.find((o) => o.name === 'goal').value;

		const doesExist = await GoalBot.DB.getDataById('goal', goalName);
		if (doesExist)
			return interaction.createFollowup(`There is already a goal named **${goalName}**, pick another name.`);

		GoalBot.DB.createGoal(goalName, goalAmount)
			? interaction.createFollowup(`New goal created under the name **${goalName}** and goal **$${goalAmount}**.`) &&
				GoalBot.logger(
					GoalBot,
					`Create goal succeeded, started by ${interaction.member.username} (name: ${goalName}, goal: ${goalAmount}).`
				)
			: interaction.createFollowup(
					`Failed to created the new goal with name **${goalName}** and goal **$${goalAmount}**.`
				) &&
				GoalBot.logger(
					GoalBot,
					`Create goal failed, started by ${interaction.member.username} (name: ${goalName}, goal: ${goalAmount}).`,
					'warn'
				);
	},
	trigger: 'creategoal'
};
