const {
  Client,
  Intents,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.once("ready", () => {
  console.log("Ready!");
});

let userList = [];
client.on("interactionCreate", async (interaction) => {
  const { commandName } = interaction;
  if (!interaction.isCommand()) return;
  //   const guild = client.guilds.cache.get(process.env.CHANNEL);
  //   const getList = guild.members.cache.filter(
  //     (member) => member.presence?.status === "online"
  //   );

  //   getList.forEach((item, i) => {
  //     userList.push(item.user);
  //   });

  //   userList.forEach(function (item, i) {
  //     if (item.bot === false) {
  //       console.log(item.username);
  //     }
  //   });
  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "모집") {
    const confirm = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("join")
        .setLabel("참가")
        .setStyle("SUCCESS")
    );
    const cancel = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("not join")
        .setLabel("참가안함")
        .setStyle("DANGER")
    );
    const embed = new MessageEmbed()
      .setColor("#FF8633")
      .setTitle("🛎 내전 모집")
      .setTimestamp();

    await interaction.reply({
      ephemeral: true,
      embeds: [embed],
      components: [confirm, cancel],
    });
  } else if (commandName === "마감") {
    const embed = new MessageEmbed()
      .setColor("#FF8633")
      .setTitle("결과")
      .setDescription(`1️⃣팀 :${userList}  \n 2️⃣팀 : test`)
      .setTimestamp();
    await interaction.reply({
      ephemeral: true,
      embeds: [embed],
    });
    await interaction.reply(`${userList}`);
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "join") {
    userList.push(interaction.user.username);
  }
  console.log(userList);
});

client.login(process.env.TOKEN);
