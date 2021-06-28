<template>
  <v-app>
    <v-main class="d-flex flex-row" style="position: relative;">
        <v-row>
          <v-col cols="3" class="pb-0">
            <Menu />
          </v-col>
          <v-col cols="9" class="pb-0">
            <router-view></router-view>
          </v-col>
        </v-row>
    </v-main>
    <transition name="fade">
      <Alert v-show="apiRequest.value" />
    </transition>
  </v-app>
</template>

<script>
import Menu from '../components/Menu.vue';
import Alert from '../components/Alert.vue';

export default {
  name: 'Dashboard',
  components: {
    Menu,
    Alert
  },
  computed: {
    isOverlayFolder(){
      return this.$store.state.isOverlayFolder;
    },
    apiRequest(){
      return this.$store.state.apiRequest;
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