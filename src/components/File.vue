<template>
<v-col style="margin: 12px; margin-top: 0; padding: 8px; width: 260px; height: 180px;flex-basis: initial; flex-grow: initial; max-width: initial;">
    <div class="item-icons d-flex justify-end mb-1">
    <v-list-item-icon v-for="action in actions" :key="action.id" class="ma-0" @click="() => handleClick(action.arg)">
    <v-btn
        icon
        color="#DCDCDC"
        width="30"
        height="30"
    >
        <v-icon style="font-size: 19px;">{{ action.icon }}</v-icon>
    </v-btn>
    </v-list-item-icon>
    </div>
    <a :href="`data:${file.icons.mimetype};base64,${file.base64}`" :download="file.file.name" style="text-decoration: none; display: block; height: 100%;border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 8px;">
    <v-list-item-group style="height: 100%;">
        <v-list-item 
        style="
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            height: 100%;
        "
        >
        <v-list-item-icon class="ma-0" style="align-self: center;">
            <v-icon color="#fd5e53" style="font-size: 28px"
            >{{ file.icons.icon }}</v-icon
            >
        </v-list-item-icon>
        <v-list-item-content style="flex: initial;">
            <v-list-item-title style="color: #585858" class="subtitle-2"
            >{{ file.file.name }}</v-list-item-title
            >
        </v-list-item-content>
        </v-list-item>
    </v-list-item-group>
    </a>
</v-col>
</template>

<script>
/* API */
import FilesAPI from '../api/files.js';
/* Utilities */
import createTokens from '../utilities/createTokens.js';

export default {
    name: 'File',
    props: {
        file: {
            type: Object,
            required: true
        },
        actions: {
            type: Array,
            required: true
        }
    },
    methods: {
        async handleClick(action){
            try {
                this.$store.commit('updateFilesAPIStatus', { text: 'Action in progress', loading: true, icon: 'mdi-cloud-sync-outline' })

                const FilesPUT = await FilesAPI.put({ ...action })
                
                if(FilesPUT.status === 401){
                    try{
                        const TokensAPI = await createTokens();

                        if(TokensAPI.status === 401){
                            this.$router.push({ path: '/signin'})
                        }

                        else {
                            const FilesPUT = await FilesAPI.put({ ...action })
                            
                            this.$store.commit('updateFile', await FilesPUT.json())
                            this.$store.commit('updateFilesAPIStatus', { text: 'Action in progress', loading: false, icon: 'mdi-cloud-sync-outline' })
                        }
                        
                    } catch {
                        this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
                    }
                }

                else if (FilesPUT.status === 200){
                    this.$store.commit('updateFile', await FilesPUT.json()) 
                    this.$store.commit('updateFilesAPIStatus', { text: 'Action in progress', loading: false, icon: 'mdi-cloud-sync-outline' })
                }

                else {
                    this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
                }

            } catch {
                this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
            }
        }
    }
}
</script>
