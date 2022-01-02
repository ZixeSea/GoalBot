const { connect } = require('mongoose');

class DB {
	constructor(Helper) {
		this.Helper = Helper;
		this.dbOptions = Helper.config.dbOptions;
		this.models = {
			goal: require('./models/goals')
		};
	}

	async getDataById(collection, id) {
		return await this.models[collection].findById(id).catch(() => {
			this.Helper.logger(this.Helper, 'Failed to run getDataById in DB.', 'error', 'MongoDB');
		});
	}

	async createGoal(name, goalAmount) {
		const goal = new this.models['goal']({
			_id: name,
			goal: goalAmount,
			current: 0
		});

		return await goal
			.save()
			.then(() => {
				return true;
			})
			.catch(() => {
				this.Helper.logger(this.Helper, 'Failed to run createGoal in DB.', 'error', 'MongoDB');
				return false;
			});
	}

	async updateGoal(goalData, currentAmount) {
		goalData.current = currentAmount;

		return await goalData
			.save()
			.then(() => {
				return true;
			})
			.catch(() => {
				this.Helper.logger(this.Helper, 'Failed to run updateGoal in DB.', 'error', 'MongoDB');
				return false;
			});
	}

	async updateGoalMessage(goalData, channelId, messageId) {
		goalData.channelId = channelId;
		goalData.messageId = messageId;

		return await goalData
			.save()
			.then(() => {
				return true;
			})
			.catch(() => {
				this.Helper.logger(this.Helper, 'Failed to run updateGoalMessage in DB.', 'error', 'MongoDB');
				return false;
			});
	}

	async deleteGoal(id) {
		return await this.models['goal']
			.findByIdAndDelete(id)
			.then(() => {
				return true;
			})
			.catch(() => {
				this.Helper.logger(this.Helper, 'Failed to run deleteGoal in DB.', 'error', 'MongoDB');
				return false;
			});
	}

	async connect() {
		return await connect(`mongodb://${this.dbOptions.host}/${this.dbOptions.db}`, this.dbOptions.mongoOptions)
			.then(() => {
				this.Helper.logger(
					this.Helper,
					`Connected to the database (${this.dbOptions.db}).`,
					undefined,
					'MongoDB'
				);
				return true;
			})
			.catch((err) => {
				this.Helper.logger(
					this.Helper,
					`Couldn't connect with ${this.dbOptions.host || 'Unknown'}, ${err.message}. (${err.stack}).`,
					'error',
					'MongoDB'
				);
				return false;
			});
	}
}

module.exports = DB;
