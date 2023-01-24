import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { url } from "inspector";
import { PBConnect } from "../pocketbase/connection.js";

const command = {
	data: new SlashCommandBuilder()
		.setName("addgame")
		.setDescription("adds a game to storage")
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription("Name of the game")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("description")
				.setDescription("Description of the game")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("url").setDescription("Games URL").setRequired(true)
		)
		.addBooleanOption((option) =>
			option
				.setName("ephemeral")
				.setDescription("Whether the reply is ephemeral")
		),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		//Interaction extraction
		const name = interaction.options.getString("name");
		const description = interaction.options.getString("description");
		const ephemeral = interaction.options.getBoolean("ephemeral");
		const url = interaction.options.getString("url");

		//Database save
		const pb = PBConnect();
		const gmarray = [interaction.user.id];

		const data = {
			name: name,
			description: description,
			url: url,
			gamemasters: JSON.parse(gmarray),
		};

		try {
			const record = await pb.collection("games").create(data);
		} catch (err) {
			console.table(data);
			console.log(err);
		}
		//Embed Creation
		const embed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle("New game Added")
			.addFields(
				{ name: "Game Name", value: name },
				{ name: "description", value: description }
			)
			.setTimestamp()
			.setFooter({ text: "Ding testing a footer!" });
		//--------------------------------------
	},
};

export default command;
