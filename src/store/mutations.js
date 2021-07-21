export default {
    updateDropdownMenu(state){
    return state.dropdownMenu = !state.dropdownMenu;
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
    },
    filterFiles(state, payload){
    return state.currentFilter = payload
    },
    updateValidateAuth(state, payload){
    return state.validateAuth = payload.validate
    },
    updateValidateUser(state, payload){
    return state.validateUser = payload.validate
    },
    updateContext(state, payload){
    return state.context = payload.context
    }
}