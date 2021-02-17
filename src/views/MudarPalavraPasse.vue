<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
    </base-header>

      <base-input
        v-model="password"
        type="password"
        label="Palavra-passe"
        placeholder="Nova palavra-passe"
        input-classes="form-control"
        class="col-4"
      />
      <base-input
        v-model="confirmPassword"
        type="password"
        label="Confirmar Palavra-passe"
        placeholder="Confirme sua palavra-passe"
        input-classes="form-control"
        class="col-4"
      />
        <base-button
          type="primary"
          @click="changePassword()"
          >Mudar Palavra-Passe
        </base-button>
  </div>
</template>
  
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import firebase from 'firebase';
import swal from "sweetalert2";

Vue.use(VueClipboard);
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    setRole(role) {
      this.role = role;
    },
    changePassword() {
      if(this.password !== '') {
        if(this.password === this.confirmPassword)
          firebase.auth().currentUser.updatePassword(this.password)
            .then(() => {
              this.$store.commit('changePassword', this.password);
              swal.fire({
                position: "top-end",
                icon: "sucess",
                title: "As palavras-passe têm que ser iguais",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch(() =>
              swal.fire({
                position: "top-end",
                icon: "error",
                title: "Ocorreu algum erro, saia da sua conta, volte a entrar e tente novamente",
                showConfirmButton: false,
                timer: 1500,
              })
            );
        else
            swal.fire({
              position: "top-end",
              icon: "error",
              title: "As palavras-passe têm que ser iguais",
              showConfirmButton: false,
              timer: 1500,
            });
      }
      else 
        swal.fire({
          position: "top-end",
          icon: "error",
          title: "Deve ser inserida alguma palavra-passe",
          showConfirmButton: false,
          timer: 1500,
        });
    }
  }
};
</script>
<style>
</style>


