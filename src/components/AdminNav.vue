<template>
  <nav>
    <div class="head">
      <h2>{{ appContact }}</h2>
    </div>
    <div class="log">
      <span v-if="isLoggin" class="btn"> Admin </span>
      <span v-if="isLoggin" class="btn" @click="logout()">Log out</span>
    </div>
  </nav>
</template>
<script>
import { AUTH_LOGOUT } from "../store/actions/actions";

export default {
  name: "AdminNav",
  data() {
    return {
      appContact: "App-contact",
    };
  },
  computed: {
    isLoggin: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>
<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  position: fixed;
  background-color: rgb(35, 143, 243);
  padding: auto;
  width: 100%;
}
.head h2 {
  font-weight: 300;
  font-family: bold;
}
.head {
  align-content: center;
  margin-left: 30px;
}
.log {
  margin-right: 30px;
}
</style>
