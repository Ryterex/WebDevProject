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
const {ObjectId} = require('mongodb');
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

app.use(["/home/","/settings/"], function(req,res,next){
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
		let fav=curuser.profile.favChar;
		if(fav!=="-"){
			fav=await charData.get(curuser.profile.favChar._id);
			if(fav.altEgo!=="-"){fav=fav.altEgo;}
			else{fav=fav.name;}}
		res.render("../views/bars/settings",{title: "Settings",css:"settings",js:"settings",status:curuser.status,
		username:curuser.profile.username,favChar:fav});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.post("/changepassword",async(req,res)=>{
	try{
		let newpass=req.body.newpassword;
		let cpass=req.body.cpassword;
		let oldpass=req.body.password;
		let curuser=await userData.get(req.session.userID);
		let fav=curuser.profile.favChar;
		if(fav!=="-"){
			fav=await charData.get(curuser.profile.favChar._id);
			if(fav.altEgo!=="-"){fav=fav.altEgo;}
			else{fav=fav.name;}}
		let comp=await bcrypt.compare(oldpass,curuser.hashPass);
		if(!comp){
			res.render("../views/bars/settings",{title: "Settings", css:"settings", js:"settings", status:curuser.status, username:curuser.profile.username, favChar:fav, result:"Incorrect old password!"});}
		else{
			await userData.changepass(curuser._id,newpass);
			res.render("../views/bars/settings",{title: "Settings", css:"settings", js:"settings", status:curuser.status, username:curuser.profile.username, favChar:fav, result:"Success!"});}}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.get("/logout", async(req, res) => {
	try{
		res.cookie("AuthCookie",'',{expires: new Date(0)});
		res.clearCookie("AuthCookie");
		req.session.destroy();
		res.render("../views/bars/bye",{title: "Bye!", css: "bye"});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.post("/favorite",async(req,res)=>{
	try{
		let charCollection=await characters();
		let char=await charCollection.findOne({_id:ObjectId(req.body.favChar)});
		let curuser=await userData.get(req.session.userID);
		await userData.changefav(curuser._id,char);
		if(curuser.status==="Admin"){
			res.render("../views/bars/admin", {
				css: "details",
				id: char._id,
				name: char.name,
				altEgo: char.altEgo,
				universe: char.universe,
				nemesis: char.nemeses.join(', '),
				powers: char.powers.join(', '),
				movies: char.movies.join(', '),
				background: char.background,
				movieLook: char.movieLook,
				comicLook: char.comicLook,
				title: "Details",
				result:"Success!"});}
		else{
			res.render("../views/bars/details", {
				css: "details",
				name: char.name,
				altEgo: char.altEgo,
				universe: char.universe,
				nemesis: char.nemeses.join(', '),
				powers: char.powers.join(', '),
				movies: char.movies.join(', '),
				background: char.background,
				movieLook: char.movieLook,
				comicLook: char.comicLook,
				title: "Details",
				result:"Success!"});}}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.get("/edit/:id",async(req,res)=>{
	try{
		let curuser=await userData.get(req.session.userID);
		if(curuser.status!=="Admin"){
			res.status(403).redirect("/home");
			return;}
		let charCollection=await characters();
		let char=await charCollection.findOne({_id:ObjectId(req.params.id)});
		res.render("../views/bars/edit", {
			css: "details",
			id: char._id,
			name: char.name,
			altEgo: char.altEgo,
			universe: char.universe,
			movies: char.movies.join(', '),
			nemeses: char.nemeses.join(', '),
			powers: char.powers.join(', '),
			background: char.background,
			movieLook: char.movieLook,
			comicLook: char.comicLook,
			title: "Details"});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.post("/edit",async(req,res)=>{
	try{
		let onam=req.body.oldName;
		let name=req.body.name;
		let ego=req.body.altEgo;
		let uni=req.body.universe;
		let mov=req.body.movies;
		let nem=req.body.nemeses;
		let pow=req.body.powers;
		let bak=req.body.background;
		let mol=req.body.movieLook;
		let col=req.body.comicLook;
		let char=await charData.update(onam,name,ego,uni,mov,nem,pow,bak,mol,col);
		res.render("../views/bars/admin", {
			css: "details",
			id: char._id,
			name: char.name,
			altEgo: char.altEgo,
			universe: char.universe,
			movies: char.movies.join(', '),
			nemeses: char.nemeses.join(', '),
			powers: char.powers.join(', '),
			background: char.background,
			movieLook: char.movieLook,
			comicLook: char.comicLook,
			title: "Details"});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.get("/details/:id", async (req, res) => {
	try{
		let chars = await charData.getAll();
		let char = chars[0];
		for(var i=0; i<chars.length; i++){
			if(chars[i]._id == req.params.id){
				char = chars[i];
				break;
			}
		}
		let curuser=await userData.get(req.session.userID);
		if(curuser.status==="Admin"){
			res.render("../views/bars/admin", {
				css: "details",
				name: char.name,
				id: char._id,
				altEgo: char.altEgo,
				universe: char.universe,
				movies: char.movies.join(', '),
				nemeses: char.nemeses.join(', '),
				powers: char.powers.join(', '),
				background: char.background,
				movieLook: char.movieLook,
				comicLook: char.comicLook,
				title: "Details"});}
		else{
			res.render("../views/bars/details", {
				css: "details",
				name: char.name,
				id: char._id,
				altEgo: char.altEgo,
				universe: char.universe,
				movies: char.movies.join(', '),
				nemeses: char.nemeses.join(', '),
				powers: char.powers.join(', '),
				background: char.background,
				movieLook: char.movieLook,
				comicLook: char.comicLook,
				title: "Details"});}
	} catch (e) {
		res.status(500).json({error: "Internal Server Error"});
	}
});

app.post("/search", async (req, res) => {
	try{
		let chars = await charData.getAll();
		let universe = req.body.universe;
		let type = req.body.selectedRadioType;
		let value = req.body.selectedRadioValue;
		let foundGents = [];
		if(type==="name"){
			for(var i=0; i<chars.length; i++){
				if(chars[i].universe.toLowerCase()===universe.toLowerCase() && (chars[i].name.toLowerCase().includes(value.toLowerCase()) || chars[i].altEgo.toLowerCase().includes(value.toLowerCase()))){
					foundGents.push(chars[i]);
				}
			}
		}
		else if(type==="power"){
			for(var i=0; i<chars.length; i++){
				for(var j=0; j<chars[i].powers.length; j++){
					if(chars[i].universe.toLowerCase()===universe.toLowerCase() && chars[i].powers[j].toLowerCase().includes(value.toLowerCase())){
						foundGents.push(chars[i]);
						break;
					}
				}
			}
		} else if(type==="movie"){
			for(var i=0; i< chars.length; i++){
				for(var j=0; j<chars[i].movies.length; j++){
					if(chars[i].universe.toLowerCase()===universe.toLowerCase() && chars[i].movies[j].toLowerCase().includes(value.toLowerCase())){
						foundGents.push(chars[i]);
						break;
					}
				}
			}
		}

		res.render("../views/bars/results", {name: value, css: "results", title: "Results",result: foundGents});


	} catch (e) {
		res.status(500).json({error: "Internal Server Error"});
	}
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");});
