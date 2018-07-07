var merge = require('webpack-merge')
var prodPublishEnv = require('./prod_publish.env')
var prodTestEnv = require('./prod_test.env')

module.exports = merge(prodPublishEnv,prodTestEnv, {
  NODE_ENV: '"development"',

  DOMAIN_HTML: '"/"',
  DOMAIN_RESOURCE: '"/"',

  IMG_BASE_URL: '"http://www.ddcshfw.com/nanrong/upload/images/"',
  // IMG_BASE_URL: '"http://192.168.1.104/nanrong/upload/images/"',
  // IMG_CDN_BASE_URL: '"http://cdn.palmplaystore.com/static/"',
  // UPLOAD_BASE_URL: '"http://manager.palmplaystore.com/PalmplayUpload/"',
  API_BASE_URL: '"/api"',		// 本地版本（代理）

  DEBUG: true,
  TITLE: '"YoAds Admin"',

  API_NORMAL_TIMEOUT: 30,
  API_UPLOAD_TIMEOUT: 300,

  USER_ID: 0,
  USER_TOKEN: '""'
})
