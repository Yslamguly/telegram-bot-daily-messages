require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const {sendDailyDutyNotification, sendDailyBookReadingPoll} = require("./dailyMessages");
const {askForCsvScheduleFile} = require('./monthlyMessages')
const {sendNotificationForWeeklyCleaning} = require('./weeklyMessages')
const {onChangeScheduleCommand,onChangeCleaningScheduleCommand} = require("./commandsHandler");

const token =
    process.env.NODE_ENV === 'development'
        ? process.env.SECRET_TELEGRAM_TEST_BOT_TOKEN
        : process.env.SECRET_TELEGRM_BOT_TOKEN;




// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

try{
    console.log('Bot is running')
    console.log('Test env is accessible: ' + process.env.TEST_ENV)
}catch (error){
    console.error('Error on initial run: ' + error)
}



onChangeScheduleCommand(bot)

onChangeCleaningScheduleCommand(bot)

sendDailyDutyNotification(bot);

sendNotificationForWeeklyCleaning(bot)

askForCsvScheduleFile(bot)

sendDailyBookReadingPoll(bot)



