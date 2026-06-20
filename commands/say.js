module.exports = {
    name: "say",
    async run(message) {
        await message.reply(message);
    },
};