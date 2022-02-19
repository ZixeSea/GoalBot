const { makeEmbed } = require('../../utils/additional');

module.exports = {
	run: async ({ GoalBot, interaction }) => {
		const donatorRolesMember = interaction.member.roles.filter((r) => GoalBot.config.modRole.includes(r));
		if (donatorRolesMember.length <= 0)
			return interaction.createFollowup("You don't have to required role(s) to run the command.");

		const options = interaction.data.options;
		const goalName = !options ? undefined : await options.find((o) => o.name === 'name').value.toLowerCase();
		const newChannelId = !options ? undefined : await options.find((o) => o.name === 'channel').value;

		const doesExist = await GoalBot.DB.getDataById('goal', goalName);
		if (!doesExist) return interaction.createFollowup(`There isn't a goal named **${goalName}**, pick another name.`);

		const goalChannel = interaction.channel.guild.channels.get(newChannelId);
		if (goalChannel.type !== GoalBot.erisConst.ChannelTypes.GUILD_TEXT)
			return interaction.createFollowup(
				`The channel **${goalChannel.name}** isn't a text channel, pick another channel.`
			);

		const { _id, goal, current, channelId } = doesExist;
		if (!channelId) {
			const goalMessage = await goalChannel.createMessage(makeEmbed(_id, goal, current));

			GoalBot.DB.updateGoalMessage(doesExist, goalChannel.id, goalMessage.id)
				? interaction.createFollowup(`Message created for the goal named **${goalName}**.`) &&
					GoalBot.logger(
						GoalBot,
						`Message goal succeeded, started by ${interaction.member.username} (name: ${goalName}).`
					)
				: interaction.createFollowup(`Failed to created a message for the goal named **${goalName}**.`) &&
					GoalBot.logger(
						GoalBot,
						`Message goal failed, started by ${interaction.member.username} (name: ${goalName}).`,
						'warn'
					);
		} else {
			interaction.createFollowup(`there is already a message for the goal named **${goalName}**.`);
		}
	},
	trigger: 'messagegoal'
};
