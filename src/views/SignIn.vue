<template>
<v-app>
    <v-main>
      <FormLogin />
    <transition name="fetch-form">
      <AlertForm v-if="FormAPIStatus" />
    </transition>
    </v-main>
</v-app>
</template>

<script>
import AlertForm from '../components/AlertForm.vue';
import FormLogin from '../components/FormLogin.vue';

export default {
    name: 'SignIn',
    components: {
      FormLogin,
      AlertForm
    },
    computed: {
      FormAPIStatus(){
        return this.$store.state.FormAPIStatus.loading;
      }
    },
    destroyed(){
      this.$store.commit('updateFormAPIStatus', { text: '', loading: false, icon: ''})
    },
    mounted(){
      this.$store.commit('updateSynchronize', true)
      this.$store.commit('updateValidateUser', { validate: ['', ''] })
    }
}
</script>
