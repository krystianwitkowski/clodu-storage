<template>
  <v-card
      class="mx-auto pr-4"
      width="100%"
      height="100vh"
      tile
      style="position: relative; box-shadow: 0px 0px 8px rgba(0,0,0,0.05);"
    >
    <v-btn
      @click="handleClickDropdown"
      rounded
      width="120"
      height="45"
      class="mt-8 mb-8 ml-7 btn-files"
      color="#ffffff"
      style="color: #BEBEBE;"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
      <DropdownFiles v-if="isDropdownMenu" />
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
              <v-list-item-title class="mt-2"><v-progress-linear style="border-radius: 25px;" value="0"></v-progress-linear></v-list-item-title>
              <v-list-item-title style="color: #585858" class="mt-1">{{ convertBytes }} of 512MB used</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list-item class="mt-10 d-flex justify-center">
        <v-btn @click="handleClickLogout" depressed style="border: 1px solid #1976D2; background: #ffffff; color: #1976D2">
          log out
        </v-btn>
      </v-list-item>
    </v-card>
</template>

<script>
import convertBytes from '../utilities/convertBytes.js';
import DropdownFiles from './DropdownFiles.vue';

export default {
  name: 'Menu',
  components: {
    DropdownFiles
  },
  data(){
    return {
      selectedItem: 0,
      items: [
        { text: 'My drive', path: '/dashboard/drive', icon: 'mdi-folder-download-outline' },
        { text: 'Starred', path: '/dashboard/starred', icon: 'mdi-star-outline' },
        { text: 'Trash', path: '/dashboard/trash', icon: 'mdi-trash-can-outline' },
      ],
    }
  },
  computed: {
    isDropdownMenu(){
      return this.$store.state.dropdownMenu
    },
    convertBytes(){
      return convertBytes(this.$store.getters.bytes)
    }
  },
  methods: {
    handleClickDropdown(){
      this.$store.commit('updateDropdownMenu')
    },
    handleClickLogout(){
      localStorage.clear();
      this.$router.push({ path: '/signin' })
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

.btn-files {
  box-shadow: 0px 0px 8px rgba(0,0,0,0.08);
}

.v-item--active .v-list-item__content a {
  color: #1976D2 !important;
}
</style>
