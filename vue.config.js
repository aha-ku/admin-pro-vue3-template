const webpack = require('webpack');
const createThemeColorReplacerPlugin = require('./config/plugin.config');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            createThemeColorReplacerPlugin()
        ]
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,

            }
        }
    },
}

