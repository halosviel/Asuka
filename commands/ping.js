module.exports = {
    name: "ping",
    help: `
Usage: ping [OPTIONS?]

OPTIONS
  -h  prints this help
    `,
    async run(message, _) {
        const now = Date.now();
        const ping = now - message.createdTimestamp;

        await message.channel.send(`pong~ in ${ping}ms!`);
    },
};