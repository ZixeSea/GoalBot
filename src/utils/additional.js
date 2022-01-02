module.exports = {
	makeEmbed: (name, goal, updateAmount) => {
		const currentPrograss = Math.round(100 / goal * updateAmount);
		return {
			embeds: [
				{
					title: `Name: ${changeName(name)}`,
					color: 5111673,
					fields: [
						{
							name: 'Goal',
							value: `\`\`\`$${goal}\`\`\``,
							inline: true
						},
						{
							name: 'Current',
							value: `\`\`\`$${updateAmount}\`\`\``,
							inline: true
						}
					],
					image: {
						url: `https://old.serverstatsbot.com/bar/${currentPrograss}.png`
					}
				}
			]
		};
	},
	logger: async (GoalBot, message, type, from) => {
		const fullMessage = `${await getDate(new Date())} | [${from || GoalBot.config.name}] ${message}`;

		switch (type) {
			case 'warn':
				console.warn(fullMessage);
				break;
			case 'error':
				console.error(fullMessage);
				break;
			default:
				console.info(fullMessage);
				break;
		}
	},
	timeout: (time) => {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
};

const changeName = (name) => {
	return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
};

const getDate = async (date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${`0${month}`.slice(-2)}/${`0${day}`.slice(-2)}/${year}`;
};
