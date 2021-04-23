import { createStore } from "vuex";
import auth from "./modules/auth";
import data from "./modules/data";
export default createStore({
  modules: {
    auth,
    data,
  },
  strict: process.env.NODE_ENV !== "production",
});
