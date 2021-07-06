import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDropdownFiles: false,
    files: [],
    FilesAPIStatus: { text: '', loading: false, icon: '' },
    FormAPIStatus: { text: '', loading: false, icon: '' },
    search: '',
    synchronize: true
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
    addFiles(state, payload){
      return state.files = payload
    },
    addFile(state, payload){
      return state.files = [...state.files, ...payload]
    },
    updateFile(state, payload){
      return state.files = state.files.map(file => file.id === payload.id ? { ...payload } : { ...file })
    },
    updateFilesAPIStatus(state, payload){
      return state.FilesAPIStatus = payload
    },
    updateFormAPIStatus(state, payload){
      return state.FormAPIStatus = payload
    },
    updateSearch(state, payload){
      return state.search = payload
    },
    isSynchronize(state, payload){
      return state.synchronize = payload
    }
  },
  getters: {
    searchFiles: (state) => (cb) => {
      return state.files.filter(cb).map((obj, i) => typeof i === "number" ? {...obj, file: JSON.parse(obj.file)} : { ...obj }).filter(file => file.file.name.includes(state.search))
    },
    files: (state) => (cb) => {
      return state.files.filter(cb).map((obj, i) => typeof i === "number" ? {...obj, file: JSON.parse(obj.file)} : { ...obj });
    },
    bytes: (state) => {
      const sizesFile = state.files.map(file => JSON.parse(file.file)).map(file => file.size);
      return sizesFile.reduce((accumulator, currentSize) => accumulator + currentSize, 0)
    }
  },
  actions: {},
  modules: {}
});
