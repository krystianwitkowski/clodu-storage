<template>
  <v-container class="pa-8 pt-0 pb-0 pr-0" style="height: 100%;">
      <v-row class="ma-0">
        <v-col class="pa-0">
          <Search />
        </v-col>
      </v-row>
      <v-row class="ma-0 pl-2">
        <v-col class="pa-0 d-flex">
          <FiltersDropdown />
            <v-btn
              icon
              color="#DCDCDC"
              class="ml-1"
              @click="handleClick"
            >
              <v-icon style="font-size: 19px;">mdi-view-grid-outline</v-icon>
            </v-btn>
        </v-col>
      </v-row>
      <v-row class="ma-0" style="width: 100%; height: calc(100% - 136px);">
        <File v-for="file in files" :key="file.id" :file="file" :actions="[{ id: 0, icon: 'mdi-star-outline', arg: { name: 'starred', starred: false, id: file.id } }, { id: 1, icon: 'mdi-trash-can-outline', arg: { name: 'trash', trash: true, id: file.id } }]" />
        <GridFiles v-if="isGrid" :files="starredFiles"/>
      </v-row>
  </v-container>
</template>

<script>
/* Components */
import Search from '../components/Search.vue';
import File from '../components/File.vue';
import FiltersDropdown from '../components/FiltersDropdown.vue';
import GridFiles from '../components/GridFiles.vue';

export default {
  name: "Starred",
  components: {
    Search,
    File,
    FiltersDropdown,
    GridFiles
  },
  data(){
    return {
      grid: false
    }
  },
  computed: {
    files(){
      if(this.$store.state.currentFilter === 'newset'){
        return this.$store.getters.searchFiles(obj => obj.starred && obj.trash === false).sort((a, b) => b.timestamp - a.timestamp)
      }
      else if(this.$store.state.currentFilter === 'oldest'){
        return this.$store.getters.searchFiles(obj => obj.starred && obj.trash === false).sort((a, b) => a.timestamp - b.timestamp)
      }

      else {
        if(this.$store.state.search.length > 0){
          return this.$store.getters.searchFiles(obj => obj.starred && obj.trash === false)
        }
        else {
          return this.$store.getters.files(obj => obj.starred && obj.trash === false)
        }
      }
    },
    starredFiles(){
      return this.$store.getters.files(obj => obj.starred && obj.trash === false)
    },
    isGrid(){
      return this.grid;
    }
  },
  methods: {
    handleClick(){
      this.grid = !this.grid;
    }
  },
  mounted(){
    this.$store.commit('updateSearch', '')
  }
};
</script>

<style>


</style>