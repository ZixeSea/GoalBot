module.exports = {
	run: async ({ interaction, latency }) => {
		const sLatency = Math.round(interaction.channel.guild.shard.latency);
		interaction.createFollowup({
			embeds: [
				{
					title: 'PONG / LATENCY',
					color: 5111673,
					fields: [
						{
							name: `Client latency`,
							value: `\`\`\`${latency} MS\`\`\``,
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
	slashJSON: { name: 'ping', description: 'This will shows the latency for the client and the shard.' }
};
