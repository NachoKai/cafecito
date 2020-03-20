const axios = require("axios");

const {
    telegramConfig: { BOT_ID, CHAT_ID },
} = require("../config");

const BASE_API = "https://api.telegram.org";

class Telegram {
    sendTelegramMessage(message) {
        const botId = BOT_ID;
        const chatId = CHAT_ID;

        if (!botId || !chatId) {
            return;
        }

        const telegramMsg = encodeURIComponent(message);

        const url = `${BASE_API}/${botId}/sendMessage?chat_id=${chatId}&text=${telegramMsg}`;
        axios.get(url);
    }
}

module.exports = Telegram;
