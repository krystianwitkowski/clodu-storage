<template>
  <v-container class="pa-8 pt-0 pb-0">
      <v-row class="ma-0" style="z-index: 999; height: 60px;">
        <v-col class="pa-0">
          <Search />
          <v-divider style="position: relative; top: -22px;"></v-divider>
        </v-col>
      </v-row>
      <v-row class="mt-8" style="max-width: 852px;">
        <File v-for="file in files" :key="file.id" :file="file" :actions="[{ id: 0, icon: 'mdi-star-outline', arg: { name: 'starred', starred: false, id: file.id } }, { id: 1, icon: 'mdi-trash-can-outline', arg: { name: 'trash', trash: true, id: file.id } }]" />
      </v-row>
  </v-container>
</template>

<script>
/* Components */
import Search from '../components/Search.vue';
import File from '../components/File.vue';

export default {
  name: "Starred",
  components: {
    Search,
    File
  },
  computed: {
    files(){
      if(this.$store.state.search.length > 0){
        return this.$store.getters.searchFiles(obj => obj.starred && obj.trash === false)
      }
      else {
        return this.$store.getters.files(obj => obj.starred && obj.trash === false)
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