<template>
    <v-alert
      width="320px"
      dense
      text
      prominent
      type="info"
      :icon="FilesAPIStatus.icon"
      style="position: absolute; top: 25px; right: 25px;"
    >
      {{ FilesAPIStatus.text }}
    </v-alert>
</template>

<script>
    export default {
        name: 'Alert',
        computed: {
          FilesAPIStatus(){
            return this.$store.state.FilesAPIStatus;
          }
        }
    }
</script>
