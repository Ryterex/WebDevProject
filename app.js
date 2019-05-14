/*Chris Paldino, Caleb Obeng, Samantha DeLorenzo, Daniel Maing
I pledge my honor that I have abided by the Stevens Honor System*/
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const users = require("./users");
const bcrypt = require ("bcrypt");
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.engine("handlebars", exphbs({ defaultLayout: "result" }));
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
		RequestRoute: req.originalUrl,
		IsAuthenticated: x};
	console.log(log);
	next();});

app.use("/private/",function(req,res,next){
	if(!req.session.userID){
		res.status(403).render("../views/bars/no",{title: "Error 403"});}
	else{next();}});

app.get("/",async(req,res)=>{
	try{
		if(req.session.userID){
			res.redirect("/private");}
		else{res.render("../views/bars/hi",{title: "Hi!",css:"welcome.css"});}}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.post("/login", async(req, res) => {
	try{
		if(!req.body.username || !req.body.password){
			res.status(401).render("../views/bars/bad",{title: "Error 401"});return;}
		for(let i=0;i<users.length;i++){
			let comp=await bcrypt.compare(req.body.password,users[i].hashedPassword);
			if(users[i].username===req.body.username && comp){
				res.cookie("AuthCookie","yeet");
				req.session.userID=i+1;//since 0 is considered bad
				req.session.cookie.expires=false;
				res.redirect("/private");
				return;}}
		res.status(401).render("../views/bars/bad",{title: "Error 401"});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.get("/private", async(req, res) => {
	try{
		let user=users[req.session.userID-1];//since 0 is considered bad
		let name=user.firstName+" "+user.lastName;
		let userlist=[];
		userlist.push(user);
		res.render("../views/bars/good",{title: "Private", personName: name, person: userlist});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.get("/logout", async(req, res) => {
	try{
		res.cookie("AuthCookie",'',{expires: new Date(0)});
		res.clearCookie("AuthCookie");
		req.session.destroy();
		res.render("../views/bars/bye",{title: "Logout"});}
	catch(e){res.status(500).json({error: "Internal Server Error"});}});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");});
