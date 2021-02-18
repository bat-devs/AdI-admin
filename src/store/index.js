import Vue from "vue";
import Vuex from "vuex";
import CryptoJS from 'crypto-js';
//import firebase from "firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUserEmail: "",
    currentUserPassword: "",
    noticias: [],
    role: 2,
  },
  mutations: {
    refresh(state) {
      state.currentUserEmail = sessionStorage.getItem('email');
      state.currentUserPassword = CryptoJS.AES.decrypt(sessionStorage.getItem('__'), 'my pass key');
      state.role = JSON.parse(sessionStorage.getItem('role'));
    },
    changePassword(state, payload) {
      const password = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(payload), 'my pass key');
      state.currentUserPassword = CryptoJS.AES.decrypt(password, 'my pass key');
      sessionStorage.setItem('__', password);
    },
    setCurrentUser(state, payload) {
      const password = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(payload.password), 'my pass key');

      sessionStorage.setItem('email', payload.email);
      sessionStorage.setItem('role', JSON.stringify(payload.role));
      sessionStorage.setItem('__', password);
      state.currentUserEmail = payload.email;
      state.currentUserPassword = CryptoJS.AES.decrypt(password, 'my pass key');
      state.role = payload.role;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getCurrentUserEmail(state) {
      return state.currentUserEmail;
    },
    getRoleAdmin(state){
      return state.role == 0;
    },
    getRoleEditor(state){
      return state.role == 1;
    },
    getRoleViewer(state){
      return state.role == 2;
    }
  },
});
export default store;
