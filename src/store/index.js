import UsersStore from "./modules/UsersStore";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UsersStore
  },
});
