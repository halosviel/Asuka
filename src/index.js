// load config (must be done asap)
require("dotenv").config();

// built-in node.js modules
const fs = require("fs");
const path = require("path");

// my imports :D
const emitFatalError = require("./exceptionHandler.js")
const client = require("./globals.js").client

// discord.js packages
const {
    Collection,
    ActivityType,
    PresenceUpdateStatus,
    Events
} = require("discord.js");
const strict = require("assert/strict");

// Add commands to custom d.js array
client.commands = new Collection(); // create d.js custom array

const commandsPath = path.join(__dirname, "..", "commands") // where __dirname is /home/halosviel/Local/Projects/Asuka/src & ".." is 1dir up
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js")); // grab array of file names & exclude non ".s" suffixes

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // validate for name str + run()
    if (!("name" in command)) {
        console.error(`missing entry "name" - for command ${file}`);
        continue;
    };
    if (typeof(command.name) !== "string") {
        console.error(`string expected for entry "name", got ${typeof(command.name)} - for command "${file}"`);
        continue;
    };

    if (!("help" in command)) {
        console.error(`missing entry "help" - for command ${file}`);
        continue;
    };
    if (typeof(command.help) !== "object") {
        console.error(`object expected for entry "help", got ${typeof(command.help)} - for command "${file}"`);
        continue;
    };

    if (!("run" in command)) {
        console.error(`missing function "run" for command ${file}`);
        continue;
    };
    if (typeof(command.run) !== "function") {
        console.error(`function expected for entry "run", got ${typeof(command.run)} - for command "${file}"`);
        continue;
    };

    // write k,v pair to commands dict
    client.commands.set(command.name, command);
};

const statusMap = {
    "ONLINE": PresenceUpdateStatus.Online,
    "IDLE": PresenceUpdateStatus.Idle,
    "DO_NOT_DISTURB": PresenceUpdateStatus.DoNotDisturb,
    "INVISIBLE": PresenceUpdateStatus.Invisible
};

const activityTypeMap = {
    "PLAYING": ActivityType.Playing,
    "WATCHING": ActivityType.Watching,
    "LISTENING": ActivityType.Listening,
    "STREAMING": ActivityType.Streaming,
    "COMPETING": ActivityType.Competing
};

// set presence on ready
client.once(Events.ClientReady, async () => {
    console.log("running")

    const statusType = process.env.BOT_STATUS || "ONLINE";
    const activityType = process.env.ACTIVITY_TYPE || "PLAYING";
    const activityName = process.env.ACTIVITY_NAME || "Discord";

    client.user.setPresence({
        status: statusMap[statusType],
        activities: [{
            name: activityName,
            type: activityTypeMap[activityType],
        }]
    });

    //console.log(`Bot status set to ${statusType}`);
    //console.log(`Bot activity set to ${activityType} ${activityName}`);
});

// detect every new message (questionable - no wonder why its legacy LOL)
client.on(Events.MessageCreate, async message => {
    if (message.author.bot){
        return;
    }
    if (!message.content.startsWith(process.env.BOT_PREFIX)) {
        return;
    }

    // get everything after the command, separated by a space (table.concat equiv. reversed)
    const args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // fetch command (required module)
    // TODO: validation here? idk, it'll just be clone
    const command = client.commands.get(commandName);
    if (!command) {
        return;
    }
    
    try {
        // help cmd
        if (args[0] == "-h" || args[0] == "--help") {
            let optionsStr = ""
            const optionsList = [...command.help.options] // clone array; diff from lua wtf

            optionsList.push({
                names: ["h", "help"],
                description: "prints this help"
            })

            optionsList.forEach(option => {
                const str = `\n-${option.names[0]}     --${option.names[1]}       ${option.description}`;
                optionsStr = optionsStr + str;
            });
            
            message.channel.send(
                `**Usage:** ${command.help.usage}` +
                `\n\n**OPTIONS:**` +
                optionsStr
            );

            return;
        };

        // run cmd
        await command.run(message, args);
    } catch (err) {
        await emitFatalError(message, commandName, err)
    };
});

client.login(process.env.BOT_TOKEN);