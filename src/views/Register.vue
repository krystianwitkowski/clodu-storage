<template>
<v-app>
    <v-main>
      <FormRegister />
    </v-main>
</v-app>
</template>

<script>
import FormRegister from '../components/FormRegister.vue';

    export default {
        name: 'Register',
        components: {
          FormRegister
        }
    }
</script>
