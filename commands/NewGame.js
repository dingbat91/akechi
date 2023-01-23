import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Module } from "module";

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
		await interaction.deferReply();
		const name = interaction.options.getString("name");
		const description = interaction.options.getString("description");
		const ephemeral = interaction.options.getBoolean("ephemeral");
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
		interaction.editReply({ embeds: [embed] });
	},
};

export default command;
