// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var prodPublishEnv = require('./prod_publish.env')
var prodTestEnv = require('./prod_test.env')
var devEnv = require('./dev.env')

module.exports = {
  build_publish: {
    env: prodPublishEnv,
    index: path.resolve(__dirname, '../dist_publish/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist_publish'),
    // 打包后静态资源所在子目录
    assetsSubDirectory: 'static',
    // 打包后静态资源的访问路径
    assetsPublicPath: './',
    // 是否开启源码对应关系：即可查看相应的源码
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extraild argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  build_test: {
    env: prodTestEnv,
    index: path.resolve(__dirname, '../dist_test/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist_test'),
    // 打包后静态资源所在子目录
    assetsSubDirectory: 'static',
    // 打包后静态资源的访问路径
    assetsPublicPath: './',
    // 是否开启源码对应关系：即可查看相应的源码
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: devEnv,
    port: 8091,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    proxyTable: {
      '/api': {
        // target: 'http://luiyi.viphk.ngrok.org/nanrong/admin/server/',
        // target: 'http://192.168.1.104/nanrong/admin/server/',
        // target: 'http://byu4727430001.my3w.com/nanrong/admin/server/',
        target: 'http://www.ddcshfw.com/nanrong/admin/server/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
