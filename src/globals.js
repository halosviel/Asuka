const {
    Client,
    GatewayIntentBits,
    Partials,
} = require("discord.js");

// instantiate class - singleton??
// see constructor -> https://discord.js.org/docs/packages/discord.js/main/
module.exports = {
    client: new Client({
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
    }),

    statusMap = {
        "online": PresenceUpdateStatus.Online,
        "idle": PresenceUpdateStatus.Idle,
        "donotdisturb": PresenceUpdateStatus.DoNotDisturb,
        "invisible": PresenceUpdateStatus.Invisible
    },
    
    activityTypeMap = {
        "playing": ActivityType.Playing,
        "watching": ActivityType.Watching,
        "listening": ActivityType.Listening,
        "streaming": ActivityType.Streaming,
        "competing": ActivityType.Competing
    }
}