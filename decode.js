var _ = require("lodash");
var argv = require('optimist').argv;
var fs = require("fs");
var util = require('./util');

function decodeVal(val) {
	if(val === 'null') {
		return null;
	}
	if(!isNaN(Number.parseInt(val))) {
		return Number.parseInt(val);
	}
	return val;
}

function decodeLine(str) {
	var vals = str.split("|", util.fields.length);

	if(vals.length < util.fields.length) {
		return undefined;
	}

	var card = {
		name:		decodeVal(vals[0]),
		factionId:	decodeVal(vals[1]),
		type:		decodeVal(vals[2]),
		rarity:		decodeVal(vals[3]),
		race:		decodeVal(vals[4]),
		cost:		decodeVal(vals[5]),
		attack:		decodeVal(vals[6]),
		health:		decodeVal(vals[7]),
		description:decodeVal(vals[8]),
	};
	card.faction = util.factions[card.factionId];
	card.rarityName = util.rarities[card.rarity];

	return card;
}

function prettyText(cards) {
	var txt = '';
	_.each(cards, (card) => {
		txt += '' + card.name.toUpperCase() + '\r\n'
			+ card.faction + ' ' + card.type + ' ' + card.race + (card.race ? ' ' : '')
				+ '(' + _.repeat('*', card.rarity) + card.rarityName + ')\n'
			+ card.cost + '\n'
			+ (card.attack || card.health ? card.attack + '/' + card.health + '\n' : '')
			+ card.description + '\n\n\n'
	});
	return txt;
}

(function go() {
	var infile = argv._[0];
	var writeJson = argv.json;
	var outfileDecoded = argv._[1] || infile + '_decoded.json';
	var outfilePretty = argv._[1]  || infile + '_pretty.txt';

	fs.readFile('./' + infile, 'utf8', (err, input) => {
		if(err) throw err;

		var lines = input.split("\n");

		var cards = _.map(lines, (ln) => decodeLine(ln));
		_.remove(cards, (card) => (card === undefined));

		var cardsJson = JSON.stringify({cards: cards}, null, 2);
		if(writeJson) fs.writeFile(outfileDecoded, cardsJson);

		var cardsPretty = prettyText(cards);
		fs.writeFile(outfilePretty, cardsPretty);
	});
})();