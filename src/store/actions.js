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
    async moveAction({ commit, dispatch }, payload){
        try {
        commit('updateFilesAPIStatus', { text: 'Action in progress', loading: true, icon: 'mdi-cloud-sync-outline' })

        const FilesPUT = await payload.api.put({ ...payload.arg })
        
        if(FilesPUT.status === 401){
            try{
                const TokensAPI = await payload.createTokens();

                if(TokensAPI.status === 401){
                    router.push({ path: '/signin'})
                }

                else {
                    const FilesPUT = await payload.api.put({ ...payload.arg })
                    
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
    },
    async deleteAction({ commit, dispatch }, payload){
        try {
        commit('updateFilesAPIStatus', { text: 'Action in progress', loading: true, icon: 'mdi-cloud-sync-outline' })
        
        const FilesDEL = await payload.api.delete(payload.arg)
        
        if(FilesDEL.status === 401){
            try{
                const TokensAPI = await payload.createTokens();

                if(TokensAPI.status === 401){
                    router.push({ path: '/signin'})
                }

                else {
                    const FilesDEL = await payload.api.delete(payload.arg)
                    
                    commit('deleteFile', await FilesDEL.json())
                    commit('updateFilesAPIStatus', { text: 'Action in progress', loading: false, icon: 'mdi-cloud-sync-outline' })
                    commit('updateContext', { context: false })
                }
                
            } catch {
                commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
                dispatch('hidePopup', { name: 'updateFilesAPIStatus', status: { text: 'Something went wrong', loading: false, icon: 'mdi-information-outline' }})
            }
        }

        else if (FilesDEL.status === 200){
            commit('deleteFile', await FilesDEL.json())
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
    },
    async deleteFiles({ commit, state }, payload){
        try {
            const trashFilesId = state.files.map((obj, i) => typeof i === 'number' ? { ...obj, file: JSON.parse(obj.file) } : { ...obj } ).filter(file => file.trash).map(file => file.id)
            
            const deleted = await payload.api.delete({ id: JSON.stringify(trashFilesId) })

            commit('deleteFiles', await deleted.json())
            
            commit('updateOverlay', false)

        } catch {
            commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline'})
        }
    }
}