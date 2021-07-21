<template>
  <v-container @mousedown.left="handleMouseDownLeft" class="pa-8 pt-0 pb-0">
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
      <v-row class="ma-0" style="overflow: hidden;max-width: 869px;width: 100%;position: relative;right: 17px;">
        <v-row class="ma-0 d-column" style="padding: 30px 0 50px 0 ; align-content: flex-start;height: calc(100vh - 136px);width: 100%;overflow: auto;max-width: 869px;position: relative;left: 17px;">
          <File @update-file-id="updateFileId" @update-pos="updatePos" v-for="file in files" :file-id="file.id" :key="file.id" :file="file" />
          <GridFiles v-if="isGrid" :files="allFiles"/>
          <ContextMenu :items="items" :posX="posX" :posY="posY" v-if="isContext" />
        </v-row>
      </v-row>
  </v-container>
</template>

<script>
/* API */
import FilesAPI from '../api/files.js';
/* Components */
import Search from '../components/Search.vue';
import File from '../components/File.vue';
import FiltersDropdown from '../components/FiltersDropdown.vue';
import GridFiles from '../components/GridFiles.vue';
import ContextMenu from '../components/ContextMenu.vue';

export default {
  name: "Drive",
  components: {
    Search,
    File,
    FiltersDropdown,
    GridFiles,
    ContextMenu
  },
  data(){
    return {
      items: [
        { text: 'Move to starred', icon: 'mdi-star-outline', arg: { name: 'starred', starred: true, id: null } },
        { text: 'Move to trash', icon: 'mdi-delete-outline', arg: { name: 'trash', trash: true, id: null } },

      ],
      grid: false
    }
  },
  computed: {
    files(){
      if(this.$store.state.currentFilter === 'newset'){
        return this.$store.getters.searchFiles(obj => obj.trash === false && obj.starred === false).sort((a, b) => b.timestamp - a.timestamp)
      }
      else if(this.$store.state.currentFilter === 'oldest'){
        return this.$store.getters.searchFiles(obj => obj.trash === false && obj.starred === false).sort((a, b) => a.timestamp - b.timestamp)
      }

      else {
        if(this.$store.state.search.length > 0){
          return this.$store.getters.searchFiles(obj => obj.trash === false && obj.starred === false)
        }

        else {
          return this.$store.getters.files(obj => obj.trash === false && obj.starred === false)
        }
      }
    },
    isFiles(){
      return this.$store.state.files.length > 0 ? false : true;
    },
    allFiles(){
      return this.$store.getters.files(obj => obj.trash === false && obj.starred === false)
    },
    isGrid(){
      return this.grid;
    },
    isContext(){
      return this.$store.state.context
    }
  },
  methods:{
    handleClick(){
      this.grid = !this.grid;
    },
    updatePos(x, y){
      this.posX = x
      this.posY = y
    },
    updateFileId(id){
      const items = JSON.parse(JSON.stringify(this.items))
      this.items = items.map((item, i) => typeof i === "number" ? {...item, arg: { ...item.arg, id: id }} : { ...item })
    },
    handleMouseDownLeft(e){
      const prevent = e.target.className.indexOf('list') !== -1 || e.target.className.indexOf('icon') !== -1;

      return prevent ? false : this.$store.commit('updateContext', { context: false });
    }
  },
  created(){
    this.$store.commit('updateContext', { context: false })
  },
  mounted(){
    if(this.$store.state.synchronize){
      this.$store.dispatch('getSynchronize', { api: FilesAPI })
    }
    this.$store.commit('updateSearch', '')
  }
};
</script>