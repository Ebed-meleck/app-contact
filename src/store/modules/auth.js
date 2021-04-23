import {
  AUTH_REQUEST,
  AUTH_LOGOUT,
  AUTH_SUCESS,
  AUTH_ERROR,
} from "../actions/actions";
import axios from "axios";

const state = {
  token: localStorage.getItem("token" || ""),
  status: "",
  user: {},
  isAuth: false,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};

const actions = {
  [AUTH_REQUEST]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      axios
        .post("auth/login", user)
        .then((res) => {
          const isAuth = res.data.auth;
          const token = res.data.token;
          const user = res.data.userId;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["authorization"] = token;
          commit(AUTH_SUCESS, token, user, isAuth);
          resolve(res);
        })
        .catch((error) => {
          commit(AUTH_ERROR, error);
          localStorage.removeItem("token");
          reject(error);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve({});
    });
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "loading";
  },
  [AUTH_SUCESS]: (state, token, user, isAuth) => {
    state.status = "success";
    state.token = token;
    state.user = user;
    state.isAuth = isAuth;
  },
  [AUTH_ERROR]: (state) => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: (state) => {
    state.status = "";
    state.token = "";
    state.isAuth = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
