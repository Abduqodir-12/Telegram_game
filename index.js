const TelegramApi = require('node-telegram-bot-api');
const Token = '7329613415:AAHbwJsW0fTR8vyBlTw1OAM967mz0DGuf8M'

const bot = new TelegramApi(Token, {polling: true})

const chats = {}

const gameOptions = {
    replay_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}]
        ] 
    })
}

const againOptions = {
    replay_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Yana bir marta oynash', callback_data: '0'}]
        ] 
    })
}

bot.setMyCommands([
    {command: '/start', description: 'Salomlashish'},
    {command: '/info', description: 'sz haqingizda informatsiya bersh'},
    {command: '/game', description: 'oyn raqamni top'}
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
        if(text === '/game') {
            bot.sendMessage(chatId, 'Hozir men 0 dan 9 gacha son oylayman siz topishingiz kerak')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, `toping`, gameOptions)
        }
        return bot.sendMessage(chatId, `Men sizni chunmayapman`)
    })

    bot.on('callback_query', (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
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