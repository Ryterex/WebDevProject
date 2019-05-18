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
		if(!await charCollection.findOne({ name: charList[i].name})){
			const insertInfo = await charCollection.insertOne(charList[i]);}
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

async function update(ogname, newname, alt, uni, film, enemies, power, bg, moviel, comicl) {

	if (newname === undefined) {
		newname = "";
	}

	if (alt === undefined) {
		alt = "";
	}

	if (uni === undefined) {
		uni = "";
	}

	if (film === undefined) {
		film = [];
	} else {
		let f = [];
		f = film.split(",");
	}

	if (enemies === undefined) {
		enemies = [];
	} else {
		let e = [];
		e = enemies.split(",");
	}

	if (power === undefined) {
		power = [];
	} else {
		let p = [];
		p = power.split(",");
	}

	if (bg === undefined) {
		bg = "";
	}

	if (moviel === undefined) {
		moviel = "";
	}

	if (comicl === undefined) {
		comicl = "";
	}

	const characterCollection = await characters();

	const updatedCharacter = {
		name: newname,
		altEgo: alt,
		universe: uni,
		films: f,
		nemeses: e,
		powers: p,
		background: bg,
		movieLook: moviel,
		comicLook: comicl
	};

	const updateInfo = await characterCollection.updateOne({name: ogname}, updatedCharacter);
	if (updateInfo.modifiedCount === 0) {
		throw "Could not update successfully.";
	}
}
module.exports = {
	getAll,
	get,
	create,
	search
};
