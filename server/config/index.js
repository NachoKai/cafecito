const dotenv = require("dotenv");
const isDev = process.env.NODE_ENV !== "production";

const envFile = isDev ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

const config = {
    isDev,
    URL: process.env.URL,
    PORT: Number(process.env.PORT),
    PASSWORD_EDITOR: process.env.PASSWORD_EDITOR,
    ACCESS_KEY_MP: process.env.ACCESS_KEY_MP,
};

const dbConfig = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
};

const telegramConfig = {
    BOT_ID: process.env.TELEGRAM_BOTID,
    CHAT_ID: process.env.TELEGRAM_CHATID,
};

const cafeConfig = {
    FIRST_NAME: process.env.FIRST_NAME,
    LAST_NAME: process.env.LAST_NAME,
    PROFILE_PHOTO: process.env.PROFILE_PHOTO,
    TWITTER: process.env.TWITTER,
    SHOW_DATE_COFFEE: process.env.SHOW_DATE_COFFEE === "true" ? true : false,
};

module.exports = { config, dbConfig, telegramConfig, cafeConfig };
