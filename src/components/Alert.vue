<template>
    <v-alert
      width="340px"
      dense
      text
      prominent
      type="info"
      icon="mdi-cloud-alert"
      style="position: absolute; top: 12px; right: 12px;"
    >
      {{ api.text }}
    </v-alert>
</template>

<script>
    export default {
        name: 'Alert',
        computed: {
          api(){
            return this.$store.state.apiRequest;
          }
        }
    }
</script>
