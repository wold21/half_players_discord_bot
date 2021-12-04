const {
    Client,
    Intents,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

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

client.on("interactionCreate", async (interection) => {
    const { commandName } = interection;
    if (!interection.isCommand()) return;
    if (commandName === "ping") {
        await interection.reply("Pong!");
    } else if (commandName === "모집") {
        const confirm = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("join")
                .setLabel("참  가")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("not join")
                .setLabel("참가안함")
                .setStyle("DANGER")
        );
        const embed = new MessageEmbed().setColor("#3498DB").setTitle("🛎 내전 모집");

        await interection.reply({
            embeds: [embed],
            ephemeral: true,
            components: [confirm],
        });

        const filter = (i) => {
            if (i.user.id === interaction.user.id) {
                console.log("같음");
                return true;
            }
            return i.reply({ content: "선택하셨습니다." });
        };
        const collector = interection.channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 15000,
        });

        collector.on("end", async (btnInterection) => {
            console.log(btnInterection.first().customId);
            btnInterection.forEach((click) => {
                console.log(click.user.id, click.customId);
            });
            if (btnInterection.first.customId === "join") {
                const editBtn = new MessageEmbed()
                    .setColor("#3498DB")
                    .setDescription("선택하셨습니다.");
                await interaction.editReply({
                    embeds: [editBtn],
                    ephemeral: true,
                    components: [],
                });
            }
        });
    } else if (commandName === "마감") {
        const embed = new MessageEmbed()
            .setColor("#3498DB")
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

// client.on("interactionCreate", (interaction) => {
//     if (!interaction.isButton()) return;
//     if (interaction.customId === "join") {
//         userList.push(interaction.user.username);
//     }
//     console.log(userList);
// });

client.login(process.env.TOKEN);

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
