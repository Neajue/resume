import { defineStore } from 'pinia'

const userStore = defineStore('user', {
  state: () => ({
    accountName: '',
    userId: '',
  }),
  getters: {

  },
  actions: {
    updateAccountName(newName: string) {
      this.accountName = newName;
    },
    setUserId(id: string) {
      this.userId = id;
    }
  }
})

export default userStore;