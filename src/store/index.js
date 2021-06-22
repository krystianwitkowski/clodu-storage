import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDropdownFiles: false
  },
  mutations: {
    toggleDropdownFiles(state, payload){
      if(typeof payload === "boolean"){
        return state.isDropdownFiles = false
      }

      else {
        return state.isDropdownFiles = !state.isDropdownFiles
      }
    }
  },
  actions: {},
  modules: {}
});
