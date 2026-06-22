const client = require("../src/globals.js").client

module.exports = {
    name: "activityctl",
    help: {
        usage: "activityctl [MESSAGE | OPTIONS] [MESSAGE?]",
        options: [{
            names: ["s", "status"],
            description: "changes my status text"
        },
        {
            names: ["t", "type"],
            description: " changes my activity type (playing, watching, listening, streaming, competing)"
        }]
    },
    async run(message, args) {
        const flag = args[0];

        if (flag == "-s" || flag == "--status") {
            args.shift();

            // lowk buns str formatting lol.. WHERE IS TABLE.CONCAT EQUIV!??
            let finalStr = "";
            args.forEach(str => {
                finalStr = `${finalStr}${finalStr  === "" ? "" : " "}${str}`
            });
    
            client.user.setPresence({
                activities: [{
                    name: finalStr
                }]
            });
    
            await message.channel.send(`updated my activity to '${finalStr}'!`);
        } else if (flag == "-t" || flag == "--type") {
            await message.channel.send(`this flag isn't programmed yet!!`);
        } else {
            await message.channel.send(`I don't recognise the flag '${flag}'!`);
        }
    },
};