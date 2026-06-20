module.exports = {
    name: "ping",
    async run(message) {
        const now = Date.now();
        const ping = now - message.createdTimestamp;

        await message.channel.send(`pong~! In ${ping}ms`);
    },
};