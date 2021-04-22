<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <div class="form">
      <form @submit.prevent="login()">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="user.username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" />
        </div>
        <div class="submit">
          <button type="submit" class="btn btn-primary" @click="login()">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
//import { AUTH_REQUEST } from "../store/actions/actions";
import axios from "axios";
export default {
  components: "Login",
  data() {
    return {
      user: {},
    };
  },

  methods: {
    login: function () {
      const { username, password } = this.user;
      axios
        .post("http://localhost:8000/auth/login", { username, password })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.login-container {
  position: absolute;
  top: 30%;
  left: 26%;
  width: 40%;
  right: 50%;
  color: white;
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: rgba(63, 133, 236, 0.904);
  border-radius: 10px 10px / 10px 10px;
}
.login-container h1 {
  margin-bottom: 30px;
}
form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
form label {
  margin: 10px;
  font-style: normal;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
form input {
  border-radius: 8px;
  padding: 4px;
}
.form {
  margin-right: 15px;
}
.submit {
  margin-left: 35px;
}
</style>
