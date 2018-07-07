import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

export const message = {
  language: '语言',
  welcome: '欢迎您',
  welcomeTo: '欢迎您',
  contactUs: '使用过程中如有疑问请联系袁波 (bo.yuan@transsnet.com)',
  navTitle: {
    home: '首页',
    contentApproval: '内容审核',
    contentManagement: '内容管理',
    videoManagement: '视频管理',
    listManagement: '榜单管理',
    musicManagement: '音乐管理',
    dataQuery: '数据查询'
  },
  // 提示信息相关
  PromptInformation: {
    sure: '确定',
    cancel: '取消',
    OK: 'OK',
    YES: '确定',
    NO: '取消',
    prompt: '提示',
    successfulOperation: '操作成功',
    canceled: '已取消操作',
    areYouSure: '您确定要执行此操作吗？'
  },
  startDate: '开始时间',
  endingDate: '结束时间',
  selectDate: '选择日期',
  userID: '用户ID',
  search: '查询',
  save: '保存',
  edit: '编辑',
  recommend: '是否推荐',
  operation: '操作',
  approve: '审核',
  delete: '删除',
  inTotal: '总计',
  page: '页',
  gotoPage: '前往',

  // 内容审核
  contentApproval: {
    description: '视频描述',
    screenshots: '视频截屏图片',
    approveSelected: '审核(选中)',
    deleteSelected: '删除(选中)'
  },

  // 内容管理
  contentManagement: {
    description: '视频描述',
    play: '视频播放',
    realLikes: '真实like数',
    likesShowed: '显示like数',
    realViews: '真实观看数',
    viewsShowed: '显示观看数',
    selectListType: '请选择榜单类型',
    popularInterference: 'Popular干预',
    latestInterference: 'Latest干预'
  },

  // 音乐管理
  musicManagement: {
    add: '新增',
    addMusicTit: '新增音乐',
    title: '音乐名称',
    description: '音乐描述',
    duration: '音乐时长',
    audition: '音乐试听',
    rankingInterference: '位置干预',
    addMusic: {
      musicFileUpload: '音乐文件上传',
      mustMP3Format: '必须MP3格式',
      enterMusicName: '请输入音乐名称',
      noMoreThan40Characters: '不超过40个字符',
      browseUpload: '浏览上传',
      uploadCompleted: '上传完成',
      uploadMustMP3: '上传的音乐文件只能是 MP3 格式!',
      uploadMax50MB: '上传的音乐文件大小不能超过 50MB!',
      uploading: '正在上传中...'
    }
  },

  // 数据查询
  dataQuery: {
    comingSoon: '模块开发中，敬请期待！'
  },
  ...zhLocale
};
