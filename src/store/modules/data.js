import {
  GET_DATA,
  //MODIFY_DATA,
  //DELETE_DATA,
  //ADD_DATA,
} from "../actions/actions";
import axios from "axios";

const state = {
  contact: [],
};
const getters = {
  data: (state) => !!state.contact,
};

const actions = {
  [GET_DATA]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(GET_DATA);
      axios
        .get("conatct/all")
        .then((res) => {
          const contacts = res.data;
          commit(GET_DATA, contacts);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
const mutations = {
  [GET_DATA]: (state, contact) => {
    state.contact = contact;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
