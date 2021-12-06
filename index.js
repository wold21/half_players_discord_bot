const {
    Client,
    Intents,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require("discord.js");
const { token } = require('./.config.json');

const client = new Client({ intents: [32767] });

client.once("ready", () => {
    console.log("Ready!");
    client.user.setActivity("축구", { type: "WATCHING" });
});

function memberProcess(arr, s1, s2) {
    let data = {};
    if (arr.length < (s1 + s2)) {
        data.flag = false;
        data.length = arr.length;
    } else {
        const t1 = new Array(s1);
        const t2 = new Array(s2);

        // 여기서 부터 작성 필요 =====================================
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
        data.team_one = Array.from(new Set(team_one));
        data.team_two = Array.from(new Set(team_two));
        data.waitingMember =
            waitingMember.length != 0
                ? Array.from(new Set(waitingMember))
                : "대기 인원이 없습니다.";
    }
    return data;
}

let userList = [
    "base",
    "comma",
    "blily",
    "fox",
    "golf",
    "hotel",
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

client.on("interactionCreate", async (interaction) => {
    const { commandName } = interaction;
    if (!interaction.isCommand()) return;
    console.log(interaction.options.getString("a"));
    console.log(interaction.options.getString("b"));
    if (commandName === "team") {
        const btn = new MessageActionRow().addComponents(
            new MessageButton().setCustomId("join").setLabel("참가").setStyle("SUCCESS"),
            new MessageButton().setCustomId("not").setLabel("참가안함").setStyle("DANGER")
        );
        const embed = new MessageEmbed().setColor("#3498DB").setTitle("🛎 내전 모집");
        await interaction.reply({
            embeds: [embed],
            components: [btn],
        });
    } else if (commandName === "split") {
        let result = memberProcess(userList, a, b);
        if (!result.flag) {
            const embed = new MessageEmbed()
                .setColor("#3498DB")
                .setTitle("⚽️ 인원이 부족합니다")
                .setDescription(`현재 신청 인원 ${result.length}명`);

            await interaction.deferReply();
            await interaction.editReply({ embeds: [embed], components: [] });
        } else {
            const embed = new MessageEmbed()
                .setColor("#3498DB")
                .setTitle("⚽️ 결과")
                .setDescription(
                    `1️⃣팀 : ${result.team_one}  \n\n 2️⃣팀 : ${result.team_two} \n\n 📌 대기 : ${result.waitingMember}`
                );
            await interaction.deferReply();
            await interaction.editReply({ embeds: [embed], components: [] });
        }
    }
});

client.on("interactionCreate", (interaction) => {
    let returnMsg = "";
    if (!interaction.isButton()) return;
    if (interaction.customId === "join") {
        userList.push(interaction.user.username);
        returnMsg = "내전에 참여합니다.";
    } else if (interaction.customId === "not") {
        if (userList.indexOf(interaction.user.username)) {
            userList.splice(userList.indexOf(interaction.user.username));
        }
        returnMsg =
            "내전에 참여하지 않습니다.\n참가 신청을 했던 경우 팀 리스트에서 삭제됩니다.";
    }
    interaction.reply({ content: `${returnMsg}`, ephemeral: true });
    console.log(userList);
});

client.login(token);
