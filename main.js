const { Client, Intents } = require('discord.js');
//This will fetch the json file, 
const Info = require('./INFO.json')

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: myIntents });

const prefix  = Info.prefix;

client.once('ready', () => {
    console.log('RDS is online!');
});

client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    function sendmsg(msg) {
        message.channel.send(msg)
    }

    if (command === 'ping'){
        console.log("ping command was messaged");
        sendmsg('Pong!');
    }
    else if (command === 'setup'){
        console.log("setup command was messaged");
        if (message.author.id === message.guild.ownerId){
            const owner = message.author
            sendmsg("you are the owner")
            return
        }
        else {
            sendmsg("you are not able to setup, please tell the owner to setup this bot")
            return
        }
    };
});

client.login(Info.token);
