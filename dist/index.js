"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// import { ChannelMsgHandler } from './channel_message_handler';
require('dotenv').config(); // loads .env file (gives us access to the .env file anywhere in the project)
const { IntentsBitField } = require('discord.js');
// if there are bugs, it might be because we haven't provided all of the required intents
const client = new discord_js_1.Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
// Event Listeners
// tells us when the bot is ready
client.on('ready', (c) => {
    console.log(`✅ ${c.user.username} is ready!`);
});
// handle messages
// good documentation for Message object https://discord.js.org/docs/packages/discord.js/14.14.1/Message:Class#author
client.on('messageCreate', (message) => {
    // ChannelMsgHandler.logMessageInfo(message);
});
client.login(process.env.TOKEN); // token
