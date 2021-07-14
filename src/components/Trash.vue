<template>
  <v-container class="pa-8 pt-0 pb-0">
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
              @click="handleClickIcon"
            >
              <v-icon style="font-size: 19px;">mdi-view-grid-outline</v-icon>
            </v-btn>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col class="pa-0">
          <v-btn
            @click="handleClick"
            rounded
            width="100"
            height="45"
            class="mt-6 ml-7"
            color="#ffffff"
            style="color: #DCDCDC; box-shadow: 0px 0px 8px rgba(0,0,0,0.08);"
          >
            <v-icon>
              mdi-delete-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="ma-0 d-column" style="max-width: 852px; width: 100%; height: calc(100% - 136px);">
        <File v-for="file in files" :key="file.id" :file="file" :actions="[{ id: 0, icon: 'mdi-restore', arg: { name: 'trash', trash: false, id: file.id } }]" />
        <GridFiles v-if="isGrid" :files="trashFiles"/>
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
    name: 'Trash',
    components: {
      Search,
      File,
      FiltersDropdown,
      GridFiles
    },
    data(){
      return {
        overlay: false,
        grid: false
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

      },
      trashFiles(){
        return this.$store.getters.files(obj => obj.trash)
      },
      isGrid(){
        return this.grid;
      }
    },
    methods: {
      handleClick(){
        this.$store.commit('updateOverlay', true)
      },
      handleClickIcon(){
        this.grid = !this.grid;
      }
    },
    mounted(){
      this.$store.commit('updateSearch', '')
    }
}
</script>
