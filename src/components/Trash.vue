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
      <v-row class="ma-0">
        <v-col class="pa-0">
          <v-btn
            @click="handleClick"
            rounded
            width="100"
            height="45"
            class="mt-4 ml-7"
            color="#ffffff"
            style="color: #BEBEBE; box-shadow: 0px 0px 5px rgba(0,0,0,0.12)"
          >
            <v-icon>
              mdi-close-circle-multiple-outline
            </v-icon>
          </v-btn>
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
import FiltersDropdown from '../components/FiltersDropdown.vue';

export default {
    name: 'Trash',
    components: {
      Search,
      File,
      FiltersDropdown
    },
    data(){
      return {
        overlay: false
      }
    },
    computed: {
      files(){
        if(this.$store.state.currentFilter === 'newset'){
          return this.$store.getters.searchFiles(obj => obj.trash).sort((a, b) => b.timestamp - a.timestamp)
        }
        else if(this.$store.state.currentFilter === 'oldest'){
          return this.$store.getters.searchFiles(obj => obj.trash).sort((a, b) => a.timestamp - b.timestamp)
        }

        else {
          if(this.$store.state.search.length > 0){
            return this.$store.getters.searchFiles(obj => obj.trash)
          }

          else {
            return this.$store.getters.files(obj => obj.trash)
          }
        }

      }
    },
    methods: {
      handleClick(){
        this.$store.commit('updateOverlay', true)
      }
    },
    mounted(){
      this.$store.commit('updateSearch', '')
    }
}
</script>
