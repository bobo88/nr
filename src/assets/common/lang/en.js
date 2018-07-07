import enLocale from 'element-ui/lib/locale/lang/en'

export const message = {
  language: 'language',
  welcome: 'Welcome',
  welcomeTo: 'Welcome to',
  contactUs: 'If you have any questions while using the system, please contact Bob Yuan (bo.yuan@transsnet.com)',
  navTitle: {
    home: 'Home',
    contentApproval: 'Content Approval',
    contentManagement: 'Content Management',
    videoManagement: 'Video Management',
    listManagement: 'List Management',
    musicManagement: 'Music Management',
    dataQuery: 'Data Query'
  },
  // 提示信息相关
  PromptInformation: {
    sure: 'Sure',
    cancel: 'Cancel',
    OK: 'OK',
    YES: 'YES',
    NO: 'NO',
    prompt: 'Tips',
    successfulOperation: 'Successful Operation',
    canceled: 'Canceled',
    areYouSure: 'Are you sure you want to do this?'
  },
  startDate: 'Start date',
  endingDate: 'Ending date',
  selectDate: 'Select date',
  userID: 'User ID',
  search: 'Search',
  save: 'Save',
  edit: 'Edit',
  recommend: 'Recommend',
  operation: 'Operation',
  approve: 'Approve',
  delete: 'Delete',
  inTotal: 'in total',
  page: 'page',
  gotoPage: 'go to page',

  // 内容审核
  contentApproval: {
    description: 'Description',
    screenshots: 'Screenshots',
    approveSelected: 'Approve(Selected)',
    deleteSelected: 'Delete(Selected)'
  },

  // 内容管理
  contentManagement: {
    description: 'Description',
    play: 'Play',
    realLikes: 'Real likes',
    likesShowed: 'Likes Showed',
    realViews: 'Real Views',
    viewsShowed: 'Views Showed',
    selectListType: 'Select List Type',
    popularInterference: 'Popular Interference',
    latestInterference: 'Latest Interference'
  },

  // 音乐管理
  musicManagement: {
    add: 'Add',
    addMusicTit: 'Add Music',
    title: 'Title',
    description: 'Description',
    duration: 'Duration',
    audition: 'Audition',
    rankingInterference: 'Ranking Interference',
    addMusic: {
      musicFileUpload: 'Music file upload',
      mustMP3Format: 'Must MP3 format',
      enterMusicName: 'Please enter the name of the music',
      noMoreThan40Characters: 'No more than 40 characters',
      browseUpload: 'Browse upload',
      uploadCompleted: 'Upload completed',
      uploadMustMP3: 'Upload music files can only be MP3 format!',
      uploadMax50MB: 'Uploaded music file size can not exceed 50MB!',
      uploading: 'Uploading ...'
    }
  },

  // 数据查询
  dataQuery: {
    comingSoon: 'Coming Soon!'
  },
  ...enLocale
};
