// just logs the error in console & in chat.
module.export = function sendError() {
    console.error(`[${commandName}] cmd exec err: ${err}`);
    await message.channel.send("```diff\n❌️ COMMAND EXECUTION FAILURE\n- " + err + "```");
}