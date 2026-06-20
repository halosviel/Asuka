// just logs the error in console & in chat.
module.export = function sendError(message, commandName, err) {
    console.error(`[${commandName}] cmd exec err: ${err}`);
    message.channel.send("```diff\n❌️ COMMAND EXECUTION FAILURE\n- " + err + "```");
}