import * as dotenv from "dotenv";
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "url";

const FILENAME = url.fileURLToPath(import.meta.url);
const DIRNAME = url.fileURLToPath(new URL(".", import.meta.url));
dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessageReactions,
	],
});

//Slash command loading------------------------
client.commands = new Collection();

const COMMANDSPATH = path.join(DIRNAME, "commands");
const COMMANDFILES = fs
	.readdirSync(COMMANDSPATH)
	.filter((file) => file.endsWith(".js"));

for (const file of COMMANDFILES) {
	const COMMAND = await import(`./commands/${file}`);
	if ("data" in COMMAND.default && "execute" in COMMAND.default) {
		client.commands.set(COMMAND.default.data.name, COMMAND);
	} else {
		console.log(
			`[Warning] The command at ${FILEPATH} is missing a requird "data" or "execute" property`
		);
	}
}
//---------------------------------------------
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const COMMAND = interaction.client.commands.get(interaction.commandName);

	if (!COMMAND) {
		console.error(`no command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await COMMAND.default.execute(interaction);
	} catch (err) {
		console.log(err);
		await interaction.reply({
			content: `there was an error while executing this command`,
			ephemeral: true,
		});
	}
});
//--------------------------

client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);
