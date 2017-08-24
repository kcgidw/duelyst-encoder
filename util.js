var fields = [
	"name",
	"factionId",
	"type",
	"rarity",
	"race",
	"cost",
	"attack",
	"health",
	"description"
];

var factions = {
	1: 'Lyonar',
	2: 'Songhai',
	3: 'Vetruvian',
	4: 'Abyssian',
	5: 'Magmar',
	6: 'Vanar',
	100: 'Neutral',
	0: 'Netural'
};

var generalIds = [1, 101, 201, 301, 401, 501, 601];

var rarities = ['basic', 'common', 'rare', 'epic', 'legendary'];

module.exports = {
	fields, factions, generalIds, rarities
};