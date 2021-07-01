<template>
  <v-form class="form-register d-flex align-center" v-model="valid" style="height: 100%; width: 100%;">
    <v-container class="form-register-shadow pl-12 pr-12 pt-12 pb-12" style="box-shadow: 0 0 21px 0 rgb(0 0 0 / 3%); background: #ffffff; border-radius: 8px; max-width: 360px;">
      <v-row class="mt-0 pl-2 pr-2">
        <v-col style="padding: 0px; position: relative;">
         <v-text-field
            label="Name"
            v-model="user.name"
            outlined
            dense
          ></v-text-field>
          <p style="position: absolute; right: 12px; top: 48px; font-size: 14px; color: #ff0038">{{ this.validate[0] }}</p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    <v-row class="mt-6 pl-2 pr-2" style="position: relative;">
        <v-col style="padding: 0px; padding-right: 38px; position: relative;">
         <v-text-field
            label="Password"
            :type="currentTypePassword"
            v-model="user.password"
            outlined
            dense
          ></v-text-field>
          <p style="position: absolute; right: 12px; top: 48px; font-size: 14px; color: #ff0038">{{ this.validate[1] }}</p>
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
    <v-row class="mt-4">
      <v-col>
        <p style="font-size: 14px; text-align: right; color: #999">Already have an account ? <router-link to="/signup" style="text-decoration: none;">Sign up</router-link></p>
      </v-col>
    </v-row>
        <v-btn @click="handleClickSubmit" class="mt-5" width="100%" color="primary" height="42px" style="text-transform: capitalize;">
          Sign in
        </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import authentication from '../api/authentication.js';

export default {
    name: 'FormLogin',
    data(){
      return {
        user: {
          name: '',
          password: ''
        },
        validate: ['', ''],
        visiblePassword: false
      }
    },
    computed: {
      visibleEyeIcon(){
        return this.visiblePassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
      },
      currentTypePassword(){
        return this.visiblePassword ? 'text' : 'password'
      }
    },
    methods: {
      handleClickIcon(){
        this.visiblePassword = !this.visiblePassword
      },
      async handleClickSubmit(){
        try {
          const res = await authentication(JSON.parse(JSON.stringify(this.user)))
          const body = await res.json();

            if(res.status === 200){
              
              localStorage.setItem('tokens', JSON.stringify(body))

              this.$router.push({ path: '/dashboard/drive' })
            }

            else {
              this.validate = body.validate
            }

        } catch {
          console.log('Something went wrong');
        }
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
