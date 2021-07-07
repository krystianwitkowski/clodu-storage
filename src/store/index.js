import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dropdownMenu: false,
    files: [],
    FilesAPIStatus: { text: '', loading: false, icon: '' },
    FormAPIStatus: { text: '', loading: false, icon: '' },
    search: '',
    synchronize: true,
    overlay: false
  },
  mutations: {
    updateDropdownMenu(state){
      return state.dropdownMenu = !state.dropdownMenu;
    },
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
    deleteFiles(state, payload){
      const ids = payload.map(file => file.id);
      return state.files = state.files.filter(file => ids.every(id => id !== file.id))
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
    updateSynchronize(state, payload){
      return state.synchronize = payload
    },
    updateOverlay(state, payload){
      return state.overlay = payload
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
    },
    
  },
  actions: {},
  modules: {}
});
