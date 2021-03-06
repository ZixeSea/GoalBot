const { makeEmbed } = require('../../utils/additional');

module.exports = {
	run: async ({ GoalBot, interaction }) => {
		if (!GoalBot.config.showForEveryone) {
			const donatorRolesMember = interaction.member.roles.filter((r) => GoalBot.config.modRole.includes(r));
			if (donatorRolesMember.length <= 0)
				return interaction.createFollowup("You don't have the required role(s) to run the command.");
		}

		const options = interaction.data.options;
		const goalName = !options ? undefined : await options.find((o) => o.name === 'name').value.toLowerCase();

		const doesExist = await GoalBot.DB.getDataById('goal', goalName);
		if (!doesExist) return interaction.createFollowup(`There isn't a goal named **${goalName}**, pick another name.`);

		const { _id, goal, current } = doesExist;
		interaction.createFollowup(makeEmbed(_id, goal, current)) &&
			GoalBot.logger(GoalBot, `Show goal succeeded, started by ${interaction.member.username} (name: ${goalName}).`);
	},
	slashJSON: {
		name: 'showgoal',
		description: 'Show info baout a goal',
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
