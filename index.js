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

client.once("ready", () => {
    console.log("Ready!");
    client.user.setActivity("축구", { type: "WATCHING" });
});

function memberProcess(arr) {
    let data = {};
    let waitingMember = [];
    let team_one = [];
    let team_two = [];
    arr.sort(() => Math.random() - 0.5);
    arr.forEach((item, index) => {
        if (index > 21) {
            waitingMember.push(" " + item);
        } else {
            if (index % 2 != 0) {
                team_one.push(" " + item);
            } else if (index % 2 == 0) {
                team_two.push(" " + item);
            }
        }
    });
    data.team_one = team_one;
    data.team_two = team_two;
    data.waitingMember =
        waitingMember.length != 0 ? waitingMember : "대기 인원이 없습니다.";
    return data;
}

let userList = [
    "echo",
    "vein",
    "twitch",
    "missfortune",
    "ashe",
    "blily",
    "kim",
    "park",
    "choi",
    "lee",
    "kang",
    "song",
    "son",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
];

client.on("interactionCreate", async (interection) => {
    const { commandName } = interection;
    if (!interection.isCommand()) return;
    if (commandName === "team") {
        const confirm = new MessageActionRow().addComponents(
            new MessageButton().setCustomId("join").setLabel("참가").setStyle("SUCCESS"),
            new MessageButton().setCustomId("not").setLabel("참가안함").setStyle("DANGER")
        );
        const embed = new MessageEmbed().setColor("#3498DB").setTitle("🛎 내전 모집");

        await interection.reply({
            embeds: [embed],
            components: [confirm],
        });
    } else if (commandName === "split") {
        let result = memberProcess(userList);
        const embed = new MessageEmbed()
            .setColor("#3498DB")
            .setTitle("⚽️ 결과")
            .setDescription(
                `1️⃣팀 : ${result.team_one}  \n\n 2️⃣팀 : ${result.team_two} \n\n 📌 대기 : ${result.waitingMember}`
            )
            .setTimestamp();
        interection.reply({
            embeds: [embed],
        });
    }
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId === "join") {
        interaction.reply({ content: "선택하셨습니다.", ephemeral: true });
        userList.push(interaction.user.username);
    }
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
