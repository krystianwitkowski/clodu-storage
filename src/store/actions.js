import router from '../router';

export default {
async getSynchronize({ commit, dispatch }, payload){
    try {
        commit('updateFilesAPIStatus', { text: 'Synchronization', loading: true, icon: 'mdi-cloud-sync-outline' })
        
        const res = await payload.api.get();

        if(res.status === 200){
            commit('addFiles', await res.json())
            commit('updateFilesAPIStatus', { text: 'Synchronization', loading: false, icon: 'mdi-cloud-sync-outline' })
            commit('updateSynchronize', false)
        }

        else {
            commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-cloud-sync-outline' })
            dispatch('hidePopup', { name: 'updateFilesAPIStatus', data: { text: 'Synchronization', loading: false, icon: 'mdi-cloud-sync-outline' }})
        }
    } catch {
        commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-cloud-sync-outline' })
        dispatch('hidePopup', { name: 'updateFilesAPIStatus', data: { text: 'Synchronization', loading: false, icon: 'mdi-cloud-sync-outline' }})
    }
    },
    hidePopup({ commit }, payload){
    setTimeout(() =>{
        commit(payload.name, payload.status)
    }, 3500)
    },
    async authUser({ commit, dispatch }, payload){
    try {
        const res = await payload.api.get(JSON.parse(JSON.stringify(payload.user)))

        const body = await res.json();

        if(res.status === 200){
            commit('updateValidateAuth', { validate: ['', ''] })

            localStorage.setItem('tokens', JSON.stringify(body))
            router.push({ path: '/dashboard/drive' })
        }

        else {
            commit('updateValidateAuth', { validate: body.validate })
        }

    } catch {
        commit('updateFormAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
        dispatch('hidePopup', { name: 'updateFormAPIStatus', status: { text: 'Something went wrong', loading: false, icon: 'mdi-information-outline' }})
    }
    },
    async createUser({ commit, dispatch }, payload){
    try {
        const res = await payload.api.post(JSON.stringify(payload.user))

        if(res.status === 201){
        router.push({ path: '/signin'})
        }

        else {
        const body = await res.json()
        commit('updateValidateUser', { validate: body.validate })
        }
    } catch {
        commit('updateFormAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
        dispatch('hidePopup', { name: 'updateFormAPIStatus', status: { text: 'Something went wrong', loading: false, icon: 'mdi-information-outline' }})
    }
    },
    async getFileAction({ commit, dispatch }, payload){
        try {
        commit('updateFilesAPIStatus', { text: 'Action in progress', loading: true, icon: 'mdi-cloud-sync-outline' })

        const FilesPUT = await payload.api.put({ ...payload.action })
        
        if(FilesPUT.status === 401){
            try{
                const TokensAPI = await payload.createTokens();

                if(TokensAPI.status === 401){
                    router.push({ path: '/signin'})
                }

                else {
                    const FilesPUT = await payload.api.put({ ...payload.action })
                    
                    commit('updateFile', await FilesPUT.json())
                    commit('updateFilesAPIStatus', { text: 'Action in progress', loading: false, icon: 'mdi-cloud-sync-outline' })
                    commit('updateContext', { context: false })
                }
                
            } catch {
                commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
                dispatch('hidePopup', { name: 'updateFilesAPIStatus', status: { text: 'Something went wrong', loading: false, icon: 'mdi-information-outline' }})
            }
        }

        else if (FilesPUT.status === 200){
            commit('updateFile', await FilesPUT.json()) 
            commit('updateFilesAPIStatus', { text: 'Action in progress', loading: false, icon: 'mdi-cloud-sync-outline' })
            
            commit('updateContext', { context: false })
        }

        else {
            commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
            dispatch('hidePopup', { name: 'updateFilesAPIStatus', status: { text: 'Something went wrong', loading: false, icon: 'mdi-information-outline' }})
        }

    } catch {
        commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
        dispatch('hidePopup', { name: 'updateFilesAPIStatus', status: { text: 'Something went wrong', loading: false, icon: 'mdi-information-outline' }})
    }
    }
}