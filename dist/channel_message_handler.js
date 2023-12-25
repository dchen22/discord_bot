"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChannelMsgHandler {
    message;
    constructor(message) {
        this.message = message;
    }
    logMessageInfo() {
        console.log(`${this.message.author.globalName}: ${this.message.content}`);
        if (this.message.inGuild()) { // message was sent in a server, not through a DM
            console.log(`${this.message.channel.name}: ${this.message.content}`);
        }
    }
}
