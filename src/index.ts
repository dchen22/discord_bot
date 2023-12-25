import { Message, Client } from 'discord.js';
import { ChannelMsgLogger, MathChannelHandler, GeneralChannelHandler } from './channel_message_handler';
require('dotenv').config(); // loads .env file (gives us access to the .env file anywhere in the project)
const { IntentsBitField } = require('discord.js');

// if there are bugs, it might be because we haven't provided all of the required intents
const client = new Client({
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
client.on('messageCreate', (message: Message) => {
    // ChannelMsgLogger.logMessageInfo(message); // log message info in console
    if (message.inGuild()) {
        switch (message.channel.name) {
            case "general":
                break;
            case "math":
                let result = MathChannelHandler.parseMessage(message);
                if (result !== undefined) { // if there is a result to return
                    message.channel.send(result.toString());
                } 
        }
    }
});

client.login(process.env.TOKEN); // token