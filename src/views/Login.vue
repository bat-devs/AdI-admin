<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Entrar</small>
          </div>
          <form @submit.prevent="userLogin" role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="user.email"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Palavra-passe"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="user.password"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Lembrar-me</span>
            </base-checkbox>
            <div class="text-center">
              <button type="submit" class="btn btn-primary my-4">Entrar</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"
            ><small>Esqueceu a palavra-passe?</small></a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import swal from "sweetalert2";
import store from "@/store/index"
const db = firebase.firestore();

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          db.collection("admin").where("email", "==", this.user.email).get().then(async snapshot => {
            const admin = snapshot.docs[0].data();
            if(admin) {
              sessionStorage.setItem('role', admin.role);
              store.commit("setRole");
              console.log(store.state.admin);
              this.$router.push("/home");
            }
          })
          .catch((error) => {
            swal.fire({
              title: error.message,
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success btn-fill",
              },
            });
          });
        })
        .catch((error) => {
          swal.fire({
            title: error.message,
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success btn-fill",
            },
          });
        });
    },
  },validation(){
    
  }
};
</script>
<style>
</style>
