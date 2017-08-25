**See 'GALLERY.txt' for a nice selection of RNN-generated Duelyst cards!**

You can see the "pretty" files in the samples/ folder for the full results.

## Intro

I know extremely little about machine learning. I'm just using https://github.com/jcjohnson/torch-rnn and following the instructions!

**duelyst-rnn-encoder** is only here for encoding JSON data from https://duelyststats.info/scripts/carddata/cardData.json to a simpler text file for RNN. You should be able to tweak the code for other card games pretty easily.

## Encode

`node encode <infile> <outfile> [--shuffle] [--copies=X]`

`outfile`: Optional. Specifies outfile path and name

`shuffle`: Shuffles result set

`copies`: Repeats the dataset X times. Default 1

## Decode

Decodes text file outputted by RNN back into JSON, as well as a prettier text file

`node decode <infile> <outfile> [--json]`

`outfile`: Optional. Specifies outfile path and name

`json`: Creates a json file along with the text file.

## Journal

At ~1000 iterations...

* Torch-RNN figures out very quickly that many minions are "noun-verbers".
* "Sand", "blood", and "shadow" show up very often. Go figure!

At ~5000 iterations...

* Looks like towards the end of the training, the NN gets less creative. I should limit the number of "boring" cards in the dataset and maybe play around w/ dropout too.
* It has a hard time understanding that certain things belong to certain factions/tribes... I might experiment with a new encoding format that would add more weight to factions/tribes.
* The NN still has a heavy bias toward Neutral minions. Not sure how to counteract this.

Torch-RNN train:

`th train.lua -input_h5 mydata.h5 -input_json mydata.json -gpu -1 -rnn_size 256 -num_layers 3 -dropout 0.5`

Sample:

`th sample.lua -checkpoint [checkpt file] -length 5000 -gpu -1 -temperature [temp] > ../duelyst-rnn-encoder/my_output.txt`

My standard filenaming scheme:

`t[temperature]c[checkpoint]d[dropout]`
`c[checkpoint]t[temperature]`