<template>
  <v-form class="form-register d-flex align-center" v-model="valid" style="height: 100%; width: 100%;">
    <v-container class="form-register-shadow pl-12 pr-12 pt-12 pb-12" style="box-shadow: 0 0 21px 0 rgb(0 0 0 / 3%); background: #ffffff; border-radius: 8px; max-width: 360px;">
      <v-row class="mt-0 pl-2 pr-2">
        <v-col style="padding: 0px; position: relative;">
         <v-text-field
            label="Name"
            outlined
            dense
            v-model="user.name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-6 pl-2 pr-2">
        <v-col style="padding: 0px">
         <v-text-field
            label="Email"
            outlined
            dense
            v-model="user.email"
          ></v-text-field>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-6 pl-2 pr-2">
        <v-col style="padding: 0px">
         <v-text-field
            label="Password"
            :type="currentTypePassword"
            outlined
            dense
            v-model="user.password"
          ></v-text-field>
        </v-col>
          <v-btn
            icon
            color="#B0B0B0"
            @click="handleClickIcon"
          >
            <v-icon>{{ visibleEyeIcon }}</v-icon>
          </v-btn>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-6 pl-2 pr-2">
        <v-col style="padding: 0px">
         <v-text-field
            label="Repeat password"
            :type="currentTypePassword"
            outlined
            dense
            v-model="user.repeatPassword"
          ></v-text-field>
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
        visiblePassword: false
      }
    },
    computed: {
      visibleEyeIcon(){
        if(this.visiblePassword){
          return 'mdi-eye-outline'
        }

        else {
          return 'mdi-eye-off-outline'
        }
      },
      currentTypePassword(){
        if(this.visiblePassword){
          return 'text'
        }

        else {
          return 'password'
        }
      }
    },
    methods:{
      async handleClickButton(){
        try {
          const res = await createUsers(JSON.stringify(this.user))

          if(res.status === 201){
            this.$router.push({ path: '/signin'})
          }
        } catch {
          console.log('Something went wrong');
        }
      },
      handleClickIcon(){
        this.visiblePassword = !this.visiblePassword
      }
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
</style>
