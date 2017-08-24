### Encode

Converts JSON data from https://duelyststats.info/scripts/carddata/cardData.json to a simpler text file for RNN

`node encode <infile> <outfile> [--shuffle] [--copies=X]`

`outfile`: Optional. Specifies outfile path and name

`shuffle`: Shuffles result set

`copies`: Repeats the dataset X times. Default 1

### Decode

Decodes text file outputted by RNN back into JSON, as well as a prettier text file

`node decode <infile> <outfile>`

`outfile`: Optional. Specifies outfile path and name

### Interesting Notes

At 1000 iterations...

* Torch-RNN figures out very quickly that many minions are "noun-verbers".
* "Sand", "blood", and "shadow" show up very often. Go figure!