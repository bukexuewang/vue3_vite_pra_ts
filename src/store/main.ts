import { defineStore } from 'pinia'

const delayAdd = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('111')
    }, 1000)
  })

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    count: 0,
  }),
  getters: {
    countMul: (state) => state.count * 10 ** 2,
  },
  actions: {
    async countChange() {
      await delayAdd()
      this.count++
    },
  },
})
