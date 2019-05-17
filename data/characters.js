const collections = require("./collections");
const characters = collections.characters;
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

