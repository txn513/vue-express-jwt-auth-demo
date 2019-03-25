
const target = process.env.npm_lifecycle_event;
if (target == 'testdev') {
    //开发测试
    var obj = {
        NODE_ENV: '"production"'
        ,API_ROOT: '""'
        ,TEST_USERNAME: '""'
        ,TEST_PASSWORD: '""'
        ,API_FLAGSTRING: '"-testdev"'
        ,DEMO_MENU: false
        ,IMG_URL: '""'
        ,APP_QRCode : '""'
    }
} else if (target == 'test') {
    //测试
    var obj = {
        NODE_ENV: '"production"'
        ,API_ROOT: '""'
        ,TEST_USERNAME: '""'
        ,TEST_PASSWORD: '""'
        ,API_FLAGSTRING: '"-test"'
        ,DEMO_MENU: false
        ,IMG_URL: '""'
        ,APP_QRCode : '""'
    }
} else {
    //线上
    var obj = {
        NODE_ENV: '"production"'
        ,API_ROOT: '""'
        ,TEST_USERNAME: '""'
        ,TEST_PASSWORD: '""'
        ,API_FLAGSTRING: '""'
        ,DEMO_MENU: false
        ,IMG_URL: '""'
        ,APP_QRCode : '""'
    }
}

module.exports = obj;
