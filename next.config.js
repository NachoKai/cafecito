const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

const { config, cafeConfig } = require("./server/config");

module.exports = withCSS(
    withSass({
        env: {
            ...cafeConfig,
            URL: config.URL,
            BRANCH: process.env.BRANCH,
        },
        cssModules: true,
        cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: "[local]__[hash:base64:5]",
        },
    })
);
