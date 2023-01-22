import { SlashCommandBuilder } from "discord.js";
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
		.addBooleanOption((option) =>
			option
				.setName("ephemeral")
				.setDescription("Whether the reply is ephemeral")
		),
	async execute(interaction) {
		await interaction.deferReply();
		await interaction.editReply("Hello friend~");
	},
};

export default command;
