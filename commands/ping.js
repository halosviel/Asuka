module.exports = {
    name: "ping",
    help: {
        usage: "ping [OPTIONS?]",
        options: [
            {
                names: ["h", "help"],
                description: "prints this help"
            }
        ]
    },
    async run(message, _) {
        const now = Date.now();
        const ping = now - message.createdTimestamp;

        await message.channel.send(`pong~ in ${ping}ms!`);
    },
};