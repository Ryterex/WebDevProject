const collections = require("./collections");
const characters = collections.characters;
const charList = require("./heroes_villians");
const {ObjectId} = require('mongodb');

async function getAll() {
	const charCollection = await characters();
	const chars = await charCollection.find({}).toArray();
	return chars;}

async function get(id) {
  	if (!id) {throw "You must provide an id to search for";}
  	const charCollection = await characters();
  	const char = await charCollection.findOne({ _id: ObjectId(id)});
  	if (char === null) {return false;}
	return char;}

async function create(){
	const charCollection = await characters();
	for(var i=0; i< charList.length; i++){
		const insertInfo = await userCollection.insertOne(characters[i]);
		if (insertInfo.insertedCount === 0){throw "Could not add character";}
	}
}

module.exports = {
	getAll,
	get,
	create
};