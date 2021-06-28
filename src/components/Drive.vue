<template>
  <v-container class="pa-8 pt-0 pb-0">
      <v-row class="ma-0" style="z-index: 999; height: 60px;">
        <v-col class="pa-0">
          <Search />
          <v-divider style="position: relative; top: -22px;"></v-divider>
        </v-col>
      </v-row>
      <v-row class="mt-8" style="max-width: 852px; position: relative;">
        <UploadImage v-if="upload"/>
        <File @addTrash="addTrash" @addStarred="addStarred" v-for="file in files" :key="file.id" :file="file" />
      </v-row>
  </v-container>
</template>

<script>
import Search from '../components/Search.vue';
import File from '../components/File.vue';
import UploadImage from '../components/UploadImage.vue';
import getUploadFile from '../api/getUploadFile.js';
import modifyUploadFile from '../api/modifyUploadFile.js';

export default {
  name: "Drive",
  components: {
    Search,
    UploadImage,
    File
  },
  computed: {
    files(){
      if(this.$store.state.search.length > 0){
        return this.$store.state.files.filter(obj => obj.trash === false && obj.starred === false).map((obj, i) => typeof i === "number" ? {...obj, file: JSON.parse(obj.file)} : { ...obj }).filter(file => file.file.name.includes(this.$store.state.search))
      }

      else {
        return this.$store.state.files.filter(obj => obj.trash === false && obj.starred === false).map((obj, i) => typeof i === "number" ? {...obj, file: JSON.parse(obj.file)} : { ...obj });
      }
    },
    upload(){
      return this.$store.state.files.length === 0;
    }
  },
  methods: {
    async addTrash(e){
      const dataId = Number(e.currentTarget.getAttribute('data-id'));

      this.$store.commit('toggleApiRequest', { text: 'Action in progress', value: true })

      await modifyUploadFile({ name: 'trash', trash: true, id: dataId })
      await getUploadFile().then(res => res.json()).then(files => {
        this.$store.commit('addFiles', files)
      })

      this.$store.commit('toggleApiRequest', { text: 'Action in progress', value: false })
      
    },
    async addStarred(e){
      const dataId = Number(e.currentTarget.getAttribute('data-id'));
      
      this.$store.commit('toggleApiRequest', { text: 'Action in progress', value: true })

      await modifyUploadFile({ name: 'starred', starred: true, id: dataId })
      await getUploadFile().then(res => res.json()).then(files => {
        this.$store.commit('addFiles', files)
      })
      
      this.$store.commit('toggleApiRequest', { text: 'Action in progress', value: false })
    },
    clearSearch(){
      this.$store.commit('updateSearch', '')
    }
  },
  async created(){
    await getUploadFile().then(res => res.json()).then(files => {
      this.$store.commit('addFiles', files)
    })

    this.clearSearch()
  }
};
</script>

<style>


</style>