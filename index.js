const TelegramApi = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const {gameOptions, againOptions} = require('./options')

const chats = {}
dotenv.config()

const tgToken = process.env.Token;

const bot = new TelegramApi(tgToken, {polling: true})

bot.setMyCommands([
    {command: '/start', description: 'Salomlashish'},
    {command: '/info', description: 'sz haqingizda informatsiya bersh'},
    {command: '/game', description: 'oyn raqamni top'}
])

const gameFunc = async (chatId) => {
    await bot.sendMessage(chatId, 'Hozir men 0 dan 9 gacha son oylayman siz topishingiz kerak')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `toping`, gameOptions)
}

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
        if(text === '/game') {
            return gameFunc(chatId)
        }
        return bot.sendMessage(chatId, `Men sizni chunmayapman`)
    })

    bot.on('callback_query', (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id; 
        if(data === '/again') {
            return gameFunc(chatId);
        }
        if(data === chats[chatId]) {
            return bot.sendMessage(chatId, 'Tabriklayman siz toptingiz', againOptions)
        } else {
            return bot.sendMessage(chatId, `Afsuski sz topa olmadingiz, u raqam ${chats[chatId]} edi`, againOptions)
        }
    })
}

start()







// if(text === 'nma gap' || text === 'Nma gap' || text === 'Nima gap' || text === 'nima gap') {
//     return bot.sendMessage(chatId, 'Tinch ozinch')
// }
// if(text === 'tinch' || text === 'Tinch') {
//     return bot.sendMessage(chatId, 'Tinch bol')
// }
// if(text === 'hop rahmat' || text === 'Hop raxmat' || text === 'Hop rahmat' || text === 'hop raxmat') {
//     return bot.sendMessage(chatId, 'Ok')
// }