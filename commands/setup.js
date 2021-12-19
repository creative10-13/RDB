module.exports = {
    name: 'setup',
    descrption: "setup server rates",
    execute(message, args){
        //functions and variables
        const fs = require('fs');

        const prefix  = process.env.PREFIX;

        function sendmsg(msg) {
            message.channel.send(msg)
        }

        function error(err) {console.log(err);}

        //main script
        console.log("setup command was messaged");

        if (message.author.id === message.guild.ownerId){
            const filter = m => m.author.id === message.author.id
            sendmsg("please message the text channel where you want the server rating to be")
            message.channel.awaitMessages({filter, max: 1, time: 300000, errors: ['time'] })
            .then(collected => {
                var save = collected.first().mentions.channels.first().toString()

                var servername = message.guild.name

                var saveobj = {
                  "servername": servername,
                  "serverdetails": {
                      "setup": true,
                      "ratingchannel": save
                  }
                };
                sendmsg(save + " is now the server rating channel")
                
                sendmsg("please also message the staff role for access to staff commands")
                message.channel.awaitMessages({filter, max: 1, time: 300000, errors: ['time'] })
                .then(collected => {

                    save = collected.first().mentions.roles.first().toString()
                    saveobj.serverdetails.staffrole = save
                    sendmsg(save + "is now the staff role")
                    
                    var data = JSON.stringify(saveobj, null, 2)

                    fs.writeFile('../storage.json', data, err => {
                        if (err) {error(err)}else{
                            sendmsg("The settings is saved successfully")
                            console.log(saveobj)
                        }
                    });
                })
            })

        }
        else {
            sendmsg("you are not able to setup, please tell the owner to setup this bot")
            return
        }
    }
}
//jsonsave script
/*
fs.writeFile(storage, JSON.stringify(saveobj), err => {
    if (err) {error(err)}else{

    }
    });
*/