/* eslint-env: node */

const discord = require("discord.js");
const process = require("process");
const fs = require("fs");

const config = {
  guild: "683633975838769192", // Good Gartic
  channel: "694933305954402364", // Spamspamspam
  thread: "966057958708490271", // Sentence chain,
  start: "966058509844226048", // First message in the chain
};

const token = process.env.DISCORD_TOKEN;
const client = new discord.Client({
  intents: [
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.GUILD_MEMBERS,
    discord.Intents.FLAGS.GUILD_MESSAGES,
    1 << 15
  ],
});


console.log(`Logging with token: ${token}`)

/**
 * 
 * @param {discord.ThreadChannel} thread 
 * @returns {Array<discord.Message>}
 */
const fetchAllMessages = async (thread) => {
  const messages = [];
  let message = await thread.messages
    .fetch({ limit: 1 })
    .then(page => (page.size === 1 ? page.at(0) : null));

  while (message !== null) {
    console.log("Fetching next messages page...");

    await thread.messages
      .fetch({ limit: 100, before: message.id })
      .then(page => {
        page.forEach(item => messages.push(item));
        message = page.size > 0 ? page.at(page.size - 1) : null;;
      });
  }

  return messages;
};

client.login(token);
client.addListener("ready", async () => {
  const guild = await client.guilds.fetch(config.guild);
  const channel = await guild.channels.fetch(config.channel);
  const thread = await channel.threads.fetch(config.thread);

  const messages = await fetchAllMessages(thread);
  const formatted = messages
    .filter(message => !message.author.bot)
    .map(message => {
      return {
        username: message.author.username,
        avatar: message.author.displayAvatarURL({format: "png"}),
        content: message.cleanContent,
      }
    })
    .reverse();

  console.log(formatted);

  fs.writeFileSync("_messages.json", JSON.stringify(formatted));
});