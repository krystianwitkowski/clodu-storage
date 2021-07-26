<template>
    <v-overlay
        :absolute="true"
        :value="isOverlay"
        color="#ffffff"
    >
        <v-alert
        prominent
        type="info"
        width="600"
        color="#ffffff"
        class="alert-remove"
        style="box-shadow: 0px 0px 8px rgba(0,0,0,0.08)"
        >
        <v-row align="center">
            <v-col class="grow" style="color: #1976D2;">
            Are you sure you want to delete all files?
            </v-col>
            <v-col class="shrink">
            <v-btn @click="handleClickYes" style="color: #1976D2; background: none; box-shadow: none; border: 1px solid #1976D2">Yes</v-btn>
            </v-col>
            <v-col class="shrink">
            <v-btn @click="handleClickNo" style="color: #1976D2; background: none; box-shadow: none; border: 1px solid #1976D2">No</v-btn>
            </v-col>
        </v-row>
        </v-alert>
    </v-overlay>
</template>

<script>
/* API */
import FilesAPI from '../api/files.js';

    export default {
        name: 'AlertRemove',
        computed: {
            isOverlay(){
                return this.$store.state.overlay;
            }
        },
        methods: {
            handleClickYes(){
                this.$store.dispatch('deleteFiles', { api: FilesAPI })
            },
            handleClickNo(){
                this.$store.commit('updateOverlay', false)
            }
        }
    }
</script>

<style>
.alert-remove .v-alert__wrapper .v-alert__icon {
  color: #1976D2 !important;
}
</style>
