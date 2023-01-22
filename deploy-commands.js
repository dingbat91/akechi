import { REST, Routes } from "discord.js";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();
const TOKEN = process.env.TOKEN;

const COMMANDS = [];
const COMMANDFILES = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of COMMANDFILES) {
	const COMMAND = await import(`./commands/${file}`);
	COMMANDS.push(COMMAND.default.data);
}

console.log(COMMANDS);
const rest = new REST({ version: 10 }).setToken(TOKEN);

(async () => {
	try {
		console.log(`Started Refreshing ${COMMANDS.length} slash commmands`);

		const DATA = await rest.put(
			Routes.applicationGuildCommands(process.env.APPID, process.env.SERVID),
			{ body: COMMANDS }
		);
		console.log(
			`Successfully loaded ${DATA.length} applications (/) commands.`
		);
	} catch (err) {
		console.error(err);
	}
})();
