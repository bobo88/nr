/**
 * 配置文件：用于配置相关参数，如网络请求地址、静态资源的访问路径等
 */

'use strict'

const config = {}

/**
 * 网页的请求域名
 */
config.DOMAIN_HTML = process.env.DOMAIN_HTML

/**
 * 网页的文件上传请求域名
 */
config.UPLOAD_BASE_URL = process.env.UPLOAD_BASE_URL

/**
 * 项目的主题
 */
config.TITLE = process.env.TITLE

/**
 * 静态资源的请求域名
 */
config.DOMAIN_RESOURCE = process.env.DOMAIN_RESOURCE

/**
 * API请求类型(用来区分同一个api在哪个地方调用)
 *    1：APP
 *    2：微信
 * @type {string|number}
 */
config.REQ_TYPE = process.env.REQ_TYPE
/**
 * API请求类型(api字段不带yun的api 认证type值)
 *
 * @type {string|number}
 */
config.APP_REQ_TYPE = process.env.APP_REQ_TYPE

/**
 * API请求密钥
 * @type {string}
 */
config.API_KEY = process.env.API_KEY

/**
 * API的请求地址（不包括API名称），必须/结尾
 * 示例：http://dev.api.com/v1/
 * @type {string}
 */
config.API_BASE_URL = process.env.API_BASE_URL

/**
 * 图片的URL地址，必须/结尾
 * 示例：http://dev.img.com/v1/
 * @type {string}
 */
config.IMG_BASE_URL = process.env.IMG_BASE_URL

/**
 * API请求的超时时间（普通），单位：毫秒（ms）
 * @type {number}
 */
config.API_NORMAL_TIMEOUT = process.env.API_NORMAL_TIMEOUT * 1000

/**
 * API请求的超时时间（上传），单位：秒（s）
 * @type {number}
 */
config.API_UPLOAD_TIMEOUT = process.env.API_UPLOAD_TIMEOUT

/**
 * 系统的DEBUG状态：
 * 开启则会出现一些DEBUG的提示信息或工具按钮等，以便于更好的开发调试
 * @type {boolean}
 */
config.DEBUG = process.env.DEBUG

/**
 * 引入 iframe 的URL
 * @type {string}
 */
config.IFRAME_URL = process.env.IFRAME_URL

/**
 * 用户登录身份id
 * @type {string|number}
 */
config.USER_ID = process.env.USER_ID

/**
 * 用户登录身份token
 * @type {string|string}
 */
config.USER_TOKEN = process.env.USER_TOKEN
export default config

