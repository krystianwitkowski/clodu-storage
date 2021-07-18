<template>
  <v-card
    class="mx-auto"
    max-width="250"
    tile
    style="position: absolute; width: 100%;"
    :style="{ 'left': posX + 'px', 'top': posY + 'px' }"
    dense
    elevation="0"
  >
    <v-list flat class="pa-0" style="border-radius: 6px; box-shadow: 0px 0px 8px rgba(0,0,0,0.08);">
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          class="item-context-menu"
          style="height: 48px;"
          @click="() => handleClick(item.arg)"
        >
          <v-list-item-icon>
            <v-icon color="#DCDCDC" style="font-size: 21px; position: relative; top: -1px;" v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
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
    name: 'ContextMenu',
    props: {
      items: {
        type: Number,
        required: true
      },
      posX :{
        type: Number,
        required: true
      },
      posY:{
        type: Number,
        required: true
      }
    },
    methods : {
      async handleClick(action){
          try {
              this.$store.commit('updateFilesAPIStatus', { text: 'Action in progress', loading: true, icon: 'mdi-cloud-sync-outline' })

              const FilesPUT = await FilesAPI.put({ ...action })
              
              if(FilesPUT.status === 401){
                  try{
                      const TokensAPI = await createTokens();

                      if(TokensAPI.status === 401){
                          this.$router.push({ path: '/signin'})
                      }

                      else {
                          const FilesPUT = await FilesAPI.put({ ...action })
                          
                          this.$store.commit('updateFile', await FilesPUT.json())
                          this.$store.commit('updateFilesAPIStatus', { text: 'Action in progress', loading: false, icon: 'mdi-cloud-sync-outline' })
                          
                          this.$emit('hide-context')
                      }
                      
                  } catch {
                      this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
                  }
              }

              else if (FilesPUT.status === 200){
                  this.$store.commit('updateFile', await FilesPUT.json()) 
                  this.$store.commit('updateFilesAPIStatus', { text: 'Action in progress', loading: false, icon: 'mdi-cloud-sync-outline' })
                  
                  this.$emit('hide-context')
              }

              else {
                  this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
              }

          } catch {
              this.$store.commit('updateFilesAPIStatus', { text: 'Something went wrong', loading: true, icon: 'mdi-information-outline' })
          }
      }
    }
}
</script>

<style>
.item-context-menu.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
    color: #585858 !important;
}

.item-context-menu .v-list-item__content .v-list-item__title {
    font-size: 15px;
}

.item-context-menu.v-list-item--active{
  color: #585858;
}
</style>

