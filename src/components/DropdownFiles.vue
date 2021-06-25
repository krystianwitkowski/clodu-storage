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
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-file-input
              class="file-send"
              v-model="item.file"
              truncate-length="15"
              style="position: absolute; left: 0; width: 100%;"
            ></v-file-input>
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
              { text: 'Send file', file: null, icon: 'mdi-file' }
          ],
        }
    },

    async updated(){
      if(this.items[0].file){

        this.$store.commit('toggleDropdownFiles')
        
        await createUploadFile(this.items[0].file);
        await getUploadFile({ file: 'last' }).then(res => res.json()).then(files => {
          this.$store.commit('addFile', files)
        })

      }
    },

}
</script>

<style>
.v-input__slot {
  margin-bottom: 0 !important;
}

.v-text-field__slot {
  height: 40px;
}

.file-send .v-input__slot::before {
  border: none !important;
}
</style>
