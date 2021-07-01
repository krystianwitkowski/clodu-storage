<template>
<transition name="fetch-form">
  <v-form v-if="form" class="form-register d-flex align-center" style="height: 100%; width: 100%;">
    <v-container class="form-register-shadow pl-12 pr-12 pt-12 pb-12" style="box-shadow: 0 0 21px 0 rgb(0 0 0 / 3%); background: #ffffff; border-radius: 8px; max-width: 360px;">
      <v-row class="mt-0 pl-2 pr-2">
        <v-col style="padding: 0px; position: relative;">
         <v-text-field
            label="Name"
            outlined
            dense
            v-model="user.name"
          ></v-text-field>
          <p style="position: absolute; right: 12px; top: 48px; font-size: 14px; color: #ff0038">{{ this.validate[0] }}</p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-6 pl-2 pr-2">
        <v-col style="padding: 0px; position: relative;">
         <v-text-field
            label="Email"
            outlined
            dense
            v-model="user.email"
          ></v-text-field>
          <p style="position: absolute; right: 12px; top: 48px; font-size: 14px; color: #ff0038">{{ this.validate[1] }}</p>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-6 pl-2 pr-2" style="position: relative;">
        <v-col style="padding: 0px; padding-right: 38px; position: relative;">
         <v-text-field
            label="Password"
            :type="currentTypePassword"
            outlined
            dense
            v-model="user.password"
          ></v-text-field>
          <p style="position: absolute; right: 12px; top: 48px; font-size: 14px; color: #ff0038">{{ this.validate[2] }}</p>
        </v-col>
          <v-btn
            icon
            color="#B0B0B0"
            @click="handleClickIcon"
            style="position: absolute; right: 12px;"
          >
            <v-icon>{{ visibleEyeIcon }}</v-icon>
          </v-btn>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-6 pl-2 pr-2">
        <v-col style="padding: 0px; position: relative;">
         <v-text-field
            label="Repeat password"
            :type="currentTypePassword"
            outlined
            dense
            v-model="user.repeatPassword"
          ></v-text-field>
          <p style="position: absolute; right: 12px; top: 48px; font-size: 14px; color: #ff0038">{{ this.validate[3] }}</p>
        </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col>
        <p style="font-size: 14px; text-align: right; color: #999">Already have an account ? <router-link to="/signin" style="text-decoration: none;">Sign in</router-link></p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
        <v-btn @click="handleClickButton" class="mt-9" width="100%" color="primary" height="42px" style="text-transform: capitalize;">
          Sign up
        </v-btn>
    </v-container>
  </v-form>
</transition>
</template>

<script>

import createUsers from '../api/createUsers.js'

export default {
    name: 'FormRegister',
    data(){
      return {
        user: {
          name: '',
          email: '',
          password: '',
          repeatPassword: ''
        },
        validate: ['', '', '', ''],
        visiblePassword: false,
        form: false
      }
    },
    computed: {
      visibleEyeIcon(){
        return this.visiblePassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
      },
      currentTypePassword(){
        return this.visiblePassword ? 'text' : 'password';
      }
    },
    methods:{
      async handleClickButton(){
        try {
          const res = await createUsers(JSON.stringify(this.user))

          if(res.status === 201){
            this.$router.push({ path: '/signin'})
          }

          else {
            const body = await res.json()

            this.validate = body.validate
            
            this.$store.commit('toggleApiRequest', { text: 'Something went wrong', value: false, icon: 'mdi-information-outline' })

          }
        } catch {
          this.$store.commit('toggleApiRequest', { text: 'Something went wrong', value: true, icon: 'mdi-information-outline' })
        }
      },
      handleClickIcon(){
        this.visiblePassword = !this.visiblePassword
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.form = true;
      })
    }
}

</script>

<style>
.form-register .v-text-field--outlined .v-input__control .v-input__slot fieldset {
  border: none !important;
}

.form-register .v-text-field--outlined .v-input__control .v-input__slot .v-text-field__slot .v-label{
  color: #B0B0B0 !important;
}

.form-register .v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0 !important;
}

.fetch-form-enter-active, .fetch-form-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.fetch-form-enter, .fetch-form-leave-to {
  opacity: 0;
  transform: translateX(-80px);
}


</style>
