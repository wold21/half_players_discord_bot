const {
    Client,
    Intents,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({ intents: [32767] });
// const prefix = "!";

client.once("ready", () => {
    console.log("Ready!");
    client.user.setActivity("축구", { type: "WATCHING" });
});

let userList = [];
// client.on("messageCreate", async (message) => {
//     const args = message.content.slice(prefix.length).trim().split(/ +/g);
//     const command = args.shift();
//     if (command === "모집") {
//         const embed = new MessageEmbed().setColor("#3498DB").setTitle("🛎 내전 모집");

//         const btns = new MessageActionRow().addComponents(
//             new MessageButton().setCustomId("join").setLabel("참가").setStyle("SUCCESS"),
//             new MessageButton().setCustomId("not").setLabel("참가안함").setStyle("DANGER")
//         );

//         message.channel.send({ embeds: [embed], components: [btns] });
//     }
// });

client.on("interactionCreate", async (interection) => {
    const { commandName } = interection;
    if (!interection.isCommand()) return;
    if (commandName === "모집") {
        const confirm = new MessageActionRow().addComponents(
            new MessageButton().setCustomId("join").setLabel("참가").setStyle("SUCCESS"),
            new MessageButton().setCustomId("not").setLabel("참가안함").setStyle("DANGER")
        );
        const embed = new MessageEmbed().setColor("#3498DB").setTitle("🛎 내전 모집");

        await interection.reply({
            embeds: [embed],
            components: [confirm],
        });

        // collector.on("collect", async (i) => {
        //     if (i.customId === "join") {
        //         const editBtn = new MessageEmbed()
        //             .setColor("#3498DB")
        //             .setDescription("참가를 선택하셨습니다.");
        //         await i.update({
        //             embeds: [editBtn],
        //             components: [],
        //         });
        //     }

        //     if (i.customId === "not join") {
        //         const editBtn = new MessageEmbed()
        //             .setColor("#3498DB")
        //             .setDescription("참가안함을 선택하셨습니다.");
        //         await i.update({
        //             embeds: [editBtn],
        //             components: [],
        //         });
        //     }
        // });

        // collector.on("end", async (btnInterection) => {
        //     btnInterection.forEach((click) => {
        //         console.log(click.user.id, click.customId);
        //     });
        //     if (btnInterection.first.customId === "join") {
        //     }
        // });
    } else if (commandName === "마감") {
        const embed = new MessageEmbed()
            .setColor("#3498DB")
            .setTitle("결과")
            .setDescription(`1️⃣팀 :${userList}  \n 2️⃣팀 : test`)
            .setTimestamp();
        await interaction.reply({
            embeds: [embed],
        });
        await interaction.reply(`${userList}`);
    }
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId === "join") {
        interaction.reply({ content: "선택하셨습니다.", ephemeral: true });
        userList.push(interaction.user.username);
    }
    console.log(userList);
});

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
