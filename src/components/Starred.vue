<template>
  <v-container class="pa-8 pt-0 pb-0">
      <v-row class="ma-0">
        <v-col class="pa-0">
          <Search />
        </v-col>
      </v-row>
      <v-row class="ma-0 pl-2">
        <v-col class="pa-0">
          <FiltersDropdown />
        </v-col>
      </v-row>
      <v-row class="mt-0" style="max-width: 852px;">
        <File v-for="file in files" :key="file.id" :file="file" :actions="[{ id: 0, icon: 'mdi-star-outline', arg: { name: 'starred', starred: false, id: file.id } }, { id: 1, icon: 'mdi-trash-can-outline', arg: { name: 'trash', trash: true, id: file.id } }]" />
      </v-row>
  </v-container>
</template>

<script>
/* Components */
import Search from '../components/Search.vue';
import File from '../components/File.vue';
import FiltersDropdown from '../components/FiltersDropdown.vue';

export default {
  name: "Starred",
  components: {
    Search,
    File,
    FiltersDropdown
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
    }
  },
  mounted(){
    this.$store.commit('updateSearch', '')
  }
};
</script>

<style>


</style>