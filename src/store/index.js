import Vue from "vue";
import Vuex from "vuex";
//import firebase from "firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUserEmail: "",
    noticias: [],
    admin:false,
    editor:false,
    viewer:false
  },
  mutations: {
    setcurrentUserEmail(state, payload) {
      state.currentUserEmail = payload;
    },
    setRole(state)
    {
      const role = sessionStorage.getItem("role");
      if(role == 0)
        state.admin = true;
      else if (role == 1)
        state.editor = true;
      else
        state.viewer = true;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getcurrentUserEmail(state) {
      return state.currentUserEmail;
    },
    getRoleAdmin(state){
      return state.admin;
    },
    getRoleEditor(state){
      return state.editor;
    },
    getRoleViewer(state){
      return state.viewer;
    }
  },
});
export default store;
