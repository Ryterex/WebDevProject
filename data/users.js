const collections = require("./collections");
const users = collections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require ("bcrypt");

async function getAll() {
	const usCollection = await users();
	const uss = await usCollection.find({}).toArray();
	return uss;}

async function get(id) {
  	if (!id) {throw "You must provide an id to search for";}
  	const userCollection = await users();
  	const user = await userCollection.findOne({ _id: ObjectId(id)});
  	if (user === null) {return false;}
	return user;}

async function create(name,password){
	let admin=0;
	if(name==='MrStark'){admin=1;}
  	let user = {
		hashPass: bcrypt.hashSync(password,16),
		admin: 0,
		profile:{
			username: name,
			favChar: ""}};
  	const userCollection=await users();
  	const insertInfo = await userCollection.insertOne(user);
	if (insertInfo.insertedCount === 0) {throw "Could not add animal";}
  	const newId = insertInfo.insertedId;
  	const us = await get(newId);
  	return us;}

module.exports = {
    firstName: "Chris",
    lastName: "Paldino",
    studentId: "10412928",
    getAll,
    get,
    create};
