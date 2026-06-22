const client = require("../src/globals.js").client

module.exports = {
    name: "setstatus",
    help: {
        usage: "setstatus [MESSAGE]",
        options: []
    },
    async run(message, args) {
        // lowk buns str formatting lol.. WHERE IS TABLE.CONCAT EQUIV!??
        const finalStr = ""
        args.forEach(str => {
            finalStr = `${finalStr} ${str}`
        });

        client.user.setPresence({
            activities: [{
                name: finalStr
            }]
        });

        await message.channel.send(`Activity set to "${finalStr}"!`);
    },
};