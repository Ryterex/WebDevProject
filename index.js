/*Chris Paldino
I pledge my honor that I have abided by the Stevens Honor System*/

const animals=require("./data/users");

const connection=require("./data/connection");

async function main(){
	const db=await connection();
	await db.serverConfig.close();}

main().catch(error=>{console.log(error);});
