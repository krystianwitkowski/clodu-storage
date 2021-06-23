<template>
  <v-card
    width="80%"
    tile
    style="position: absolute; top: 100px; right: 20px; z-index: 1;"
  >
    <v-list dense class="pa-0">
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
        <v-file-input
          dense
          v-model="item.file"
          truncate-length="15"
        ></v-file-input>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="color: #585858" v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import createUploadFile from '../api/createUploadFile.js';
import getUploadFile from '../api/getUploadFile.js';

export default {
    name: 'DropdownFiles',
    data(){
        return {
          selectedItem: 1,
          items: [
              { text: 'Send folder', file: null, icon: 'mdi-folder' },
              { text: 'Send file', file: null, icon: 'mdi-file' }
          ],
        }
    },

    async updated(){
      if(this.items[1].file){

        this.$store.commit('toggleDropdownFiles')
        
        await createUploadFile(this.items[1].file);
        await getUploadFile({ file: 'last' }).then(res => res.json()).then(files => {
          this.$store.commit('addFile', files)
        })

      }
    },

}
</script>
