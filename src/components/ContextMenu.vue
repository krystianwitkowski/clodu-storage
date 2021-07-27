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
          @click="() => handleClick(item.action, item.payload)"
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
      handleClick(action, payload){
        if(action === 'move'){
          this.$store.dispatch('moveAction', { api: FilesAPI, arg: {...payload, id: this.$store.state.contextId }, createTokens })
        }

        if(action === 'delete'){
          this.$store.dispatch('deleteAction', { api: FilesAPI, arg: { id: this.$store.state.contextId }, createTokens })
        }

        if(action === 'rename'){
          this.$store.commit('updateOverlayRenameFile', { overlay: true })
          this.$store.commit('updateContext', { context: false })
        }

        if(action === 'download'){
          const file = this.$store.state.files.find(file => file.id === JSON.parse(this.$store.state.contextId))
          const node = document.createElement('a');
          const name = node.download = JSON.parse(file.file).name
          const href = node.href = `data:${JSON.parse(file.file).mimetype};base64,${file.base64}`
          
          node.click();

          this.$store.commit('updateContext', { context: false })
        }

      },
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

