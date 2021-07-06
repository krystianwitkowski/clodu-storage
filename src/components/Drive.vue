<template>
  <v-container class="pa-8 pt-0 pb-0">
      <v-row class="ma-0">
        <v-col class="pa-0">
          <Search />
        </v-col>
      </v-row>
      <v-row class="mt-0" style="max-width: 852px;">
        <File v-for="file in files" :key="file.id" :file="file" :actions="[{ id: 0, icon: 'mdi-star-outline', arg: { name: 'starred', starred: true, id: file.id } }, { id: 1, icon: 'mdi-trash-can-outline', arg: { name: 'trash', trash: true, id: file.id } }]" />
      </v-row>
  </v-container>
</template>

<script>
/* API */
import FilesAPI from '../api/files.js';
/* Components */
import Search from '../components/Search.vue';
import File from '../components/File.vue';

export default {
  name: "Drive",
  components: {
    Search,
    File
  },
  computed: {
    files(){
      if(this.$store.state.search.length > 0){
        return this.$store.getters.searchFiles(obj => obj.trash === false && obj.starred === false)
      }

      else {
        return this.$store.getters.files(obj => obj.trash === false && obj.starred === false)
      }
    }
  },
  methods:{
    async getSynchronize(){
      try {
        this.$store.commit('updateFilesAPIStatus', { text: 'Synchronization', loading: true, icon: 'mdi-cloud-sync-outline' })
        
        const res = await FilesAPI.get();

          if(res.status === 200){
            this.$store.commit('addFiles', await res.json())
            this.$store.commit('updateFilesAPIStatus', { text: 'Synchronization', loading: false, icon: 'mdi-cloud-sync-outline' })
          }

          else {
            this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-cloud-sync-outline' })
          }
      } catch {
          this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-cloud-sync-outline' })
      }
    }
  },
  mounted(){
    if(this.$store.state.synchronize){
      this.getSynchronize();

      this.$store.commit('isSynchronize', false)
    }
    this.$store.commit('updateSearch', '')
  }
};
</script>