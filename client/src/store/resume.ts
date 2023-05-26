import { defineStore } from 'pinia'

const resumeStore = defineStore('resume', {
  state: () => ({
    themeColor: '',
    userBaseInfo: {
      name: '小凤',
      sex: '女',
      birthDay: '2020-10-05',
      phone: '13622223333',
      email: 'cqupt@163.com',
      nativePlace: '北京',
    }
  }),
  getters: {

  },
  actions: {
    updateThemeColor(newColor: string) {
      this.themeColor = newColor;
    }
  }
})

export default resumeStore;