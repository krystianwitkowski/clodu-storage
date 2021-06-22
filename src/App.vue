<template>
  <v-app>
    <v-main class="d-flex flex-row" style="position: relative;">
        <v-row>
          <v-col cols="3">
            <Menu />
          </v-col>
          <v-col cols="9">
            <Board />
          </v-col>
        </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue';
import Board from './components/Board.vue';

export default {
  name: 'App',
  components: {
    Menu,
    Board
  },
  computed: {
    isOverlayFolder(){
      return this.$store.state.isOverlayFolder;
    }
  },
  methods: {

  }
};
</script>

<style>

  .v-main__wrap {
    display: flex;
    flex-direction: row;
  }

</style>
