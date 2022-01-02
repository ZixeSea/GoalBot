module.exports = {
	run: async ({ interaction, cLatency }) => {
		const sLatency = Math.round(interaction.channel.guild.shard.latency);
		interaction.createFollowup({
			embeds: [
				{
					title: 'PONG / LATENCY',
					color: 5111673,
					fields: [
						{
							name: `Client latency`,
							value: `\`\`\`${cLatency} MS\`\`\``,
							inline: true
						},
						{
							name: `Shard latency`,
							value: `\`\`\`${sLatency} MS\`\`\``,
							inline: true
						}
					]
				}
			]
		});
	},
	trigger: 'ping'
};
