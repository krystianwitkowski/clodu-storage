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
/* API */
import FilesAPI from '../api/files.js';
/* Utilities */
import createTokens from '../utilities/createTokens.js';

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

        try {
          this.$store.commit('updateDropdownMenu')
          this.$store.commit('updateFilesAPIStatus', { text: 'Transmission in progress', loading: true, icon: 'mdi-cloud-sync-outline' })

          const FilesPOST = await FilesAPI.post(this.items[0].file);
          
          if(FilesPOST.status === 401){
            try {
              const TokensAPI = await createTokens();

              if(TokensAPI.status === 401){
                this.$router.push({ path: '/signin'})
              }

              else {
                const FilesPOST = await FilesAPI.post(this.items[0].file);
                this.createFile(FilesPOST);
              }
            } catch {
              this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
            }
          }

          else if (FilesPOST.status === 400){
            this.$store.commit('updateFilesAPIStatus', { text: 'This extension is not supported', loading: true, icon: 'mdi-information-outline' })
          }

          else if (FilesPOST.status === 201){
            this.createFile(FilesPOST);
          }

          else {
            this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
          }

        } catch {
          this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
          this.$store.commit('updateDropdownMenu')
        }
      }
    },
    methods: {
      async createFile(res){
        try {
          if(res.status === 201){
            const res = await FilesAPI.get({ id: 'last' });

            if(res.status === 200){
              this.$store.commit('addFile', await res.json())
              this.$store.commit('updateFilesAPIStatus', { text: 'Transmission in progress', loading: false, icon: 'mdi-cloud-sync-outline' })
            }

            else {
              this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
            }

          }
        } catch {
          this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
        }
      }
    }

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
