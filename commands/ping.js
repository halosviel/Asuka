module.exports = {
    name: "ping",
    async run(message, _) {
        const now = Date.now();
        const ping = now - message.createdTimestamp;

        await message.channel.send(`pong~ in ${ping}ms!`);
    },
};