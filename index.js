const Token = '7329613415:AAHbwJsW0fTR8vyBlTw1OAM967mz0DGuf8M'
const TelegramApi = require('node-telegram-bot-api');

const bot = new TelegramApi(Token, {polling: true})

bot.setMyCommands([
    {command: '/start', description: 'Salomlashish'},
    {command: '/info', description: 'sz haqingizda informatsiya bersh'}
])

const start = () => {
    bot.on('message', (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start') {
            // bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/364/159/364159a8-d72f-4a04-8aa1-3272dd144b06/8.jpg')
            return bot.sendMessage(chatId, `Asalomu alecom Abduqodir coinga hush kelipsz`)
        }  
        if(text === '/info') {
            return bot.sendMessage(chatId, `szi ismiz ${msg.from.first_name}`)
        }
        if(text === 'nma gap' || text === 'Nma gap' || text === 'Nima gap' || text === 'nima gap') {
            return bot.sendMessage(chatId, 'Tinch ozinch')
        }
        if(text === 'tinch' || text === 'Tinch') {
            return bot.sendMessage(chatId, 'Tinch bol')
        }
        if(text === 'hop rahmat' || text === 'Hop raxmat' || text === 'Hop rahmat' || text === 'hop raxmat') {
            return bot.sendMessage(chatId, 'Ok')
        }
        if(text === '/game')
        return bot.sendMessage(chatId, `Men sizni chinmayapman`)
    })
}

start()