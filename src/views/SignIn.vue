<template>
<v-app>
    <v-main>
      <FormLogin />
    <transition name="fetch-form">
      <Alert v-if="apiRequestStatus" />
    </transition>
    </v-main>
</v-app>
</template>

<script>
import Alert from '../components/Alert.vue';
import FormLogin from '../components/FormLogin.vue';

export default {
    name: 'SignIn',
    components: {
      FormLogin,
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
