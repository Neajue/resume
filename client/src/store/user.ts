import { defineStore } from 'pinia'

const userStore = defineStore('user', {
  state: () => ({
    name: '',
  }),
  getters: {

  },
  actions: {
    updateName(newName: string) {
      this.name = newName;
    }
  }
})

export default userStore;