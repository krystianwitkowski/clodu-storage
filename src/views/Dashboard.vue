<template>
  <v-app>
    <v-main class="d-flex flex-row" style="position: relative;">
        <v-row class="mb-0">
          <v-col cols="3" class="pb-0">
            <Menu />
          </v-col>
          <v-col cols="9" class="pb-0">
            <router-view></router-view>
          </v-col>
        </v-row>
    </v-main>
    <transition name="fade">
      <Alert v-if="FilesAPIStatus" />
    </transition>
    <AlertRemove />
  </v-app>
</template>

<script>
import Menu from '../components/Menu.vue';
import Alert from '../components/Alert.vue';
import  AlertRemove from '../components/AlertRemove.vue';
export default {
  name: 'Dashboard',
  components: {
    Menu,
    Alert,
    AlertRemove
  },
  computed: {
    isOverlayFolder(){
      return this.$store.state.isOverlayFolder;
    },
    FilesAPIStatus(){
      return this.$store.state.FilesAPIStatus.loading;
    }
  },
  destroyed(){
    this.$store.commit('updateFilesAPIStatus', { text: '', loading: false, icon: ''})
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