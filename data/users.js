const collections = require("./collections");
const users = collections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require ("bcrypt");

async function getAll() {
	const userCollection = await users();
	const users = await userCollection.find({}).toArray();
	return users;}

async function get(id) {
  	if (!id) {throw "You must provide an id to search for";}
  	const userCollection = await users();
  	const user = await userCollection.findOne({ _id: ObjectId(id)});
  	if (user === null) {return false;}
	return user;}

async function create(name,password){
  	let user = {
		hashPass: bcrypt.hashSync(password,16),
		profile:{
			username: name,
			favChar: ""}};
  	const userCollection=await users();
  	const insertInfo = await userCollection.insertOne(user);}

module.exports = {
    firstName: "Chris",
    lastName: "Paldino",
    studentId: "10412928",
    getAll,
    get,
    create};
