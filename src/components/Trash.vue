<template>
  <v-container class="pa-8 pt-0 pb-0">
      <v-row class="ma-0">
        <v-col class="pa-0">
          <Search />
        </v-col>
      </v-row>
      <v-row class="mt-0" style="max-width: 852px;">
        <File v-for="file in files" :key="file.id" :file="file" :actions="[{ id: 0, icon: 'mdi-restore', arg: { name: 'trash', trash: false, id: file.id } }]" />
      </v-row>
  </v-container>
</template>
<script>
/* Components */
import Search from '../components/Search.vue';
import File from '../components/File.vue';

export default {
    name: 'Trash',
    components: {
      Search,
      File
    },
    computed: {
      files(){
        if(this.$store.state.search.length > 0){
          return this.$store.getters.searchFiles(obj => obj.trash)
        }

        else {
          return this.$store.getters.files(obj => obj.trash)
        }
      }
    },
    mounted(){
      this.$store.commit('updateSearch', '')
    }
}
</script>
