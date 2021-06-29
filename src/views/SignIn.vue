<template>
<v-app>
    <v-main>
      <FormLogin />
    </v-main>
</v-app>
</template>

<script>
import FormLogin from '../components/FormLogin.vue';

    export default {
        name: 'SignIn',
        components: {
          FormLogin
        }
    }
</script>
