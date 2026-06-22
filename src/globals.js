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
        "ONLINE": PresenceUpdateStatus.Online,
        "IDLE": PresenceUpdateStatus.Idle,
        "DO_NOT_DISTURB": PresenceUpdateStatus.DoNotDisturb,
        "INVISIBLE": PresenceUpdateStatus.Invisible
    },
    
    activityTypeMap = {
        "PLAYING": ActivityType.Playing,
        "WATCHING": ActivityType.Watching,
        "LISTENING": ActivityType.Listening,
        "STREAMING": ActivityType.Streaming,
        "COMPETING": ActivityType.Competing
    }
}