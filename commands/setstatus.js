module.exports = {
    name: "setstatus",
    help: {
        usage: "setstatus [MESSAGE]",
        options: []
    },
    async run(message, _) {
        await message.channel.send("cmd entered, doing nothing..");
    },
};