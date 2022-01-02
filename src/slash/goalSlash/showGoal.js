const { makeEmbed } = require('../../utils/additional');

module.exports = {
	run: async ({ GoalBot, interaction }) => {
		const options = interaction.data.options;
		const goalName = !options ? undefined : await options.find((o) => o.name === 'name').value.toLowerCase();

		const doesExist = await GoalBot.DB.getDataById('goal', goalName);
		if (!doesExist)
			return interaction.createFollowup(`There isn't a goal named **${goalName}**, pick another name.`);

		const { _id, goal, current } = doesExist;
		interaction.createFollowup(makeEmbed(_id, goal, current)) &&
			GoalBot.logger(
				GoalBot,
				`Show goal succeeded, started by ${interaction.member.username} (name: ${goalName}).`
			);
	},
	trigger: 'showgoal'
};
