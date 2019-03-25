var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
    ,API_ROOT: '"/"'
    ,TEST_USERNAME: '""'
    ,TEST_PASSWORD: '""'
    ,API_FLAGSTRING: '"-dev"'
    ,DEMO_MENU: true
    ,IMG_URL: '""'
    ,APP_QRCode : '""'
})

