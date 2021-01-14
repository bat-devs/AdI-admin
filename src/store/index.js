import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUserEmail: "",
    noticias: [],
    apliNegocio: 0,
    apliSalario: "",
    apliFamilia: "",
    apliEstudante: "",
    apliKandengue: "",
    apliSomarPlus: "",
    cofreTesouro: "",
    credFacil: "",
    credHabitcao: "",
    credAutomovel: "",
    credPessoal: "",
    credFacilidadeTesouraria: "",
    credEmpresarial: "",
    adiantaSalario: "",
  },
  mutations: {
    setcurrentUserEmail(state, payload) {
      state.currentUserEmail = payload;
    },
    setapliNegocio(state, payload) {
      state.apliNegocio = payload;
    },
    setapliSalario(state, payload) {
      state.apliSalario = payload;
    },
    setapliFapliEstudante(state, payload) {
      state.apliEstudante = payload;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getcurrentUserEmail(state) {
      return state.currentUserEmail;
    },
    getNoticias(state) {
      return state.noticias;
    },
    getapliNegocio(state) {
        return state.apliNegocio;
      },
  },
});
export default store;
