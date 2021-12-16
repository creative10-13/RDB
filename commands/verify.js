const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'verify',
    descrption: "Verify user",
    execute(message, args){
        console.log("verify command was messaged");

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        var randomWords = require('random-words');

        const { createCanvas, loadImage, Canvas } = require('canvas')
        const canvas = createCanvas(200, 200)
        const ctx = canvas.getContext('2d')

        var text = randomWords(1)

        ctx.font = '30px Impact'
        ctx.rotate(0.1)
        ctx.fillText(text, 50, 100)

        var txt = ctx.measureText(txt)
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'
        if (getRandomInt(2) == 1){
            ctx.beginPath()
            ctx.lineTo(50, 102)
            ctx.lineTo(50 + txt.width, 102)
            ctx.stroke()
        }

        const Attachment = new MessageAttachment(canvas.toBuffer())

        message.channel.send({ content: "please reply with the text in the attached image, you only have 3 minutes, iT iS cAsE sEnSiTiVe, the underline is fake", files: [Attachment] })

        const filter = m => m.author.id === message.author.id

        message.channel.awaitMessages({filter, max: 1, time: 300000,})
            .then(collected => {
                if (collected.first().content == text){
                    message.channel.send("you have sucsefuly passed the easiest verification system")
                }else{console.log("err" + collected + " " + text)}
            });
    }
}