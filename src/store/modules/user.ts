import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isInit: false,
      userInfo: {}
    };
  },
  getters: {
    roles: (state) => {
      return state.userInfo;
    }
  },
  actions: {}
});
