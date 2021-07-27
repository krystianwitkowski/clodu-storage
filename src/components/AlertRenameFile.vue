<template>
    <v-overlay
        :absolute="true"
        :value="isOverlayRenameFile"
        color="#ffffff"
        dark="false"
    >
    <v-card
        class="mx-auto pa-3"
        max-width="360"
        style="background: #ffffff; box-shadow: 0px 0px 8px rgba(0,0,0,0.08)"
    >
        <v-list-item three-line>
        <v-list-item-content>
            <v-list-item-title style="color: #212121; font-weight: 400;" class="text-h6 mb-1">
            Rename
            </v-list-item-title>
            <v-row class="ma-0 d-flex align-end">
            <v-text-field
                label="Name"
                v-model="rename"
                solo
                elevation="0"
                dense
                class="mt-3"
                flat
                outlined
            ></v-text-field>
            <p class="ml-2" style="position: relative; bottom: 12px;">.{{ extension }}</p>
            </v-row>
        </v-list-item-content>
        </v-list-item>

        <v-card-actions class="pa-4 pt-0 mt-n1">
            <v-btn
            @click="handleClickOk"
            color="primary"
            depressed
            >Ok</v-btn>
            <v-btn
            @click="handleClickCancel"
            color="primary"
            depressed
            >Cancel</v-btn>
        </v-card-actions>
    </v-card>
    </v-overlay>
</template>

<script>
/* API */
import FilesAPI from '../api/files.js';
/* Utilities */
import createTokens from '../utilities/createTokens.js';

export default {
    name: 'AlertRenameFile',
    data(){
        return {
            rename: ''
        }
    },
    computed: {
        isOverlayRenameFile(){
            return this.$store.state.overlayRenameFile
        },
        extension(){
            return JSON.parse(this.$store.state.files.find(file => file.id === this.$store.state.contextId).file).name.split('.')[1]
        }
    },
    methods: {
        handleClickOk(){
            const vm = this;
            this.$store.dispatch('renameAction', { api: FilesAPI, arg: { name: 'rename', text: vm.rename, id: this.$store.state.contextId }, createTokens })
            this.$store.commit('updateOverlayRenameFile', { overlay: false })
        },
        handleClickCancel(){
            this.$store.commit('updateOverlayRenameFile', { overlay: false })
        }
    }
}

</script>