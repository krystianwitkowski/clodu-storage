import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDropdownFiles: false,
    files: []
  },
  mutations: {
    toggleDropdownFiles(state, payload){
      if(typeof payload === "boolean"){
        return state.isDropdownFiles = false
      }

      else {
        return state.isDropdownFiles = !state.isDropdownFiles
      }
    },
    addFile(state, payload){
      return state.files = [...state.files, payload[0]]
    },
    addFiles(state, payload){
      return state.files = payload
    }
  },
  actions: {},
  modules: {}
});
