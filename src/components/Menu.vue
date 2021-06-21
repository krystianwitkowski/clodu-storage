<template>
  <v-card
      class="mx-auto pr-4"
      width="100%"
      height="100vh"
      tile
      style="position: relative;"
    >
    <v-btn
      @click="toggleDropdown"
      rounded
      width="120"
      height="45"
      class="mt-8 mb-8 ml-7"
      style="color: #888888;"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
       <DropdownSend v-if="isDropdown" />
      <v-list dense shaped class="pa-0">
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link class="nav-item" v-text="item.text" :to="item.path">Go</router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider class="mt-1 mb-1"></v-divider>
      <v-list dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cloud-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="color: #585858">Data storage</v-list-item-title>
              <v-list-item-title class="mt-2"><v-progress-linear value="15"></v-progress-linear></v-list-item-title>
              <v-list-item-title style="color: #585858" class="mt-1">used 1MB of 2GB</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
</template>

<script>
import DropdownSend from './DropdownSend.vue';

export default {
  name: 'Menu',
  components: {
    DropdownSend
  },
  data(){
    return {
      isDropdown: false,
      selectedItem: 1,
      items: [
        { text: 'My drive', path: '/drive', icon: 'mdi-file-document-multiple-outline' },
        { text: 'Latest', path: '/latest', icon: 'mdi-clock-time-eight-outline' },
        { text: 'Trash', path: '/trash', icon: 'mdi-trash-can-outline' },
      ],
    }
  },
  computed: {

  },
  methods: {
    toggleDropdown(){
      this.isDropdown = !this.isDropdown
    }
  }
};
</script>

<style scoped>

.nav-item {
  color: rgb(88, 88, 88);
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1rem;
}
</style>
