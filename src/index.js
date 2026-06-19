require("dotenv").config();
const fs = require("fs");
const path = require("path");

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    ActivityType,
    PresenceUpdateStatus,
    Events
} = require("discord.js");

const PREFIX = ".";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "..", "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("name" in command && "execute" in command) {
        client.commands.set(command.name, command);
    } else {
        console.log(`command ${filePath} missing a required "name" or "execute" property..?`);
    };
};

client.once(Events.ClientReady, async () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const statusType = process.env.BOT_STATUS || "online";
    const activityType = process.env.ACTIVITY_TYPE || "PLAYING";
    const activityName = process.env.ACTIVITY_NAME || "Discord";

    const activityTypeMap = {
        "PLAYING": ActivityType.Playing,
        "WATCHING": ActivityType.Watching,
        "LISTENING": ActivityType.Listening,
        "STREAMING": ActivityType.Streaming,
        "COMPETING": ActivityType.Competing
    };

    const statusMap = {
        "online": PresenceUpdateStatus.Online,
        "idle": PresenceUpdateStatus.Idle,
        "doNotDisturb": PresenceUpdateStatus.DoNotDisturb,
        "invisible": PresenceUpdateStatus.Invisible
    };

    client.user.setPresence({
        status: statusMap[statusType],
        activities: [{
            name: activityName,
            type: activityTypeMap[activityType],
        }]
    });

    console.log(`Bot status set to ${statusType}`);
    console.log(`Bot activity set to ${activityType} ${activityName}`);
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("Error while executing command");
    };
});

client.login(process.env.BOT_TOKEN);