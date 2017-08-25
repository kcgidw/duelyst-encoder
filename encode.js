var _ = require("lodash");
var argv = require('optimist').argv;
var fs = require("fs");
var util = require('./util');

function rateCards(set) {
	return _.map(set, function rate(card) {
		return card.rarity + (card.race ? 3 : 0) + (card.description.length > 20 ? 3 : 0);
	});
}

function encodeCard(card) {
	var str = "";

	// Reformatting the data
	// General becomes its own card type
	if(util.generalIds.indexOf(card.id) !== -1) {
		card.type = 'General';
	}
	// Give Neutral faction a better number
	if(card.factionId === 100) {
		card.factionId = 0;
	}

	//name|faction|type|rarity|race|cost|atk|hp|descr
	_.each(util.fields, prop => {
		str += card[prop] + "|";
	});

	return str;
};

(function go() {
	var infile = argv._[0];
	var shuffle = argv.shuffle;
	var copies = argv.copies || 1;
	var outfile = argv._[1] || infile + '_encoded' + (copies > 1 ? copies + 'x' : '') + '.txt';

	var input = require('./' + infile);
	var cardData = input.cardData;


	// convert each card obj into a line of text

	var lines = _.map(cardData, card => encodeCard(card));
	var lines2 = [];
	for(var i=0; i<copies; i++) {
		lines2 = _.concat(lines2, lines);
	}
	if(shuffle) {
		lines2 = _.shuffle(lines2);
	}

	var output = '';
	_.each(lines2, line => {
		output += line + '\r\n';
	});

	fs.writeFile(outfile, output);
})();