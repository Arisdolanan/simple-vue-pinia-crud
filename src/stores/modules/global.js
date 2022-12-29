import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  // initial state
  state: () => ({
    counter: ref(0),
    isOpenModal: false,
  }),

  // getters
  getters: {
    getCounter(state) {
      return state.counter;
    },
    getOpenModal(state) {
      return state.isOpenModal;
    },
  },

  // actions
  actions: {
    setCounter: function () {
      this.counter++;
    },
    setOpenModal: function (payload) {
      this.isOpenModal = payload;
    },
  },
});
