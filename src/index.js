const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const token = process.env.TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);