var fs = require("fs");
var _ = require("lodash");

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
var factions = ["LYON", "SONG", "VETR", "ABYS", "MAGM", "VANA"];

var encodeCard = (card) => {
	var str = "";
	_.each(fields, prop => {
	str += card[prop] + "|";
	});
	return str;
};

var decodeVal = val => {
	if(val === 'null') {
		return null;
	}
	if(!isNaN(Number.parseInt(val))) {
		return Number.parseInt(val);
	}
	return val;
}
var decodeLine = str => {
	var vals = str.split("|", fields.length);
	var card = {};

	card.name = decodeVal(vals[0]);
	var factionId = decodeVal(vals[1]);
	card.faction = factions[factionId -1];
	card.type = decodeVal(vals[2]);
	card.rarity = decodeVal(vals[3]);
	card.race = decodeVal(vals[4]);
	card.cost = decodeVal(vals[5]);
	card.attack = decodeVal(vals[6]);
	card.health = decodeVal(vals[7]);
	card.description = decodeVal(vals[8]);

	return card;
};

var infile = process.argv[2];
var outfile = process.argv[3];
console.log(infile + " -> " + outfile);

var input, output;

if (infile.match(/.*\.json$/)) {
	input = require('./' + infile);
	var cardData = input.cardData;
	lines = _.map(cardData, card => encodeCard(card));

	output = '';
	_.each(lines, line => {
		output += line + '\r\n';
	});
} else {
	input = fs.readFileSync('./' + infile, 'utf8');
	var lines = input.split("\n");

	output = [];
	_.each(lines, line => {
		output.push(decodeLine(line));
	});
	output = JSON.stringify({cards: output});
}

if (outfile) {
	fs.writeFile(outfile, output);
} else {
	console.log(output);
}
