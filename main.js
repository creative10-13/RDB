//Everything under this is to setup
const Discord = require('discord.js')

const { Client, Collection, Intents } = require('discord.js');

require('dotenv').config()

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: myIntents });

const prefix  = process.env.PREFIX;

const fs = require('fs');

client.commands = new Collection();

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandfiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

function GC(command, msg, arg) {
    client.commands.get(command).execute(msg, arg)
}

//everything under this are commands or others
client.once('ready', () => {
    console.log('RDS is online!');
});

client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    

    if (command === 'ping'){
        GC('ping', message, args)
    }
    else if (command === 'setup'){
        GC('setup', message, args)
    };
});

client.login(process.env.TOKEN);
