module.exports = {
    name: 'setup',
    descrption: "setup server rates",
    execute(message, args){
        function sendmsg(msg) {
            message.channel.send(msg)
        }
        console.log("setup command was messaged");
        if (message.author.id === message.guild.ownerId){
            const filter = m => m.author.id === message.author.id
            sendmsg("please message the text channel where you want the server rating to be")
            message.channel.awaitMessages({filter, max: 1, time: 300000, errors: ['time'] })
            .then(collected => {
                var save = collected.first().mentions.channels.first()
                sendmsg(save)
                console.log(collected)
            })

        }
        else {
            sendmsg("you are not able to setup, please tell the owner to setup this bot")
            return
        }
    }
}