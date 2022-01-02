const { timeout } = require('./additional');

module.exports = async (GoalBot) => {
	GoalBot.client.createGuildCommand(
		GoalBot.config.guild,
		{ name: 'ping', description: 'This will shows the latency for the client and the shard.' },
		1
	);

	timeout(2000);
	GoalBot.client.createGuildCommand(
		GoalBot.config.guild,
		{
			name: 'creategoal',
			description: 'Create a new goal',
			options: [
				{
					name: 'name',
					description: 'The name for the goal',
					type: 3,
					required: true,
					focused: false
				},
				{
					name: 'goal',
					description: 'The goal amount (in $)',
					type: 4,
					required: true,
					focused: false
				}
			]
		},
		1
	);

	timeout(2000);
	GoalBot.client.createGuildCommand(
		GoalBot.config.guild,
		{
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
		},
		1
	);

	timeout(2000);
	GoalBot.client.createGuildCommand(
		GoalBot.config.guild,
		{
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
		},
		1
	);

	timeout(2000);
	GoalBot.client.createGuildCommand(
		GoalBot.config.guild,
		{
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
		},
		1
	);

	timeout(2000);
	GoalBot.client.createGuildCommand(
		GoalBot.config.guild,
		{
			name: 'messagegoal',
			description: 'Show info baout a goal',
			options: [
				{
					name: 'name',
					description: 'The name from the goal',
					type: 3,
					required: true,
					focused: false
				},
				{
					name: 'channel',
					description: 'Channel to create the message in',
					type: 7,
					required: true,
					focused: false
				}
			]
		},
		1
	);
};
