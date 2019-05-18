/*Chris Paldino, Caleb Obeng, Samantha DeLorenzo, Daniel Maing
I pledge my honor that I have abided by the Stevens Honor System*/
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const userData=require("./data/users");
const charData=require("./data/characters");
const collections = require("./data/collections");
const users=collections.users;
const characters=collections.characters;
const connection=require("./data/connection");
const bcrypt = require ("bcrypt");
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(__dirname+"/public"));

app.use(session({
	name: 'AuthCookie',
	secret: 'thekrustykrabpizzaisthepizzaforyouandme',
	resave: false,
	saveUninitialized: true,
	cookie:{secure:false}}));

app.use(function(req,res,next){
	let x=false;
	if(req.session.userID){x=true;}
	let log={
		CurrentTimestamp:new Date().toUTCString(),
		RequestMethod: req.method,
		IsAuthenticated: x};
	console.log(log);
	next();});

app.use(["/home/","/settings/","/logout/"],function(req,res,next){
	if(!req.session.userID){
		res.status(403).render("../views/bars/denied",{title: "Denied",css:"denied"});}
	else{next();}});

app.get("/",async(req,res)=>{
	try{
		if(req.session.userID){
			res.redirect("/home");}
		else{res.render("../views/bars/register",{title: "Hi!",css:"welcome",js:"register"});}}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.get("/login",async(req,res)=>{
	try{
		if(req.session.userID){
			res.redirect("/home");}
		else{res.render("../views/bars/login",{title: "Hi!",css:"welcome",js:"login"});}}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.post("/register",async(req,res)=>{
	try{
		let username=req.body.username;
		let password=req.body.password;
		let userlist=await userData.getAll();
		for(let i=0;i<userlist.length;i++){
			if (username.toLowerCase()===userlist[i].profile.username.toLowerCase()){
				res.status(401).render("../views/bars/register",
					{title: "Uh-oh",css:"welcome",js:"register",error: "Username is taken!"});
				return;}}
		let x=await userData.create(username,password);
		res.cookie("AuthCookie","yeet");
		req.session.userID=x._id;
		req.session.cookie.expires=false;
		res.redirect("/home");}
	catch(e){res.status(500).json({error: "Internal Server Error"})}});

app.post("/login", async(req, res) => {
	try{
		let username=req.body.username;
		let password=req.body.password;
		let userlist=await userData.getAll();
		for(let i=0;i<userlist.length;i++){
			let comp=await bcrypt.compare(password,userlist[i].hashPass);
			if(username.toLowerCase()===userlist[i].profile.username.toLowerCase() && comp){
				res.cookie("AuthCookie","yeet");
				req.session.userID=userlist[i]._id;
				req.session.cookie.expires=false;
				res.redirect("/home");
				return;}}
		res.status(401).render("../views/bars/login",
			{title: "Uh-oh",css:"welcome",js:"login",error:"Please provide valid login credentials!"});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.get("/home", async(req, res) => {
	try{
		res.render("../views/bars/home",{title: "Home", css: "home",js:"home"});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.get("/settings",async(req,res)=>{
	try{
		let curuser=await userData.get(req.session.userID);
		res.render("../views/bars/settings",{title: "Settings",css:"settings",js:"settings",status:curuser.status,
		username:curuser.profile.username,favChar:curuser.profile.favChar});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.post("/changepassword",async(req,res)=>{
	try{
		let newpass=req.body.newpassword;
		let cpass=req.body.cpassword;
		let oldpass=req.body.password;
		let curuser=await userData.get(req.session.userID);
		let comp=await bcrypt.compare(oldpass,curuser.hashPass);
		if(!comp){
			res.render("../views/bars/settings",{title: "Settings", css:"settings", js:"settings", status:curuser.status, username:curuser.profile.username, favChar:curuser.profile.favChar, result:"Incorrect old password!"});}
		else{
			await userData.changepass(curuser._id,newpass);
			res.render("../views/bars/settings",{title: "Settings", css:"settings", js:"settings", status:curuser.status, username:curuser.profile.username, favChar:curuser.profile.favChar, result:"Success!"});}}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.get("/logout", async(req, res) => {
	try{
		res.cookie("AuthCookie",'',{expires: new Date(0)});
		res.clearCookie("AuthCookie");
		req.session.destroy();
		res.render("../views/bars/bye",{title: "Bye!", css: "bye"});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});


app.get("/details/:id", async (req, res) => {
	try{
		let char = charData[0];
		for(var i=0; i<charData.length; i++){
			if(charData._id === req.params.id){
				char = charData[i];
				break;
			}
		}
		res.render("../views/bars/details", {
			name: char.name,
			altEgo: char.altEgo,
			universe: char.universe,
			nemesis: char.nemesis,
			powers: char.powers.toString(),
			movies: char.films.toString(),
			background: char.background, 
			title: "Person Found"});
	} catch (e) {
		res.status(500).json({error: "Internal Server Error"};
	}
});

app.post("/search", async (req, res) => {
	try{
		let charList = require("./data/heroes_villains");
		let universe = req.body.universe;
		console.log(universe);
		let type = req.body.selectedRadioType;
		console.log(type);
		let value = req.body.personName;
		console.log(value);

		if(type!="name"){
			value = req.body.selectedRadioValue;
		}


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
		/*
		if(!name){
			res.status(400).render("../views/posts/nosearch", {title: "People Found"});
		}
		for(var i=0; i<peopleData.length && foundGents.length < 20; i++){
			if(peopleData[i].firstName.toLowerCase().includes(name.toLowerCase()) || peopleData[i].lastName.toLowerCase().includes(name.toLowerCase())){
				foundGents.push(peopleData[i]);
			}
		}*/
		if(foundGents != []){
			res.render("./views/bars/found", {name: value, people: foundGents, title: "People Found"});
		}
		else{
			res.render("./views/bars/notfound", {name: value, title: "People Found"});
		}
		
	} catch (e) {
		res.status(500).json({error: "Internal Server Error"};
	}
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");});
