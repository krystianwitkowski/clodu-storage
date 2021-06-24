<template>
  <v-container>
    <v-container class="pa-4 mt-5">
      <v-row>
        <v-col class="pa-0">
          <p style="color: #585858" class="subtitle-2 pl-3">Trash</p>
        </v-col>
      </v-row>
      <v-row class="mt-7" style="max-width: 780px;">
        <v-col style="padding: 8px; width: 260px; height: 180px;flex-basis: initial; flex-grow: initial; max-width: initial;"> <!-- v-for="(file, index) in files" :key="index" ( to add!!! )-->
          <a style="display: block; height: 100%;border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 8px;"><!-- <a :href="`data:${file.file.mimetype};base64,${file.base64}`" :download="file.file.name"> -->
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
                  <v-icon color="#A9A9A9" style="font-size: 26px"
                    >mdi-file-image</v-icon
                  >
                </v-list-item-icon>
                <div class="item-icons d-flex" style="position: absolute; top: -30px; right: 5px;">
                  <v-list-item-icon class="ma-0">
                    <v-icon color="#A9A9A9" style="font-size: 19px"
                      >mdi-restore</v-icon
                    >
                  </v-list-item-icon>
                </div>
                <v-list-item-content style="flex: initial;">
                  <v-list-item-title style="color: #585858" class="subtitle-2"
                    > test.png<!-- {{ file.file.name }} --> </v-list-item-title
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

export default {
    name: 'Trash'
}
</script>
