const { makeEmbed } = require('../../utils/additional');

module.exports = {
	run: async ({ GoalBot, interaction }) => {
		const donatorRolesMember = interaction.member.roles.filter((r) => GoalBot.config.modRole.includes(r));
		if (donatorRolesMember.length <= 0)
			return interaction.createFollowup("You don't have the required role(s) to run the command.");

		const options = interaction.data.options;
		const goalName = !options ? undefined : await options.find((o) => o.name === 'name').value.toLowerCase();
		const updateAmount = !options ? undefined : await options.find((o) => o.name === 'update').value;

		const doesExist = await GoalBot.DB.getDataById('goal', goalName);
		if (!doesExist) return interaction.createFollowup(`There isn't a goal named **${goalName}**, pick another name.`);

		if (doesExist.goal < updateAmount || updateAmount < 0)
			return interaction.createFollowup(
				`The number **${updateAmount}** is invalid, pick a number between 0 and ${doesExist.goal}.`
			);

		if (doesExist.current === updateAmount)
			return interaction.createFollowup(
				`The goal **${goalName}** is already set to **$${updateAmount}**, pick another number.`
			);

		GoalBot.DB.updateGoal(doesExist, updateAmount)
			? interaction.createFollowup(`The goal named **${goalName}** has been updated to **$${updateAmount}**.`) &&
				GoalBot.logger(
					GoalBot,
					`Update goal succeeded, started by ${interaction.member
						.username} (name: ${goalName}, current: ${updateAmount}).`
				)
			: interaction.createFollowup(
					`Failed to update the goal named **${goalName}** with new amount **$${updateAmount}**.`
				) &&
				GoalBot.logger(
					GoalBot,
					`Update goal failed, started by ${interaction.member
						.username} (name: ${goalName}, current: ${updateAmount}).`,
					'warn'
				);

		updateGoalMessage(interaction, doesExist, updateAmount);
	},
	slashJSON: {
		name: 'updategoal',
		description: 'Update an existing goal',
		options: [
			{
				name: 'name',
				description: 'The name from the goal',
				type: 3,
				required: true,
				focused: false
			},
			{
				name: 'update',
				description: 'The updated number',
				type: 4,
				required: true,
				focused: false
			}
		]
	}
};

const updateGoalMessage = async (interaction, doesExist, updateAmount) => {
	const { _id, goal, channelId, messageId } = doesExist;
	if (!channelId || !messageId) return;

	const goalChannel = await interaction.channel.guild.channels.get(channelId);
	if (!goalChannel) return;

	const goalMessage = await goalChannel.getMessage(messageId);
	if (!goalMessage) return;

	goalMessage.edit(makeEmbed(_id, goal, updateAmount));
};
