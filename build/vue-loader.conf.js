var utils = require('./utils')
var config = require('../config')

var isProduction = process.env.NODE_ENV === 'production_publish'
var isProductionTest = process.env.NODE_ENV === 'production_test'

var sourceMap = '';
if (isProduction) {
  sourceMap = config.build_publish.productionSourceMap
} else if (isProductionTest) {
  sourceMap = config.build_test.productionSourceMap
} else {
  sourceMap = config.dev.productionSourceMap
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMap,
    extract: isProduction || isProductionTest
  })
}
