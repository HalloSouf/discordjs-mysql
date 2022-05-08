/**
 * @file app.js
 * @description An example how to use MySQL with your Discord bot
 * @author HalloSouf
 * @version 2.0.0
 */
const { Client, Intents } = require('discord.js');
const { config } = require('dotenv');
const { PrismaClient } = require('@prisma/client');
config();

const prisma = new PrismaClient();
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`| ${client.user.tag} (${client.user.id}) is ready for use!`);

    client.guilds.cache.map(async (guild) => {
        let fetchedGuild = await prisma.guild.findFirst({ 
            where: { id: guild.id }
        });

        if (!fetchedGuild) {
            try {
                await prisma.guild.create({
                    data: { id: guild.id, owner: guild.ownerId }
                });
            } catch (e) {
                console.error('Something went wrong with creating guild-record: ', e.message);
            }
        }
    });
});

client
    .login(process.env.CLIENT_TOKEN)
    .then((token) => {
        console.log(`| Initializing client with token ${token.substring(0, 9)}.****`);
    })
    .catch((e) => {
        throw e;
    });