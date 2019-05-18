const collections = require("./collections");
const characters = collections.characters;
const {ObjectId} = require('mongodb');


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