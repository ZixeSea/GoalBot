const config = require('./main/config');
const GoalBot = require('./main/Bot');

const logo = require('asciiart-logo');
const evn = require('../node_modules/eris/package.json');
console.info(
	logo({
		name: config.name || 'GoalBot',
		font: 'Big',
		padding: 5,
		margin: 3
	})
		.emptyLine()
		.center(`Eris (V${evn.version})`)
		.center(`GoalBot (V${config.pkg.version})`)
		.render()
);

const goalBot = new GoalBot();
goalBot.setup();
