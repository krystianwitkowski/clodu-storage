<template>
  <v-app>
    <v-main class="d-flex flex-row" style="position: relative;">
        <v-row class="mb-0">
          <v-col @contextmenu.prevent="handleContext" cols="3" class="pb-0">
            <Menu />
          </v-col>
          <v-col cols="9" class="pb-0">
            <router-view></router-view>
          </v-col>
        </v-row>
    </v-main>
    <transition name="fade">
      <AlertFiles v-if="FilesAPIStatus" />
    </transition>
    <AlertRemove />
    <AlertRenameFile v-if="isOverlayRenameFile"/>
  </v-app>
</template>

<script>
/* Components */
import Menu from '../components/Menu.vue';
import AlertFiles from '../components/AlertFiles.vue';
import AlertRemove from '../components/AlertRemove.vue';
import AlertRenameFile from '../components/AlertRenameFile.vue';

export default {
  name: 'Dashboard',
  components: {
    Menu,
    AlertFiles,
    AlertRemove,
    AlertRenameFile
  },
  computed: {
    FilesAPIStatus(){
      return this.$store.state.FilesAPIStatus.loading;
    },
    isOverlayRenameFile(){
      return this.$store.state.overlayRenameFile
    }
  },
  destroyed(){
    this.$store.commit('updateFilesAPIStatus', { text: '', loading: false, icon: ''})
  },
  methods: {
    handleContext(e){
      return;
    }
  }
};
</script>

<style>

.v-main__wrap {
  display: flex;
  flex-direction: row;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>