const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const dotenv = require("dotenv");
dotenv.config();

const guildId = process.env.CHANNEL;
const clientId = process.env.CLIENT;
const commands = [
    new SlashCommandBuilder().setName("team").setDescription("팀 만들기"),
    new SlashCommandBuilder().setName("split").setDescription("모집 마감"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
(async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });

        console.log("Successfully registered application commands.");
    } catch (error) {
        console.error(error);
    }
})();
