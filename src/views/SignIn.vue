<template>
<v-app>
    <v-main>
      <FormLogin />
    <transition name="fetch-form">
      <Alert v-if="FormAPIStatus" />
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
      FormAPIStatus(){
        return this.$store.state.FormAPIStatus.loading;
      }
    },
    destroyed(){
      this.$store.commit('updateFormAPIStatus', { text: '', loading: false, icon: ''})
    }
}
</script>
