<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <div class="container-fluid mt-4">
      <base-input
        v-model="email"
        type="email"
        label="Email"
        placeholder="Email do gestor"
        input-classes="form-control"
        class="col-4"
      />
      <base-dropdown
        class="col-4"
      >
        <base-button slot="title" type="secondary" class="dropdown-toggle">
          {{ role === 2 ? 'Visualizador' : role === 1 ? 'Editor' : role === 0 ? 'Administrador' : 'Função' }}
        </base-button>
        <a class="dropdown-item" @click="setRole(0)">Administrador</a>
        <a class="dropdown-item" @click="setRole(1)">Editor</a>
        <a class="dropdown-item" @click="setRole(2)">Visualizador</a>
      </base-dropdown>
      <div class="mt-4 col-4">
        <base-button
          type="primary"
          @click="createUser()"
          >Adicionar Gestor
        </base-button>
        <base-button
          type="warning"
          class="ml-auto"
          >Voltar
        </base-button>
      </div>
    </div>
  </div>
</template>
  
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import BaseDropdown from '../components/BaseDropdown.vue';
import firebase from 'firebase';
import CryptoJS from 'crypto-js';

Vue.use(VueClipboard);
export default {
  components: { BaseDropdown },
  data() {
    return {
      role: 3,
      email: '',
    }
  },
  methods: {
    setRole(role) {
      this.role = role;
    },
    createUser() {
      console.log('This Store State ::::: ', this.$store.state);
      firebase.auth().signOut().then(() =>
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, 'Angola123')
          .then(() =>
            firebase.firestore().collection('admin').add({
              email: this.email,
              role: this.role,
            })
            .then(() =>
              firebase.auth().signOut().then(() =>
                firebase
                  .auth()
                  .signInWithEmailAndPassword(
                    this.$store.state.currentUserEmail, 
                    this.$store.state.currentUserPassword.toString(CryptoJS.enc.Utf8)
                  )
                  .catch(error => console.log('Error 3 :::::: ', error))
              )
            )
            .catch(error => console.log('Error 2 :::: ', error))
          )
          .catch(error => console.log('Error 1 ::::: ', error))
      );
    }
  }
};
</script>
<style>
</style>
