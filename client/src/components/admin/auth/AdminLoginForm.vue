<template>
  <v-col
      cols="12"
      sm="5"
      md="5"
      lg="4"

      align-self="center"
      class="pa-6"
  >
    <v-form
        ref="loginForm"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-posta"

      ></v-text-field>
      <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Şifre"
          counter
          @click:append="show1 = !show1"
      ></v-text-field>
      <v-checkbox
          v-model="checkbox"
          label="Beni Hatırla"
      ></v-checkbox>

      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
      >
        Giriş Yap
      </v-btn>


    </v-form>
  </v-col>
</template>

<script>


export default {
  name: "AdminLogin",
  data: () => ({
    valid: true,
    password: '',
    show1: false,
    passwordRules: [
      v => !!v || 'Şifre alanı boş bırakılamaz',
      v => (v && v.length > 7) || 'Şifre en az 7 karakter olmalı.',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-posta alanı boş bırakılamaz',
      v => /.+@.+\..+/.test(v) || 'Geçerli bir E-posta adresi girin.',
    ],
    checkbox: false,
  }),

  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        const loginInfo = {email: this.email, password: this.password}
        this.$store.dispatch("login",loginInfo)

      } else {
        console.log("admin true dmnd")
      }


    },
  },
}
</script>

<style scoped>

</style>