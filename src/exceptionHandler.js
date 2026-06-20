// just logs the error in console & in chat.
module.exports = function emitFatalError(message, commandName, err) {
    console.error(`[${commandName}] FATAL CMD EXEC ERR: ${err}`);
    message.channel.send(
        "```diff" +
        "\n❌️ FATAL" +
        `\ncommand: ${commandName}` +
        `\n- ${err}` +
        "```"
    );
}