<template>
  <v-container class="pa-8 pt-0 pb-0">
      <v-row class="ma-0" style="z-index: 999; height: 60px;">
        <v-col class="pa-0">
          <Search />
          <v-divider style="position: relative; top: -22px;"></v-divider>
        </v-col>
      </v-row>
      <v-row class="mt-8" style="max-width: 852px;">
        <v-col v-for="(file, index) in files" :key="index" style="margin: 12px; padding: 8px; width: 260px; height: 180px;flex-basis: initial; flex-grow: initial; max-width: initial;">
          <div class="item-icons d-flex justify-end mb-1">
            <v-list-item-icon class="ma-0" @click="addRestore" :data-id="file.id">
              <v-btn
                icon
                color="#DCDCDC"
                width="30"
                height="30"
              >
                <v-icon style="font-size: 19px;">mdi-restore</v-icon>
              </v-btn>
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
                  <v-icon :color="file.icons.color" style="font-size: 28px"
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
</template>
<script>
import Search from '../components/Search.vue';
import getUploadFile from '../api/getUploadFile.js';
import modifyUploadFile from '../api/modifyUploadFile.js';

export default {
    name: 'Trash',
    components: {
      Search
    },
    computed: {
      files(){
        if(this.$store.state.search.length > 0){
          return this.$store.state.files.filter(obj => obj.trash).map((obj, i) => typeof i === "number" ? {...obj, file: JSON.parse(obj.file)} : { ...obj }).filter(file => file.file.name.includes(this.$store.state.search))
        }

        else {
          return this.$store.state.files.filter(obj => obj.trash).map((obj, i) => typeof i === "number" ? {...obj, file: JSON.parse(obj.file)} : { ...obj })
        }
      }
    },
    methods: {
      async addRestore(e){
        const dataId = Number(e.currentTarget.getAttribute('data-id'));

        this.$store.commit('toggleApiRequest', { text: 'Action in progress', value: true })

        await modifyUploadFile({ name: 'trash', trash: false, id: dataId })
        await getUploadFile().then(res => res.json()).then(files => {
          this.$store.commit('addFiles', files)
        })

        this.$store.commit('toggleApiRequest', { text: 'Action in progress', value: false })

      },
      clearSearch(){
        this.$store.commit('updateSearch', '');
      }
    },
    async created(){
      await getUploadFile().then(res => res.json()).then(files => {
        this.$store.commit('addFiles', files)
      })

      this.clearSearch();
    }
}
</script>
