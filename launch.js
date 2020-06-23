const App = require("./src/index");
var secret = require("./secret");
const fs = require('fs')
const Telebot = require('telebot');
const bot = new Telebot({
	token: secret.bottoken,
	limit: 1000,
        usePlugins: ['commandButton']
});

bot.start(); //Telegram bot start

bot.on(/^\/run(.+)$/i, (msg, props) => {
    var Para = props.match[1].split(' ');
    var Username = Para[1].toLowerCase();
    console.log(Username)
    if (fs.existsSync('/var/www/html/' + Username + '.png')) {
        console.log("Exist")
        bot.sendPhoto(msg.chat.id, "http://v2.bolverblitz.net/" + Username + ".png").then(function(Output) {
            msg.reply.text(`Made by: https://github.com/duiker101/twitter-interaction-circles\nTelegram version made by @BolverBlitz\nDownload full png: http://v2.bolverblitz.net/${Username}.png`);
        });
    }else{
        App.main(Username).then(function(Output) {
            bot.sendPhoto(msg.chat.id, "http://v2.bolverblitz.net/" + Username + ".png").then(function(Output) {
                msg.reply.text(`Made by: https://github.com/duiker101/twitter-interaction-circles\nTelegram version made by @BolverBlitz\nDownload full png: http://v2.bolverblitz.net/${Username}.png`);
            });
        }).catch(error => msg.reply.text(`ImgGen Error: ${error.errors[0].message}`));
      }
});