<template>
  <v-card
    width="80%"
    tile
    style="position: absolute; top: 100px; right: 20px; z-index: 1;"
  >
    <v-list dense>
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
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>

export default {
    name: 'DropdownSend',
    data(){
        return {
            selectedItem: 1,
            items: [
                { text: 'Create folder', icon: 'mdi-folder' },
                { text: 'Send file', icon: 'mdi-file' }
            ],
        }
    }
}
</script>
