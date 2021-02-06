import Vue from "vue";
import Vuex from "vuex";
//import firebase from "firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUserEmail: "",
    noticias: [],
    admin:true,
    editor:false,
    viewer:false
  },
  mutations: {
    setcurrentUserEmail(state, payload) {
      state.currentUserEmail = payload;
    },
    setAdmin(state,payload)
    {
      state.admin=payload;
    },
    setEditor(state,payload)
    {
      state.admin=payload;
    },
    setViewer(state,payload)
    {
      state.admin=payload;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getcurrentUserEmail(state) {
      return state.currentUserEmail;
    },
  },
});
export default store;
