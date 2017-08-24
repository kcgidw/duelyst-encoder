`node cards infile_path outfile_path --shuffle --copies X`

If infile is JSON, will encode into txt. Else, will decode into JSON.

If outfile unspecified, will print to stdout.

See datafiles/ folder for example input and output files.

Shuffle: Shuffles the resulting data

Copies: Repeats the data X times. Only applies to encoding

Data taken from https://duelyststats.info/scripts/carddata/cardData.json