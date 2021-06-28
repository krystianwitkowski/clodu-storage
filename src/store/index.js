import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDropdownFiles: false,
    files: [],
    apiRequest: { text: '', value: false },
    search: ''
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
    },
    toggleApiRequest(state, payload){
      return state.apiRequest = payload
    },
    updateSearch(state, payload){
      return state.search = payload
    }
  },
  actions: {},
  modules: {}
});
