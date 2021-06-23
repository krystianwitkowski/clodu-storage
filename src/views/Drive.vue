<template>
  <v-container>
    <v-container class="pa-0">
      <v-row>
        <v-col>
          <p style="color: #585858" class="subtitle-1 pl-3 font-weight-medium">
            My drive
          </p>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-0 mt-8">
      <v-row>
        <v-col class="pa-0">
          <p style="color: #585858" class="subtitle-2 pl-3">Files</p>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col v-for="(file, index) in files" :key="index" style="flex-basis: 33%" :data-id="file.id">
          <a :href="`data:${file.file.mimetype};base64,${file.base64}`" :download="file.file.name">
            <v-list-item-group>
              <v-list-item
                class="flex-column"
                style="
                  padding: 30px 0;
                  min-height: initial;
                  border: 1px solid rgba(0, 0, 0, 0.12);
                  height: 170px;
                  border-radius: 8px;
                "
              >
                <v-list-item-icon class="ma-0" style="align-self: center">
                  <v-icon color="#A9A9A9" style="font-size: 52px"
                    >mdi-file</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="flex: initial; padding-top: 25px">
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

export default {
  name: "Drive",
  computed: {
    files(){
      return this.$store.state.files.map((obj, i) => typeof i === 'number' ? { ...obj, file: JSON.parse(obj.file) } : null)
    }
  },
  async created(){
    await getUploadFile().then(res => res.json()).then(files => {
      this.$store.commit('addFiles', files)
    })
  }
};
</script>