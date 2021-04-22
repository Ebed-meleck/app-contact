import {
  AUTH_REQUEST,
  AUTH_LOGOUT,
  AUTH_SUCESS,
  AUTH_ERROR,
} from "../actions/actions";
import axios from "axios";
const url = "http://localhost:8000";

const state = {
  token: localStorage.getItem("token" || ""),
  status: "",
  user: {},
};

const getters = {
  isAuth: (state) => !!state.token,
  authStatus: (state) => state.status,
};

const actions = {
  onSignIn: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      axios
        .post({ url: url + "auth/login", data: user, method: "POST" })
        .then((res) => {
          const token = res.data.token;
          const user = res.data.userId;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit(AUTH_SUCESS, token, user);
          resolve(res);
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("token");
          reject(err);
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
  [AUTH_SUCESS]: (state, token, user) => {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  [AUTH_ERROR]: (state) => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: (state) => {
    state.status = "";
    state.token = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
