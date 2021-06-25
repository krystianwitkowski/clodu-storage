<template>
  <v-container>
    <v-container class="pa-4 mt-5">
      <v-row>
        <v-col class="pa-0">
          <p style="color: #585858" class="subtitle-2 pl-3">Files</p>
        </v-col>
      </v-row>
      <v-row class="mt-7" style="max-width: 780px;">
        <v-col v-for="(file, index) in files" :key="index" style="padding: 8px; width: 260px; height: 180px;flex-basis: initial; flex-grow: initial; max-width: initial;">
          <div class="item-icons d-flex justify-end mb-2">
            <v-list-item-icon class="ma-0 mr-1" @click="addStarred" :data-id="file.id">
              <v-icon color="#A9A9A9" style="cursor: pointer; font-size: 19px"
                >mdi-star-outline</v-icon
              >
            </v-list-item-icon>
            <v-list-item-icon class="ma-0" @click="addTrash" :data-id="file.id">
              <v-icon color="#A9A9A9" style="cursor: pointer; font-size: 19px"
                >mdi-trash-can-outline</v-icon
              >
            </v-list-item-icon>
          </div>
          <a :href="`data:${file.icons.mimetype};base64,${file.base64}`" :download="file.file.name" style="text-decoration: none; display: block; height: 100%;border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 8px;">
            <v-list-item-group style="height: 100%;">
              <v-list-item 
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  height: 100%;
                "
              >
                <v-list-item-icon class="ma-0" style="align-self: center;">
                  <v-icon color="#FC8A17" style="font-size: 28px"
                    >{{ file.icons.icon }}</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="flex: initial;">
                  <v-list-item-title style="color: #585858" class="subtitle-2"
                    >{{ file.file.name }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import getUploadFile from '../api/getUploadFile.js';
import modifyUploadFile from '../api/modifyUploadFile.js';

export default {
  name: "Drive",
  computed: {
    files(){
      return this.$store.state.files.filter(obj => obj.trash === false && obj.starred === false).map((obj, i) => typeof i === "number" ? {...obj, file: JSON.parse(obj.file)} : { ...obj })
    }
  },
  methods: {
    async addTrash(e){
      const dataId = Number(e.currentTarget.getAttribute('data-id'));
      
      await modifyUploadFile({ name: 'trash', trash: true, id: dataId })
      await getUploadFile().then(res => res.json()).then(files => {
        this.$store.commit('addFiles', files)
      })
    },
    async addStarred(e){
      const dataId = Number(e.currentTarget.getAttribute('data-id'));
      
      await modifyUploadFile({ name: 'starred', starred: true, id: dataId })
      await getUploadFile().then(res => res.json()).then(files => {
        this.$store.commit('addFiles', files)
      })
    }
  },
  async created(){
    await getUploadFile().then(res => res.json()).then(files => {
      this.$store.commit('addFiles', files)
    })
  }
};
</script>

<style>


</style>