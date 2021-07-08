<template>
    <v-alert
      width="320px"
      dense
      text
      prominent
      type="info"
      :icon="FormAPIStatus.icon"
      style="position: absolute; top: 25px; right: 25px;"
    >
      {{ FormAPIStatus.text }}
    </v-alert>
</template>

<script>
    export default {
        name: 'AlertForm',
        computed: {
          FormAPIStatus(){
            return this.$store.state.FormAPIStatus;
          }
        }
    }
</script>
