<template>
    <v-alert
      dense
      text
      :icon="false"
      type="info"
      style="height: 50px; min-width: 290px; padding-left: 25px; padding-right: 25px; color: #ffffff; position: absolute; bottom: 15px; right: 30px;"
      class="d-flex align-center"
    >
    <v-progress-circular
      indeterminate
      color="primary"
      size="21"
      width="3"
    ></v-progress-circular>
      <span class="ml-4" style="position: relative; top: 1px;">{{ FilesAPIStatus.text }}</span>
    </v-alert>
</template>

<script>
    export default {
        name: 'AlertFiles',
        computed: {
          FilesAPIStatus(){
            return this.$store.state.FilesAPIStatus;
          }
        }
    }
</script>
