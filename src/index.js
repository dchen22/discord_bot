const { Client, IntentsBitField } = require('discord.js');

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
    console.log(`✅ ${client.user.username} is ready!`); 
});

client.on('messageCreate', (message) => {
    console.log(`${message.author.globalName}: ${message.content}`);
});

client.login(); // token