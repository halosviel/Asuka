module.exports = {
    name: "ping",
    async run(message) {
        const sent = await message.reply("Pinging...");
        const pingTime = sent.createdTimestamp - message.createdTimestamp;

        await sent.eit(`Bot Latency: ${pingTime}ms\nAPI Latency: ${Math.round(message.client.ws.ping)}ms`);
    },
};