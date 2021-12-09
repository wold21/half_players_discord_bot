const {
    Client,
    Intents,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require("discord.js");
const { token } = require("./.config.json");

const client = new Client({ intents: [32767] });

client.once("ready", () => {
    console.log("Ready!");
    client.user.setActivity("축구", { type: "WATCHING" });
});

function memberProcess(arr, s1, s2) {
    let data = {};
    let t1 = [];
    let t2 = [];
    let waitingMember = [];
    let total = s1 + s2;
    let setArr = Array.from(new Set(arr));
    if (setArr.length < total || setArr.length === 0) {
        data.flag = false;
        data.length = setArr.length;
    } else {
        setArr.sort(() => Math.random() - 0.5);
        for (let i = 0; i < s1; i++) {
            t1.push(" " + setArr.pop());
        }
        for (let i = 0; i < s2; i++) {
            t2.push(" " + setArr.pop());
        }

        if (setArr.length != 0) {
            waitingMember.push(setArr);
        }
        data.flag = true;
        data.t1 = t1;
        data.t2 = t2;
        data.waitingMember = arr.length != 0 ? setArr : "대기 인원이 없습니다.";
    }
    return data;
}

let userList = [];

let memberCount = {};
client.on("interactionCreate", async (interaction) => {
    const { commandName } = interaction;
    if (!interaction.isCommand()) return;
    if (commandName === "team") {
        await interaction.deferReply();
        memberCount.a = parseInt(interaction.options.getString("a"));
        memberCount.b = parseInt(interaction.options.getString("b"));
        const btn = new MessageActionRow().addComponents(
            new MessageButton().setCustomId("join").setLabel("참가").setStyle("SUCCESS"),
            new MessageButton().setCustomId("not").setLabel("참가안함").setStyle("DANGER")
        );
        const embed = new MessageEmbed().setColor("#FFFFFF").setTitle("🛎 내전 모집");
        await interaction.editReply({
            embeds: [embed],
            components: [btn],
        });
    } else if (commandName === "split") {
        let s1 = memberCount.a;
        let s2 = memberCount.b;
        let result = memberProcess(userList, s1, s2);

        let embed;
        if (!result.flag) {
            if (result.length === 0) {
                embed = new MessageEmbed()
                    .setColor("#FFFFFF")
                    .setTitle("⚽️ 인원을 모집해주세요");
            } else {
                embed = new MessageEmbed()
                    .setColor("#FFFFFF")
                    .setTitle("⚽️ 인원이 부족합니다")
                    .setDescription(`현재 신청 인원 ${result.length}명`);
            }
            await interaction.deferReply();
            await interaction.editReply({ embeds: [embed], components: [] });
        } else {
            const embed = new MessageEmbed()
                .setColor("#FFFFFF")
                .setTitle("⚽️ 결과")
                .setDescription(
                    `1️⃣팀 : ${result.t1}  \n\n 2️⃣팀 : ${result.t2} \n\n 📌 대기 : ${result.waitingMember}`
                );
            await interaction.deferReply();
            await interaction.editReply({ embeds: [embed], components: [] });
        }
    } else if (commandName === "reset") {
        userList = [];
        const embed = new MessageEmbed()
            .setColor("#FFFFFF")
            .setTitle("⚽️ 인원이 리셋됩니다.");
        await interaction.reply({ embeds: [embed], components: [] });
    }
});

client.on("interactionCreate", (interaction) => {
    let returnMsg = "";
    if (!interaction.isButton()) return;
    if (interaction.customId === "join") {
        userList.push(interaction.member.nickname);
        returnMsg = "내전에 참여합니다.";
    } else if (interaction.customId === "not") {
        if (userList.indexOf(interaction.member.nickname)) {
            userList.splice(userList.indexOf(interaction.member.nickname));
        }
        returnMsg =
            "내전에 참여하지 않습니다.\n참가 신청을 했던 경우 팀 리스트에서 삭제됩니다.";
    }
    interaction.reply({ content: `${returnMsg}`, ephemeral: true });
});

client.login(token);
