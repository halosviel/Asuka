module.exports = {
    name: "ping",
    async execute(message) {
        const sent = await message.reply("Pinging...");
        const pingTime = sent.createdTimestamp - message.createdTimestamp;

        await sent.edit(`Bot Latency: ${pingTime}ms\nAPI Latency: ${Math.round(message.client.ws.ping)}ms`);
    },
};