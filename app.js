/**
 * @file app.js
 * @description An example how to use MySQL with your Discord bot
 * @author HalloSouf
 * @version 2.0.0
 */

const { Client, Intents } = require('discord.js');
const { config } = require('dotenv');
config();

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`| ${client.user.tag} (${client.user.id}) is ready for use!`)
});

client
    .login(process.env.CLIENT_TOKEN)
    .then((token) => {
        console.log(`| Initializing client with token ${token.substring(0, 9)}.****`);
    })
    .catch((e) => {
        throw e;
    });