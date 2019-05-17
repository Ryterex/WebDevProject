const collections = require("./collections");
const characters = collections.characters;
const charList = require("./heroes_villains");
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
		const insertInfo = await userCollection.insertOne(charList[i]);
		//if (insertInfo.insertedCount === 0){throw "Could not add character";}
	}
}

async function search(type, value) {
	let foundGents = [];
	if(type=="name"){
		for(var i=0; i<charList.length; i++){
			if(charList[i].name.toLowerCase().includes(value.toLowerCase())){
				foundGents.push(charList[i]);
			}
		}
	} else if(type=="power"){
		for(var i=0; i<charList.length; i++){
			for(var j=0; i<charList[i].powers.length; j++){
				if(charList[i].powers[j].toLowerCase().includes(value.toLowerCase())){
					foundGents.push(charList[i]);
					break;
				}
			}
		}
	} else {//type==movie
		for(var i=0; i< charList.length; i++){
			for(var j=0; i<charList[i].powers.length; j++){
				if(charList[i].films[j].toLowerCase().includes(value.toLowerCase())){
					foundGents.push(charList[i]);
					break;
				}
			}
		}
	}
	return foundGents;
}

module.exports = {
	getAll,
	get,
	create,
	search
};