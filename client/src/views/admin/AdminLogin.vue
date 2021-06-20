<template>
  <v-row >
    <v-col
        cols="12"
        sm="7"
        md="7"
        lg="8"
        class="loginImage"
    >
    </v-col>
    <admin-login-form></admin-login-form>
  </v-row>
</template>

<script>
import AdminLoginForm from "@/components/admin/auth/AdminLoginForm";
export default {
  name: 'Login',
  components: {AdminLoginForm},

}
</script>

<style scoped>
.row {
  height: 100vh;
  width: 100%;
  margin: 0;
}

.loginImage {
  background-image: url("../../assets/image/maxresdefault.jpg");
  background-size: cover;
  background-position: bottom;
}

hr {
  position: absolute;
  bottom: 23px;
  z-index: -1;
}


</style>