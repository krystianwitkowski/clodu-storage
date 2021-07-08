<template>
<v-app>
  <v-main style="position: relative;">
    <FormRegister />
    <transition name="fetch-form">
      <AlertForm v-if="FormAPIStatus" />
    </transition>
  </v-main>
</v-app>
</template>

<script>
import AlertForm from '../components/AlertForm.vue';
import FormRegister from '../components/FormRegister.vue';

export default {
    name: 'SignUp',
    components: {
      FormRegister,
      AlertForm
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