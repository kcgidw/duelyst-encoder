var fs = require("fs");
var _ = require("lodash");
var argv = require('optimist').argv;

/* */

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
};
var decodeLine = str => {
	var vals = str.split("|", fields.length);

	if(vals.length < fields.length) {
		return undefined;
	}

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

/* */

var infile = argv._[0];
var outfile = argv._[1];
var shuffle = argv.shuffle;
var copies = argv.copies || 1;
//console.log(argv);

var input, output, action;

if (infile.match(/.*\.json$/)) {
	action = 'ENCODE';

	input = require('./' + infile);
	var cardData = input.cardData;
	lines = _.map(cardData, card => encodeCard(card));

	if(copies > 1) {
		var lines2 = [];
		for(var i=0; i<copies; i++) {
			lines2 = _.concat(lines, lines2);
		}
		lines = lines2;
	}
	if(shuffle) {
		lines = _.shuffle(lines);
	}

	output = '';
	_.each(lines, line => {
		output += line + '\r\n';
	});
	
} else {
	action = 'DECODE';

	input = fs.readFileSync('./' + infile, 'utf8');
	var lines = input.split("\r\n");

	if(shuffle) {
		lines = _.shuffle(lines);
	}

	output = [];
	_.each(lines, line => {
		var decodedLine = decodeLine(line);
		if(decodedLine) {
			output.push(decodedLine);
		}
	});

	output = JSON.stringify({cards: output}, null, 2);
}

if (outfile) {
	fs.writeFile(outfile, output);
} else {
	console.log(output);
}

console.log(action + ' ' + infile + " -> " + outfile);