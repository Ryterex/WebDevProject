const collections = require("./collections");
const characters = collections.characters;
//const charList = require("./heroes_villains");
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
/*
async function create(){
	const charCollection = await characters();
	for(var i=0; i< charList.length; i++){
		if(!await charCollection.findOne({ name: charList[i].name})){
			const insertInfo = await charCollection.insertOne(charList[i]);}
		//if (insertInfo.insertedCount === 0){throw "Could not add character";}
	}
}*/

async function update(id, newname, alt, uni, film, enemies, power, bg, moviel, comicl) {
	let f,e,p;
	if (!newname) {newname = "-";}
	if (!alt) {alt = "-";}
	if (!uni) {uni = "-";}
	if (!film) {f = ["-"];}
		else {f = film.split(",");}
	if (!enemies) {e = ["-"];}
		else {e = enemies.split(",");}
	if (!power) {p = ["-"];}
		else {p = power.split(",");}
	if (!bg) {bg = "-";}
	if (!moviel) {moviel = "-";}
	if (!comicl) {comicl = "-";}
	const charCollection = await characters();
	const updateInfo = await charCollection.updateOne({_id: ObjectId(id)},{$set:{name:newname,altEgo:alt,universe:uni,movies:f,nemeses:e,powers:p,background:bg,movieLook:moviel,comicLook:comicl}});
	let char=await get(id);
	return char;}

module.exports = {
	getAll,
	get,
	update
};
