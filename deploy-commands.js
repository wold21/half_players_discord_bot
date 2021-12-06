const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, guild, client } = require("./.config.json");

const guildId = guild;
const clientId = client;
const commands = [
    new SlashCommandBuilder()
        .setName("team")
        .addStringOption((option) =>
            option.setName("a").setDescription("숫자만 입력가능합니다.").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("b").setDescription("숫자만 입력가능합니다.").setRequired(true)
        )
        .setDescription("팀 만들기"),
    new SlashCommandBuilder().setName("split").setDescription("모집 마감"),
    new SlashCommandBuilder().setName("reset").setDescription("멤버 리셋"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);
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
