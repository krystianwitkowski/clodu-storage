<template>
  <v-card
      class="mx-auto pr-4"
      width="100%"
      height="100vh"
      tile
    >
    <v-btn
      rounded
      width="120"
      height="45"
      class="mt-8 mb-8 ml-7"
      style="color: #888888;"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>

      <v-list dense shaped class="pa-0">
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
      <v-divider class="mt-1 mb-1"></v-divider>
      <v-list dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cloud-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Data storage</v-list-item-title>
              <v-list-item-title class="mt-2"><v-progress-linear value="15"></v-progress-linear></v-list-item-title>
              <v-list-item-title class="mt-1">used 1MB of 2GB</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
</template>

<script>
export default {
  name: 'Menu',
  data(){
    return {
      selectedItem: 1,
      items: [
        { text: 'My drive', icon: 'mdi-file-document-multiple-outline' },
        { text: 'Latest', icon: 'mdi-clock-time-eight-outline' },
        { text: 'Trash', icon: 'mdi-trash-can-outline' },
      ],
    }
  }
};
</script>
