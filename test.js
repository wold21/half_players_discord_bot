// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const test_client = new Client({
  intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
});

test_client.once("ready", () => {
  console.log("fake login");
});

test_client.login(process.env.FAKE_TOKEN);
