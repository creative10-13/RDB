module.exports = {
    name: 'ping',
    descrption: "basic ping command",
    execute(message, args){
        console.log("ping command was messaged");
        message.channel.send('Pong!');
    }
}