<template>
<v-app>
  <v-main style="position: relative;">
    <FormRegister />
    <transition name="fetch-form-api">
      <Alert v-if="apiRequestStatus" />
    </transition>
  </v-main>
</v-app>
</template>

<script>
import Alert from '../components/Alert.vue';
import FormRegister from '../components/FormRegister.vue';

export default {
    name: 'SignUp',
    components: {
      FormRegister,
      Alert
    },
    computed: {
      apiRequestStatus(){
        return this.$store.state.apiRequest.value;
      }
    },
    destroyed(){
      this.$store.commit('toggleApiRequest', { text: '', value: false, icon: ''})
    }
}

</script>
<style>
.fetch-form-api-enter-active, .fetch-form-api-leave-active {
  transition: opacity .5s;
}
.fetch-form-api-enter, .fetch-form-api-leave-to {
  opacity: 0;
}
</style>
