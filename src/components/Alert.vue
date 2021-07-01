<template>
    <v-alert
      width="320px"
      dense
      text
      prominent
      type="info"
      :icon="apiRequest.icon"
      style="position: absolute; top: 25px; right: 25px;"
    >
      {{ apiRequest.text }}
    </v-alert>
</template>

<script>
    export default {
        name: 'Alert',
        computed: {
          apiRequest(){
            return this.$store.state.apiRequest;
          }
        }
    }
</script>
