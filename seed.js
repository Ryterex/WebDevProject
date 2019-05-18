const userData=require("./data/users");
const charData=require("./data/characters");
const collections = require("./data/collections");
const users=collections.users;
const characters=collections.characters;
const connection=require("./data/connection");
const bcrypt = require ("bcrypt");
async function main(){
	const db=await connection();
	db.collection('users').drop();
	db.collection('characters').drop();
	await db.collection('users').insertMany([
		{hashPass:bcrypt.hashSync("iamironman",16),
			status: "Admin",
			profile:{
				username: "MrStark",
				favChar: "-"}},
		{hashPass:bcrypt.hashSync("hailhydra",16),
			status: "Standard User",
			profile:{
				username: "BaronZemo",
				favChar: "-"}}]);
	await db.collection('characters').insertMany([
    {
        name: "Orm Marius",
        altEgo: "Ocean Master",
        universe:"DC",
        movies: ["Aquaman"],
        nemeses: ["Aquaman"],
        powers: ["Skilled fighter","Heightened senses","Super strength","Atlantean"],
        background: "Serving as Atlantis' king, Ocean Master wanted to unite the four remaining kingdoms of Atlantis in a war against the surface. Orm's aspirations led to his advisor Vulko and fiance Mera plotting against him with Aquaman (Orm's older half-brother) to prevent a catastrophic war between land and sea.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/e/e9/Aquaman_King_Orm_Character_Textless_Poster.jpg/revision/latest?cb=20181123170021",
        comicLook: "https://upload.wikimedia.org/wikipedia/en/3/33/Ocean_Master_Aquaman_Vol_7_14.png"
    },
    {
        name: "Tony Stark",
        altEgo: "Iron Man",
        universe:"Marvel",
        movies: ["Iron Man", "The Incredible Hulk", "Iron Man 2", "The Avengers", "Iron Man 3", "Avengers: Age of Ultron", "Captain America: Civil War", "Spider-Man: Homecoming", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Iron Monger", "Whiplash", "Thanos", "Justin Hammer", "Aldrich Killian"],
        powers: ["Projectiles","Flight"],
        background: "Anthony Edward \"Tony\" Stark was a billionaire industrialist, a founding member of the Avengers, and the former CEO of Stark Industries, a company originally started by his father, Howard Stark. A brash but brilliant inventor, Stark was self-described as a genius, billionaire, playboy and philanthropist. With his great wealth and exceptional technical knowledge, Stark was one of the world's most powerful men, and enjoyed the playboy lifestyle for many years until he was kidnapped by the Ten Rings in Afghanistan, while demonstrating a fleet of Jericho missiles. With his life on the line, Stark created an armored suit which he used to escape his captors, returning home and becoming known as an Iron Man, battling against terrorists as well as Obadiah Stane. Stark enjoyed the fame that came with his new secret identity and decided to share it with the world, publicly announcing himself as Iron Man.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/3/35/IronMan-EndgameProfile.jpg/revision/latest?cb=20190423175213",
        comicLook: "http://www.comiclist.com/media/blogs/news/FCBD_IMTHOR_Cover.jpg"
    },
    {
        name: "Peter Parker",
        altEgo: "Spider-Man",
        universe:"Marvel",
        movies: ["Captain America: Civil War", "Spider-Man: Homecoming", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Vulture"],
        powers: ["Heightened senses","Super strength","Wall climbing"],
        background: "Peter Benjamin Parker is a high school student who gained spider-like abilities, fighting crime across New York City as the alter ego of Spider-Man, hoping some day he'll live up to his heroes in the Avengers. While Parker juggled all his continued superhero duties with the demands of his high-school life, he was approached by Tony Stark who recruited Spider-Man to join the Avengers Civil War, putting Spider-Man into the brief conflict with his personal hero, Captain America. Parker then agreed and was given his new suit as well as brand new Stark technology in exchange for all his help.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/b/b0/Spider-Man_FFH_Profile.jpg/revision/latest?cb=20190326110737",
        comicLook: "https://d1466nnw0ex81e.cloudfront.net/n_iv/600/1058637.jpg"
    },
    {
        name: "Steve Rogers",
        altEgo: "Captain America",
        universe:"Marvel",
        movies: ["Captain America: The First Avenger", "The Avengers", "Captain America: The Winter Soldier", "Avengers: Age of Ultron", "Captain America: Civil War", "Spider-Man: Homecoming","Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Red Skull"],
        powers: ["Skilled fighter","Heightened senses","Super strength"],
        background: "Captain Steven Grant \"Steve\" Rogers is a World War II veteran, a founding member of the Avengers, and Earth's first known superhero. Rogers had suffered from numerous health problems, and upon America's entry into World War II, was rejected from military service despite several attempts to enlist. Rogers was the only recipient of the Super Soldier Serum developed by Abraham Erskine under the Strategic Scientific Reserve. Determined to serve, Rogers ultimately volunteered for the Project Rebirth, which enhanced the frail Rogers' body to the peak of human physicality. Mistrusted by Colonel Chester Phillips, the head of the SSR, Rogers was relegated to propaganda campaigns, and was given the new moniker of Captain America. Rogers later joined the war with a combat role after he single-handedly liberated captured Allied prisoners of war.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/d/d7/CapAmerica-EndgameProfile.jpg/revision/latest?cb=20190423175339",
        comicLook: "https://upload.wikimedia.org/wikipedia/en/9/91/CaptainAmerica109.jpg"
    },
    {
        name: "Dru-Zod",
        altEgo: "General Zod",
        universe:"DC",
        movies: ["Man of Steel", "Batman v Superman: Dawn of Justice"],
        nemeses: ["Superman"],
        powers: ["Super speed","Super strength","Flight","Eye lasers","Skilled fighter","Kryptonian"],
        background: "General Zod was a Kryptonian war criminal and former leader of the Warrior Guild who later founded the Sword of Rao, leading them during the events of the Kryptonian Civil War. Managing to survive the destruction of his native planet of Krypton and escaping from his Phantom Zone imprisonment, he viewed the purpose of his life to be the successful re-establishment of Krypton on another planet. General Zod was the first great enemy of the hero Superman, who ultimately defeated and killed him in combat after a prolonged devastating duel in the heart of Metropolis, during the Battle of Metropolis Zod notably killed many Wayne Enterprises employees before going down.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/0/01/General_Zod.jpg/revision/latest?cb=20170122014831",
        comicLook: "https://upload.wikimedia.org/wikipedia/en/1/14/General_Zod_SS_vol_5_17.png"
    },
    {
        name: "Bruce Wayne",
        altEgo: "Batman",
        universe:"DC",
        movies: ["Batman v Superman: Dawn of Justice", "Suicide Squad", "Justice League"],
        nemeses: ["Joker", "Penguin"],
        powers: ["Skilled fighter","Detective","Heightened senses"],
        background: "Bruce Wayne is the CEO of Wayne Enterprises and the vigilante operating in Gotham City, New Jersey known as the Batman. After witnessing the murder of his parents at the hands of a mugger as a child, Bruce waged a war on crime in Gotham City for over 20 years before the Battle of Metropolis. Over the years, Bruce encountered numerous foes, most notably the Penguin and the Joker. He also mentored Jason Todd to aid him as Robin, though Todd was eventually killed by the Joker and his doctor-turned-partner, Harley Quinn.",
        movieLook: "http://static1.comicvine.com/uploads/original/11113/111131285/5373176-7256544574-47432.jpg",
        comicLook: "https://static1.squarespace.com/static/5106cf89e4b04827cc5fc5bb/t/5745aaaec2ea51621122d51d/1464183476327/?format=1000w"
    },
    {
        name: "Joker",
        altEgo: "-",
        universe:"DC",
        movies: ["Suicide Squad"],
        nemeses: ["Batman"],
        powers: ["-"],
        background: "The Joker is an infamously extreme and formidable psychopathic crime lord from Gotham City, being at the very top of the city's criminal underworld, greatly feared by other crime bosses. Devoid of empathy or pity for anybody taking part in his wicked schemes either by intimidation or fraud, the Joker does, however, adore his girlfriend and partner in crime Harley Quinn, doing his utmost to rescue her from the Suicide Squad and clutches of Amanda Waller, with eventual success. The Joker is also the long-time arch nemesis of Batman, and the murderer of the latter's protege Robin along with Harley Quinn.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/0/00/Joker_empire_cover_no_text.png/revision/latest?cb=20160117225032",
        comicLook: "https://cdn1.thr.com/sites/default/files/imagecache/scale_crop_768_433/2013/08/joker_illustration_dc_a_l.jpg"
    },
    {
        name: "Clark Kent",
        altEgo: "Superman",
        universe:"DC",
        movies: ["Man of Steel", "Batman v Superman: Dawn of Justice", "Justice League", "Shazam!"],
        nemeses: ["Lex Luther", "General Zod", "Doomsday"],
        powers: ["Super strength","Super Speed", "Flight", "Frost Breath", "Heightened senses","Kryptonian", "Eye lasers"],
        background: "Clark Joseph Kent, born with the Kryptonian name Kal-El, is an incredibly powerful alien superhero of the House of El, one of the extremely few survivors of the destruction of Krypton, and an investigative reporter of the Daily Planet. In addition, Kal-El is the first Kryptonian of natural birth in centuries and the host of the Growth Codex and the leader of the Justice League.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/6/6b/Henry_Cavill_as_Superman.png/revision/latest?cb=20181121235327",
        comicLook: "https://upload.wikimedia.org/wikipedia/en/a/a9/Cover_of_Superman_Comic_1st_Edition_-_Summer_1939.jpg"
    },
    {
        name: "King T'Challa",
        altEgo: "Black Panther",
        universe:"Marvel",
        movies: ["Captain America: Civil War", "Black Panther", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Killmonger"],
        powers: ["Skilled fighter","Heightened senses"],
        background: "T'Challa is the King of the African nation of Wakanda, and the son of T'Chaka and Ramonda. As the Wakandan monarch, he was also the former holder of the Black Panther mantle. After his father was killed in a bombing attack orchestrated by Helmut Zemo, the new monarch set out to kill the Winter Soldier, who was widely believed to be responsible for the attack. After being drawn into the Avengers Civil War and siding with Iron Man, T'Challa learned the truth about Zemo's deception and decided to help the Winter Soldier by granting him asylum in Wakanda and helping him get a cure for his HYDRA mental programming.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/9/99/Black_Panther_AIW_Profile.jpg/revision/latest?cb=20180518212436",
        comicLook: "https://images-na.ssl-images-amazon.com/images/I/51hkuJy3K6L.jpg"
    },
    {
        name: "Thor Odinson",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Thor", "The Avengers", "Thor: The Dark World", "Avengers: Age of Ultron", "Thor: Ragnarok", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Loki", "Thanos"],
        powers: ["Asgardian","Super strength","Skilled fighter","God of Thunder"],
        background: "Thor Odinson is the former king of Asgard and New Asgard, a founding member of the Avengers, and the God of Thunder. When his irresponsible and impetuous behavior reignited a conflict between Asgard and Jotunheim, Thor was denied the right to become king, stripped of his power, and banished by his father Odin to Earth. While exiled on Earth, Thor learned humility, finding love with Jane Foster, and helping to save his new friends from a destructive threat sent by his adoptive brother Loki. Due to his selfless act of sacrifice, Thor redeemed himself in his father's eyes and was granted his power once more, which he then used to defeat Loki's schemes of genocide.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/1/13/Thor-EndgameProfile.jpg/revision/latest/scale-to-width-down/310?cb=20190423174911",
        comicLook: "https://upload.wikimedia.org/wikipedia/en/4/41/Thor-272.jpg"
    },
	{
		name:"Obadiah Stane",
		altEgo:"Iron Monger",
		universe:"Marvel",
		movies: "Iron Man",
		nemeses:["Iron Man"],
		powers: ["Projectiles","Flight"],
		background: "Tony Stark's second in command, Obadiah tried to take over Stark Industries and embrace the company as a weapons dealer. He eventually builds his own exo-suit to challenge Tony for the fate of Stark Industries",
		movieLook:"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiD1dC7zqDiAhWLrVkKHT5uCRQQjRx6BAgBEAU&url=https%3A%2F%2Fwww.amazon.com%2FHot-Toys-Masterpiece-Action-Figure%2Fdp%2FB005Q7T5YO&psig=AOvVaw3m1GWS6G98e6SNiEUykqZN&ust=1558115436515049",
		comicLook: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/IronMonger.jpg/230px-IronMonger.jpg"
	},
	{
		name: "Bruce Banner",
		altEgo:"Hulk",
		universe:"Marvel",
		movies: ["The Incredible Hulk","The Avengers","Avengers: Age of Ultron","Thor: Ragnarok","Avengers: Infinity War","Avengers: Endgame"],
		nemeses:["Abomination"],
		powers: ["Super strength"],
		background: "After being exposed to gamma radiation, Bruce Banner becomes the incredible Hulk which grants him super strength but a very dangerous temper. Banner must learn how to balance the monster within with being a true hero",
		movieLook: "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/06/15/Pictures/_1caf1900-7098-11e8-bbf6-b72314b60444.jpg",
		comicLook:"https://static.comicvine.com/uploads/scale_small/14/140903/4127149-11.jpg"
	},
	{
		name:"Emil Blonsky",
		altEgo:"Abomination",
		universe:"Marvel",
		movies:["The Incredible Hulk"],
		nemeses:["Hulk"],
		powers:["Super strength"],
		background:"A Russian-born office lusting for Hulk's power, Blonsky volunteers to undergo experiments involving numerous serums that transform into a creature more powerful than the Hulk known as Abomination",
		movieLook:"https://oyster.ignimgs.com/mediawiki/apis.ign.com/marvel-studios-cinematic-universe/9/99/The_Abomination.png?width=640",
		comicLook:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Abomination_%28Emil_Blonsky%29.jpg/250px-Abomination_%28Emil_Blonsky%29.jpg"
	},
	{
		name: "James Rhodes",
		altEgo:"War Machine",
		universe:"Marvel",
		movies:["Iron Man", "Iron Man 2","Iron Man 3","Avengers: Age of Ultron","Captain America: Civil War","Avengers: Infinity War", "Avengers:Endgame"],
		nemeses:["-"],
		powers: ["Projectiles","Flight"],
		background:"An officer in the U.S. Air Force and Tony Stark's close personal friend who later operates the War Machine armor.",
		movieLook:"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/6/60/War_Machine_Armor_%28Mark_IV%29.png/revision/latest?cb=20181230180717",
		comicLook:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/29069/MAR082270_1._SX360_QL80_TTD_.jpg"
	},
	{
		name:"Natasha Romanoff" ,
		altEgo:"Black Widow",
		universe:"Marvel",
		movies:["Iron Man 2","The Avengers","Captain America: The Winter Solider", "Avengers: Age of Ultron","Captain America:Civil War","Avengers: Infinity War","Avengers:Endgame"],
		nemeses:["-"],
		powers:["Skilled fighter","Heightened senses"],
		background:"An undercover spy for shield with a mysterious past, Natasha becomes an integral member of the Avengers helping recruit Tony Stark and helping Steve Rogers find the Winter Solider",
		movieLook:"https://i2.wp.com/metro.co.uk/wp-content/uploads/2018/07/black-widow.jpg?quality=90&strip=all&zoom=1&resize=540%2C338&ssl=1",
		comicLook:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/736672/736672._SX360_QL80_TTD_.jpg"
	},
	{
		name:"Justin Hammer",
		altEgo: "-",
		universe:"Marvel",
		movies:["Iron Man 2"],
		nemeses:["Iron Man"],
		powers:["-"],
		background:"A rival weapons dealer, Hammer works with Ivan Vanko (Whiplash) to destroy Tony Stark",
		movieLook:"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/b/b1/Iron_man_2_50.jpg/revision/latest?cb=20141204045154",
		comicLook:"https://vignette.wikia.nocookie.net/marveldatabase/images/b/b9/Justin_Hammer_%28Earth-20051%29.jpg/revision/latest?cb=20131123181035"
	},
	{
		name:"Ivan Vanko" ,
		altEgo:"Whiplash",
		universe:"Marvel",
		movies:["Iron Man 2"],
		nemeses:["Iron Man"],
		powers:["-"],
		background:"A Russian physicist and ex-convict who builds a pair of arc reactor-based electric whips to exact vengeance on the Stark family. The character is an amalgam of Whiplash and Crimson Dynamo",
		movieLook:"https://corchaosis.ru/img/SuperHeroes/IronMan/IvanVanco.jpg",
		comicLook:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Whiplash_IV.jpg/250px-Whiplash_IV.jpg"
	},
	{
		name: "Loki Laufeyson",
		altEgo: "-",
		universe:"Marvel",
		movies:["Thor","The Avengers","Thor: The Dark World","Thor Ragnarok","Avengers: Infinity War","Avengers: Endgame"],
		nemeses:["Thor","The Avengers"],
		powers:["Asgardian","Skilled sorcerer"],
		background:"Thor's adopted younger brother, Loki desires to be King of Asgard as he feels he can be a better leader. Feeling rejected by his father, Loki plots to send Thor away so that he can be crowned king. When this fails, Loki leaves asgard and eventually reappaears as a villain for the Avengers to face until he and Thor finally reconcile their differences",
		movieLook:"https://cdn.images.express.co.uk/img/dynamic/36/590x/secondary/loki-tesseract-1872470.webp?r=1558008252232",
		comicLook:"https://am23.akamaized.net/tms/cnt/uploads/2018/03/Thor-700_Loki-Infinity-Gauntlet.jpg"
	},
	{
		name: "Johann Schmidt",
		altEgo:"Red Skull",
		universe:"Marvel",
		movies:["Captain America: The First Avenger", "Avengers: Infinity War","Avengers: Endgame"],
		nemeses:["Captain America"],
		powers:["Super strength","Skilled fighter","Heightened senses"],
		background:"Adolf Hitler's head of advanced weaponry and commander of the terrorist organization Hydra whose own plan for world domination involves harnessing the power of the magical object known as the Tesseract.",
		movieLook:"https://media.comicbook.com/2018/09/captain-america-red-skull-1131967-1280x0.jpeg",
		comicLook:"https://static.comicvine.com/uploads/scale_small/0/77/4314088-red_skull_by_genzoman-d8cptp5.jpg"
	},
	{
		name:"Clint Barton" ,
		altEgo:"Hawkeye",
		universe:"Marvel",
		movies:["Thor","The Avengers","Avengers: Age of Ultron","Captain America: Civil War","Avengers: Endgame"],
		nemeses:["-"],
		powers:["Skilled fighter","Skilled archer"],
		background:"A master archer working as an agent for S.H.I.E.L.D., Clint becomes one of the original six Avengers",
		movieLook:"https://images.immediate.co.uk/volatile/sites/3/2016/07/113652.jpg?quality=90&resize=620,413",
		comicLook:"https://d1466nnw0ex81e.cloudfront.net/n_iv/600/1046527.jpg"
	},
	{
		name:"Aldrich Killian",
		altEgo:"Mandarin",
		universe:"Marvel",
		movies:["Iron Man 3"],
		nemeses:["Iron Man"],
		powers:["Super strength, Heat powers"],
		background:"The creator of the Extremis virus and the founder and owner of the science and development organisation Advanced Idea Mechanicswho adopts the mantle of the Mandarin as his own.",
		movieLook:"https://www.theyoungfolks.com/wp-content/uploads/2016/11/4379984-wallpaper-killian-iron-man-3-1.jpg",
		comicLook:"https://vignette.wikia.nocookie.net/marveldatabase/images/6/62/Aldrich_Killian_%28Earth-616%29_from_Iron_Man_Vol_4_Vol_1_1_0001.jpg/revision/latest?cb=20120715034458"
	},
	{
		name:"Malekith" ,
		altEgo: "-",
		universe:"Marvel",
		movies:["Thor: The Dark World"],
		nemeses:["Thor"],
		powers:["Skilled fighter"],
		background:"Seeking revenge against Asgard for the death of his family, Malekith wants to use the aether to engulf the nine realms in darkness.",
		movieLook:"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/b/b1/Malekith-TextlessPoster1.jpg/revision/latest?cb=20161226175416",
		comicLook:"https://i.pinimg.com/originals/5d/2e/84/5d2e8430173909b436639e919019f760.jpg"
	},
	{
		name: "Bucky Barnes",
		altEgo:"Winter Soldier",
		universe:"Marvel",
		movies:["Captain America: The First Avenger","Captain America: The Winter Soldier","Captain America: Civil War","Black Panther","Avengers: Infinity War","Avengers: Endgame"],
		nemeses:["-"],
		powers: ["Skilled fighter","Heightened senses","Super strength"],
		background: "Sergeant James Buchanan \"Bucky\" Barnes is a World War II veteran, a former officer of the 107th Infantry Regiment and the best friend of Steve Rogers since childhood. After resurfacing in 2014 from his presumed death, he now once again fights along side his war veteran and friend Steve Rogers.",
		movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/4/41/Winter_Soldier_AIW_Profile.jpg/revision/latest?cb=20180525203553",
		comicLook: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/wintersoldier001_cvr.jpg"
	},
    {
        name: "Floyd Lawton",
        altEgo: "Deadshot",
        universe:"DC",
        movies: ["Suicide Squad"],
        nemeses: ["-"],
        powers: ["Projectiles"],
        background: "Floyd Lawton, known as Deadshot, is considered the most wanted hitman in the world. After his capture by Batman, Lawton was imprisoned in Belle Reve, where he was later recruited by Amanda Waller to join the government-sanctioned Task Force X. His success on the force allowed him to reduce his prison time.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/3/31/Deadshot_first_look.png/revision/latest?cb=20150504024630",
        comicLook: "https://img.cinemablend.com/cb/7/5/c/7/a/e/75c7ae8f1e794ea56237022938b63962e8beb64a3f2b8f9f5fff6e2a799bfd69.jpg"
    },
    {
        name: "Harleen Quinzel",
        altEgo: "Harley Quinn",
        universe:"DC",
        movies: ["Suicide Squad"],
        nemeses: ["Batman"],
        powers: ["Skilled fighter"],
        background: "Doctor Harleen Frances Quinzel is a former psychiatrist employed at Arkham Asylum and a known associate of the Joker, operating under the alias Harley Quinn. After assisting in the Joker's escape from Arkham, Harleen was submerged in a silo of chemicals at Ace Chemicals, re-emerging as the Joker's right hand woman.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/6/68/Margot_Robbie_as_harley_Quinn.jpg/revision/latest/scale-to-width-down/334?cb=20170109011841",
        comicLook: "https://i.kinja-img.com/gawker-media/image/upload/s--Ln7ORQFU--/c_scale,f_auto,fl_progressive,q_80,w_800/dcy7batxjotlk3udmokw.png"
    },
    {
        name: "Waylon Jones",
        altEgo: "Killer Croc",
        universe:"DC",
        movies: ["Suicide Squad"],
        nemeses: ["-"],
        powers: ["Super strength", "Skilled fighter"],
        background: "Waylon Jones, known as Killer Croc, is a metahuman skilled crocodile wrestler, born with a genetic mutation which gave him reptilian skin, leading to him being nicknamed Killer Croc. He eventually turned to crime, and was chased out of Gotham City by Batman, only to be captured and recruited into Amanda Waller's Suicide Squad.",
        movieLook: "https://i.kinja-img.com/gawker-media/image/upload/s--Ln7ORQFU--/c_scale,f_auto,fl_progressive,q_80,w_800/dcy7batxjotlk3udmokw.png",
        comicLook: "https://www.dccomics.com/sites/default/files/GalleryChar_1920x1080_3_BW_10_09_57a3d09cb19d49.72084056.jpg"
    },
    {
        name: "George Harkness",
        altEgo: "Captain Boomerang",
        universe:"DC",
        movies: ["Suicide Squad"],
        nemeses: ["-"],
        powers: ["Boomerang", "Skilled fighter"],
        background: "George \"Digger\" Harkness was raised in poverty in the Australian town of Kurrumburra, the illegitimate child of an Australian woman and an American toy manufacturer. Harkness learned early how to develop boomerangs into weapons.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/d/de/Captain_Boomerang_-_Promo.jpg/revision/latest/scale-to-width-down/343?cb=20160719174104",
        comicLook: "http://www3.pictures.zimbio.com/mp/JQKXyzNFrx2l.jpg"
    },
    {
        name: "Chato Santana",
        altEgo: "El Diablo",
        universe:"DC",
        movies: ["Suicide Squad"],
        nemeses: ["-"],
        powers: ["Pyrokinesis", "Skilled fighter"],
        background: "Chato Santana, also known as El Diablo, was a metahuman criminal of Hispanic descent, and a member of Task Force X. While initially reluctant to use his pyrokinetic powers out of guilt and fear, he would ultimately sacrifice his life in order to defeat Incubus and save the world from Enchantress.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/d/df/Suicide_Squad_-_Poster_-_El_Diablo.jpg/revision/latest/scale-to-width-down/343?cb=20160620233843",
        comicLook: "https://en.wikipedia.org/wiki/El_Diablo_(comics)#/media/File:El_Diablo_comic_book_cover_(vol._2_no._16).jpg"
    },
    {
        name: "Enchantress",
        altEgo: "-",
        universe:"DC",
        movies: ["Suicide Squad"],
        nemeses: ["-"],
        powers: ["Super strength", "Telekinesis", "Teleportation"],
        background: "Enchantress was an ancient and inter-dimensional mystical being, who possessed the body of June Moone. Initially under Amanda Waller's control, Enchantress was viewed as one of the candidates for Suicide Squad membership, but the malevolent witch swiftly escaped, freeing her brother Incubus and attempting to take over Earth with their combined mystical powers.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/2/29/Enchantress_2.jpg/revision/latest/scale-to-width-down/335?cb=20180123204154",
        comicLook: "https://en.wikipedia.org/wiki/Enchantress_(DC_Comics)#/media/File:Enchantress_DC_Comics.png"
    },
    {
        name: "Tatsu Yamashiro",
        altEgo: "Katana",
        universe:"DC",
        movies: ["Suicide Squad"],
        nemeses: ["-"],
        powers: ["Skilled fighter"],
        background: "Tatsu Yamashiro is a Japanese samurai assassin code-named Katana (after her weapon of choice). Tatsu is an infamous master of swordplay and martial arts, trained to the highest level in the ancient art form. She is a proxy member of the Suicide Squad, and, of note, the only voluntary member as Rick Flag's personal bodyguard.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/3/33/CB14_520_PORTRAIT_015.jpg/revision/latest/scale-to-width-down/322?cb=20161118173951",
        comicLook: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Tatsu_Yamashiro_%28comic_superheroine%2C_modern_incarnation%29.jpg/250px-Tatsu_Yamashiro_%28comic_superheroine%2C_modern_incarnation%29.jpg"
    },
    {
        name: "Princess Diana",
        altEgo: "Wonder Woman",
        universe:"DC",
        movies: ["Batman v Superman: Dawn of Justice", "Wonder Woman", "Justice League"],
        nemeses: ["-"],
        powers: ["Super strength", "Super speed", "Levitation", "Skilled fighter"],
        background: "Princess Diana of Themyscira is an Amazonian warrior princess and one of the world's first superheroes, known as Wonder Woman. She is the daughter of Queen Hippolyta and Zeus, king of the Olympians. Born on Themyscira, Diana was raised in paradise, hearing tales of her the Amazons' great task of defeating the God of War, Ares, and bringing peace to the world, ushering in a new era of peace to the world.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/a/a0/Wonder_Woman_in_the_1980s.png/revision/latest/scale-to-width-down/350?cb=20180616110232",
        comicLook: "https://www.dccomics.com/sites/default/files/dc-Comics_Gallery_20181212__WW_Cv60_5c0b522552f088.84553519.jpg"
    },
    {
        name: "Ares",
        altEgo: "-",
        universe:"DC",
        movies: ["Wonder Woman"],
        nemeses: ["-"],
        powers: ["Super strength"],
        background: "Ares was the Old God of War, and the most fearsome son of Zeus, who was worshiped by the Ancient Greeks and Romans (though the latter civilization would give him the name Mars)",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/0/05/Ares.png/revision/latest/scale-to-width-down/350?cb=20171104040212",
        comicLook: "https://static.comicvine.com/uploads/original/5/57746/2557160-ares.png"
    },
    {
        name: "Barry Allen",
        altEgo: "The Flash",
        universe:"DC",
        movies: ["Batman v Superman: Dawn of Justice", "Suicide Squad", "Justice League"],
        nemeses: ["-"],
        powers: ["Super speed"],
        background: "Barry Allen is a student at Central City University who was struck by lightning, gaining the ability to think and move at incredible Super speeds. Using these powers, he became the vigilante hero known as the Flash.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/7/77/Justice_League_-_Flash.jpg/revision/latest/scale-to-width-down/350?cb=20181122000948",
        comicLook: "https://qph.fs.quoracdn.net/main-qimg-c81e83865d8209a2c679cb22c4e0885f"
    },
    {
        name: "Arthur Curry",
        altEgo: "Aquaman",
        universe:"DC",
        movies: ["Batman v Superman: Dawn of Justice", "Suicide Squad", "Justice League", "Aquaman"],
        nemeses: ["Black Manta"],
        powers: ["Atlantean", "Super strength", "Super speed", "Hydrokinesis"],
        background: "Arthur Curry is the King of Atlantis, as well as the superhero known as Aquaman. While initially reserved and content with his isolation from the surface world, Aquaman would eventually be recruited by Batman to join the Justice League in order to help defend Earth against the forces of Steppenwolf and his Parademon army.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/a/a9/Aquaman_Arthur_Curry_Character_Textless_Poster.jpg/revision/latest/scale-to-width-down/337?cb=20181123170241",
        comicLook: "https://qph.fs.quoracdn.net/main-qimg-463c8074f3fe066718026cf3322f9a4a"
    },
    {
        name: "Victor Stone",
        altEgo: "Cyborg",
        universe:"DC",
        movies: ["Batman v Superman: Dawn of Justice", "Justice League"],
        nemeses: ["-"],
        powers: ["Projectiles"],
        background: "Victor Stone is a former college athlete and football star. Following a horrible accident, his father Silas Stone, was able to save him via the use of a Mother Box that crafted cybernetics onto him. Victor then became known as the superhero Cyborg.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/b/b5/Cyborg_-_Promotional.png/revision/latest/scale-to-width-down/350?cb=20190326111907",
        comicLook: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Cyborg_%28Victor_Stone%29.jpg/250px-Cyborg_%28Victor_Stone%29.jpg"
    },
    {
        name: "David Kane",
        altEgo: "Black Manta",
        universe:"DC",
        movies: ["Aquaman"],
        nemeses: ["Aquaman"],
        powers: ["Eye lasers"],
        background: "David Kane was a pirate like his father, Jesse Kane, and at some point in time, he learned about Aquaman and wanted to encounter him. He battles with Aquaman based on a deep-seeded grudge.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/e/ea/Aquaman_Black_Manta_Character_Textless_Poster.jpg/revision/latest?cb=20181123170655",
        comicLook: "https://pbs.twimg.com/media/DibcflBV4AAYvv-.jpg"
    },
    {
        name: "Billy Batson",
        altEgo: "Shazam",
        universe:"DC",
        movies: ["Shazam"],
        nemeses: ["-"],
        powers: ["Super strength", "Super Speed", "Flight", "Lightning"],
        background: "William \"Billy\" Batson, known as Shazam, is an orphan chosen by the wizard Shazam to be his champion, granting him immense power to defend the innocent from evil.",
        movieLook: "https://vignette.wikia.nocookie.net/dccu/images/7/77/Shazam_promotional_image.jpg/revision/latest/scale-to-width-down/350?cb=20180523181032",
        comicLook: "https://www.dccomics.com/sites/default/files/imce/2018/12-DEC/Shazam1_1_5c089015b51a86.49890073.jpg"
    },
    {
        name: "Peter Quill",
        altEgo: "Star-Lord",
        universe:"Marvel",
        movies: ["Guardians of the Galaxy", "Guardians of the Galaxy Vol. 2", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Ronan", "Thanos"],
        powers: ["Skilled fighter", "Flight","Projectiles"],
        background: "Peter Quill was born in Missouri to a human mom and a Celestial. He was one of many born by the Celestial, whose plan was to create a second Celestial. Shortly after the death of Peter's mother, Peter was abducted by a group called the Ravagers. Yondu, the leader took him in as part of the crew and taught him combat and survival skills.",
        movieLook: "https://static.tvtropes.org/pmwiki/pub/images/starlordinfinitywar.png",
        comicLook: "https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/119015/DIG024434_1._SX360_QL80_TTD_.jpg"
    },
    {
        name: "Gamora",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Guardians of the Galaxy", "Guardians of the Galaxy Vol. 2", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Thanos"],
        powers: ["Skilled fighter", "Super strength"],
        background: "Gamora was taken in by Thanos after he killed half of the population of her people. She was trained under Ronan along with her sister Nebula. Eventually, she joins Star-Lord against Thanos.",
        movieLook: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gamora-avengers-infinity-war-1556117108.jpg?crop=1xw:1xh;center,top&resize=480:*",
        comicLook: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/17/1524838232-gamora-guardians-of-the-galaxy-comic.jpg?resize=480:*"
    },
    {
        name: "Hela",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Thor: Ragnorak"],
        nemeses: ["Thor"],
        powers: ["Super strength", "Magic", "Mjolnir"],
        background: "Hela is the oldest child of Odin and fought along side him in his battles. However, when Odin noticed her ambition outgrew his, he fought her and banished her from Asgard. After Odin's death, she broke free and looked to continue her conquest.",
        movieLook: "https://i.ytimg.com/vi/EoMbkpY4quw/maxresdefault.jpg",
        comicLook: "https://i.pinimg.com/originals/b1/db/28/b1db282ffc319c4ec12b02f7377b8d4a.jpg"
    },
    {
        name: "Drax",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Guardians of the Galaxy", "Guardians of the Galaxy Vol. 2", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Thanos","Ronan"],
        powers: ["Super strength", "Resilience", "Skilled fighter"],
        background: "In response to Ronan killing his family under Thanos' order, Drax becomes a member of the Guardians of the Galaxy to avenge their deaths.",
        movieLook: "https://cdn3.movieweb.com/i/article/WK46qR95CkQJxI4pmfUll14nh6XIeI/798:50/How-Thanos-Killed-Drax-Family-Infinity-War.jpg",
        comicLook: "https://i.annihil.us/u/prod/marvel/i/mg/c/c0/57dc0f9e9dc31/clean.jpg"
    },
    {
       name: "Stephen Strange",
       altEgo: "Doctor Strange",
       universe:"Marvel",
       movies: ["Doctor Strange", "Avengers: Infinity War", "Avengers: Endgame"],
       nemeses: ["Dormammu"],
       powers: ["Magic", "Foresight"],
       background: "Stange was a surgeon whose hands were crippled in a car crash, leaving him unable to perform surgeries. To proud to get a teaching job, he desperately seacrhed for ways to fix his hands. He found the Ancient One, and ultimately joined him, which granted him his powers.",
       movieLook: "https://www.listland.com/wp-content/uploads/2016/11/dr2.jpg",
       comicLook: "https://d1466nnw0ex81e.cloudfront.net/n_iv/600/633545.jpg"
    },
    {
        name: "Thanos",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["The Avengers"],
        powers: ["Super strength", "Finger-snapping", "Intelligence"],
        background: "Thanos is a titan born on one of Saturn's moons. While he was peaceful as a child, he became fascinated and obsessed with death. He uses his knowledge to augment his powers in search of the embodiment of death.",
        movieLook: "https://specials-images.forbesimg.com/imageserve/5cc30b87a7ea436c70f3f17f/960x0.jpg?fit=scale",
        comicLook: "https://i.kinja-img.com/gawker-media/image/upload/s--qBvJrrAs--/c_scale,f_auto,fl_progressive,q_80,w_800/tb3valnfpsnxqxdbdtol.png"
    },
    {
        name: "Wanda Maximoff",
        altEgo: "Scarlet Witch",
        universe:"Marvel",
        movies: ["Captain America: Winter Soldier", "Captain America: Civil War", "Averngers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Thanos"],
        powers: ["Magic"],
        background: "Wanda is the child of Magneto and Magda. The Elder Gods gave Wanda the ability to use magic, which along with her mutant powers, made her very powerful.",
        movieLook: "https://i.pinimg.com/originals/48/6b/ab/486bab95711f56e186b74eb94a5b5266.jpg",
        comicLook: "https://i.pinimg.com/originals/f7/f3/e6/f7f3e65b5502a47ed775447f63f303ae.jpg"
    },
    {
        name: "Rocket Raccoon",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Guardians of the Galaxy", "Guardians of the Galaxy Vol. 2", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Thanos"],
        powers: ["Projectiles", "Agility", "Intelligence"],
        background: "Rocket is a raccoon, but was the result of an experient that gave him increased speed and agility and human-like intelligence and speech.",
        movieLook: "https://snworksceo.imgix.net/car/614a86c8-405f-4fd8-b60d-93998c769661.sized-1000x1000.jpg?w=800",
        comicLook: "https://cdn.nexternal.com/dreamland/images/rocket_1_peterson.jpg"
    },
    {
        name: "Vision",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Captain America: Civil War", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Thanos"],
        powers: ["Intelligence", "Flight", "Magic"],
        background: "Vision is an android created by Ultron for use against Ultron's creator and the Avengers. Vision is, however, convinced into joining the Avengers. He is part of a plan that would make him get close to the Scarlet Witch so that she does not have any children.",
        movieLook: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/p-marvel-the-avengers-paul-bettany.jpg",
        comicLook: "https://hips.hearstapps.com/esq.h-cdn.co/assets/15/18/1430500341-age-of-ultron-vision-hd.jpg?resize=480:*"
    },
    {
        name: "Nebula",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Guardians of the Galaxy", "Guardians of the Galaxy Vol. 2", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["Thanos"],
        powers: ["Skilled fighter", "Agility"],
        background: "Like her sister Gamora, Nebula was asdopted by Thanos as a child and learned and served under Ronan. She would often spar with Gamora, but would lose everytime, which disappointed Thanos, who decided to infuse her with mechanical parts.",
        movieLook: "https://imgix.bustle.com/2017/5/3/edd9f1b6-7863-4d8d-87dd-11ed65c1ac5a.png?w=970&h=546&fit=crop&crop=faces&auto=format&q=70",
        comicLook: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/043neb_com_inl_06.jpg"
    },
    {
        name: "Scott Lang",
        altEgo: "Ant-Man",
        universe:"Marvel",
        movies: ["Ant-Man", "Ant-Man and the Wasp", "Avengers: Endgame"],
        nemeses: ["Thanos"],
        powers: ["Shrinking", "Super strength", "Goes up Thanos' big purple peach"],
        background: "Scott was an electrician who turned to crime to support his family. In prison, he furthured his knowledge of electronics and was eventually hired by Tony Stark.",
        movieLook: "https://cdn.jwplayer.com/thumbs/8UlPSTXX-720.jpg",
        comicLook: "https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/693929/693929._SX360_QL80_TTD_.jpg"
    },
    {
        name: "Carol Danvers",
        altEgo: "Captain Marvel",
        universe:"Marvel",
        movies: ["Captain Marvel", "Avengers: Endgame"],
        nemeses: ["-"],
        powers: ["Flight", "Projectiles"],
        background: "Captain Carol Danvers, also known as Captain Marvel, is a former United States Air Force pilot who, upon being exposed to the energy of the Tesseract, obtained cosmic powers.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/f/fe/CapMarvel-EndgameProfile.jpeg/revision/latest/scale-to-width-down/310?cb=20190423175247",
        comicLook: "https://images.immediate.co.uk/volatile/sites/3/2018/01/28627f1cb393e26bd26d14a960df182e83269c7d-08eee28.jpg?quality=90&resize=620,413"
    },
    {
        name: "Groot",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Guardians of the Galaxy", "Guardians of the Galaxy Vol. 2", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["-"],
        powers: ["Super strength"],
        background: "Groot is a sentient, tree-like individual and the accomplice of Rocket Raccoon. Together, the pair had traveled the galaxy picking up bounties until they met Star-Lord and Gamora just before the four of them were captured and put into the Kyln, where they also met Drax the Destroyer.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/6/6f/Groot_AIW_Profile.jpg/revision/latest/scale-to-width-down/310?cb=20190326211501",
        comicLook: "https://static.comicvine.com/uploads/original/0/40/5578907-0%20guardians%20of%20galaxy%20%2316%20lotay%20var.jpg"
    },
    {
        name: "Helmut Zemo",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Captain America: Civil War"],
        nemeses: ["The Avengers"],
        powers: ["-"],
        background: "Colonel Helmut Zemo is a Sokovian citizen turned terrorist mastermind who sought revenge against the Avengers after losing his family in the Battle of Sokovia, becoming obsessed with defeating and destroying them.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/4/44/Zemo-ProfilePicture.jpg/revision/latest/scale-to-width-down/310?cb=20160925130847",
        comicLook: "https://cdn3-www.comingsoon.net/assets/uploads/2015/04/BaronZemo.jpg"
    },
    {
        name: "Erik Killmonger",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Black Panther"],
        nemeses: ["Black Panther"],
        powers: ["Skilled fighter","Heightened senses"],
        background: "N'Jadaka, also known as Erik Stevens, was a former Navy SEAL soldier of Wakandan origin through his father, Prince N'Jobu. His savagery while serving in the US military black-ops unit, earned him the nickname Killmonger.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/9/9d/Black_Panther_Textless_Character_Poster_03.jpg/revision/latest/scale-to-width-down/310?cb=20171201051947",
        comicLook: "https://vignette.wikia.nocookie.net/marveldatabase/images/1/18/Erik_Killmonger_%28Earth-161%29_0001.jpg/revision/latest?cb=20100116021511"
    },
    {
        name: "Sam Wilson",
        altEgo: "Falcon",
        universe:"Marvel",
        movies: ["Captain America: The Winter Soldier", "Avengers: Age of Ultron", "Ant-Man", "Captain America: Civil War", "Avengers: Infinity War", "Avengers: Endgame"],
        nemeses: ["-"],
        powers: ["Flight", "Projectiles"],
        background: "Samuel Thomas \"Sam\" Wilson, better known as Falcon, is a former United States Air Force pararescue airman who left active duty when his wing-man Riley died in combat, choosing instead to begin helping any of his fellow veterans who were suffering from post-traumatic stress disorder at Veterans Affairs.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/4/48/Falcon_AIW_Profile.jpg/revision/latest/scale-to-width-down/310?cb=20180518212822",
        comicLook: "https://i.pinimg.com/originals/86/fd/59/86fd598d9a2ad43f2a0130686c0a8520.jpg"
    },
    {
        name: "Ultron",
        altEgo: "-",
        universe:"Marvel",
        movies: ["Avengers: Age of Ultron"],
        nemeses: ["The Avengers"],
        powers: ["Projectiles", "Flight", "Super strength"],
        background: "Ultron was an Artificial Intelligence Peacekeeping Program created by Tony Stark from the decrypted code derived from the Mind Stone encased within Loki's own Scepter, retooled by himself with the help of Bruce Banner with the intent being to protect Earth from any and all domestic and extraterrestrial threats coming within the future. Ended up turning against The Avengers in a large-scale battle.",
        movieLook: "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/Ultron_Textless_AoU_Poster.jpg/revision/latest/scale-to-width-down/310?cb=20180318143826",
        comicLook: "http://geekshizzle.com/wp-content/uploads/2014/03/What_If_Age_of_Ultron_1_Cover.jpg"
    },
    {
        name: "Adrian Toomes",
        altEgo: "Vulture",
        universe:"Marvel",
        movies: ["Spider-Man: Homecoming"],
        nemeses: ["Spider-Man"],
        powers: ["Flight", "Super strength"],
        background: "Adrian was an engineer who developed a flight suit. After finding out he lost his job, he became enraged, destroying the company and taking his suit. Realizing the suit gave him strength, he turned to crime.",
        movieLook: "https://pixel.nymag.com/imgs/daily/vulture/2017/07/05/05-keaton-spiderman-2.w700.h700.jpg",
        comicLook: "https://pixel.nymag.com/imgs/daily/vulture/2016/12/23/23-spiderman.w700.h700.jpg"
    }]);
	console.log('Seed successful');
	return;}
main();
