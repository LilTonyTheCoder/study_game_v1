const regularMissions = require('./missions/regularMissions');
const specialMissions = require('./missions/specialMissions');
const allItems = require('./missions/items');

const missionsNew = {
	currentRegularMission: '02df7b36b',
	regularMissions,
	specialMissions,
	allItems
};

module.exports = missionsNew;
