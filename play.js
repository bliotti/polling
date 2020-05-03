const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const token = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN'

const bot = new TelegramBot(token, { polling: true })

bot.on('message', async (msg) => {
  var hi = 'hi'
  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    bot.sendMessage(msg.from.id, 'Hello  ' + msg.from.first_name)

    let promise = await bot.getUserProfilePhotos(msg.from.id)

    let file = await bot.getFile(promise.photos[0][0].file_id)

    bot.sendPhoto(msg.from.id, file.file_id)
  }
})

bot.on('message', async (msg) => {
  var hi = 'pics'
  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    let promise = await bot.getUserProfilePhotos(msg.from.id, { limit: 2 })
    console.log(msg.from.id)

    promise.photos.map((photo_pack) => {
      try {
        bot.sendPhoto(msg.chat.id, photo_pack[2].file_id)
      } catch (error) {
        console.log(error)
      }
    })
  }
})

bot.on('message', (msg) => {
  var bye = 'bye'
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, 'Have a nice day ' + msg.from.first_name)
  }
})

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome', {
    reply_markup: {
      keyboard: [['Sample text', 'Second sample'], ['Keyboard'], ["I'm robot"]],
    },
  })
})

bot.onText(/\/sendpic/, (msg) => {
  bot.sendPhoto(
    msg.chat.id,
    'https://raw.githubusercontent.com/hosein2398/node-telegram-bot-api-tutorial/master/pics/first%20message.JPG',
    { caption: 'Here we go ! \nThis is just a caption ' }
  )
})

bot.on('message', (msg) => {
  var Hi = 'hey'
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(
      msg.chat.id,
      '<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href="http://www.example.com/">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>',
      { parse_mode: 'HTML' }
    )
  }
})

bot.on('message', (msg) => {
  var location = 'location'
  if (msg.text.indexOf(location) === 0) {
    bot.sendLocation(msg.chat.id, 32.8892416, -79.822848)
    bot.sendMessage(msg.chat.id, 'Here is the point')
  }
})

bot.on('message', (msg) => {
  var what = 'idiot'
  if (msg.text.includes(what)) {
    bot.kickChatMember(msg.chat.id, msg.from.id)
  }
})
