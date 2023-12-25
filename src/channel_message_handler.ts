import { Message, DMChannel } from "discord.js";
import * as math from "mathjs";

export { ChannelMsgLogger, MathChannelHandler, GeneralChannelHandler };

class ChannelMsgLogger {

    private static channelStack = ""; // holds the most recent channel name

    constructor() {
    }

    public static logMessageInfo(message: Message) {
        if (message.inGuild()) { // message was sent in a server, not through a DM
            ChannelMsgLogger.logChannelStack(message.channel.name); // === ChannelName ===
            console.log(`${message.author.username}: ${message.content}`); // user: message
        }
    }

    // if a user types in a new channel, then we want to log the channel name. otherwise, we keep
    // logging the message info in the same channel stack
    // 
    // === Channel1 ===
    // user1: hello
    // user2: hi
    //
    // === Channel2 ===
    // user1: bruh
    private static logChannelStack(channelName: string) {
        if (ChannelMsgLogger.channelStack !== channelName) {
            console.log(); // new line
            console.log(`=== ${channelName} ===`);
            ChannelMsgLogger.channelStack = channelName;
        }
    }
}



class ChannelMsgHandler {
    constructor() {
    }

}

class GeneralChannelHandler extends ChannelMsgHandler {
    constructor() {
        super();
    }
}

class MathChannelHandler extends ChannelMsgHandler {

    static variable_map = new Map(); // stores variables and their values

    constructor() {
        super();
    }

    public static parseMessage(message: Message) {
        MathChannelHandler.variable_map.clear(); // clear the variable map
        let msgLines = message.content.split("\n"); // each line in the message
        for (let line of msgLines) {
            if (line.startsWith("let")) { // variable declaration
                line = line.replace("let", "").trim(); // get rid of 'let' and any whitespace
                let var_value = line.split("="); // split the variable name and value
                for (let i = 0; i < var_value.length; i++) { // loop over {variable name, value}
                    var_value[i] = var_value[i].trim(); // get rid of any whitespace
                }
                var_value[1] = math.evaluate(var_value[1], MathChannelHandler.variable_map); // evaluate the value if necessary
                MathChannelHandler.variable_map.set(var_value[0], var_value[1]); // add variable_name : value to map
            } else if (line.startsWith("evaluate")) {
                console.log("EVALUATING...")
                line = line.replace("evaluate", "").trim(); // get rid of 'evaluate' and any whitespace
                return math.evaluate(line, MathChannelHandler.variable_map); // evaluate and return
            }
        }
    }
}


