<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
  

    <div v-if="loader" class="d-flex justify-content-center mt-4">
      <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#113855"
      />
    </div>
    <div v-if="!loader" class=" col-8 container-fluid mt--7">
        <card shadow type="secondary">
      <div slot="header" class="bg-white border-0">
        <div class="row align-items-center">
          <div class="col-8">
            <h3 class="mb-0">Adicionar Gestor</h3>
          </div>
        </div>
      </div>
      <template>
        <form @submit.prevent>
          <base-input
            v-model="email"
            type="email"
            label="Email"
            placeholder="Email do gestor"
            input-classes="form-control"
            class="col"
          />
          <base-dropdown class="col-4">
            <base-button slot="title" type="secondary" class="dropdown-toggle">
              {{
                role === 2
                  ? "Visualizador"
                  : role === 1
                  ? "Editor"
                  : role === 0
                  ? "Administrador"
                  : "Função"
              }}
            </base-button>
            <a class="dropdown-item" @click="setRole(0)">Administrador</a>
            <a class="dropdown-item" @click="setRole(1)">Editor</a>
            <a class="dropdown-item" @click="setRole(2)">Visualizador</a>
          </base-dropdown>
          <div class="mt-4 col-4">
            <base-button type="primary" @click="createUser()"
              >Adicionar Gestor
            </base-button>
          </div>
        </form>
      </template>
    </card>
    </div>
  </div>
</template>
  
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import BaseDropdown from "../components/BaseDropdown.vue";
import { HalfCircleSpinner } from "epic-spinners";
import firebase from "firebase";
import swal from "sweetalert2";
import CryptoJS from "crypto-js";

Vue.use(VueClipboard);
export default {
  components: { BaseDropdown, HalfCircleSpinner },
  data() {
    return {
      role: 3,
      loader: false,
      email: "",
    };
  },
  methods: {
    setRole(role) {
      this.role = role;
    },
    async createUser() {
      this.loader = true;
      if (this.email !== "") {
        if (this.email.match(/[\w.]+@academiadeinvestimento.ao/))
          if (this.role >= 0 && this.role <= 2)
            await firebase
              .auth()
              .signOut()
              .then(
                async () =>
                  await firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, "Angola123")
                    .then(
                      async () =>
                        await firebase
                          .firestore()
                          .collection("admin")
                          .add({
                            email: this.email,
                            role: this.role,
                            assignedby: this.$store.getters.getCurrentUserEmail,
                          })
                          .then(() =>
                            firebase
                              .auth()
                              .signOut()
                              .then(
                                async () =>
                                  await firebase
                                    .auth()
                                    .signInWithEmailAndPassword(
                                      this.$store.state.currentUserEmail,
                                      this.$store.state.currentUserPassword.toString(
                                        CryptoJS.enc.Utf8
                                      )
                                    )
                                    .then(() => {
                                      swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Gestor adicionado com sucesso",
                                        showConfirmButton: false,
                                        timer: 1500,
                                      });
                                      this.loader = false;
                                    })
                                    .catch(() => {
                                      swal.fire({
                                        position: "top-end",
                                        icon: "error",
                                        title:
                                          "Ocorreu algum erro interno, tente mais tarde",
                                        showConfirmButton: false,
                                        timer: 1500,
                                      });
                                      this.loader = false;
                                    })
                              )
                              .catch(() => {
                                swal.fire({
                                  position: "top-end",
                                  icon: "error",
                                  title:
                                    "Ocorreu algum erro interno, tente mais tarde",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });
                                this.loader = false;
                              })
                          )
                    )
                    .catch(() => {
                      swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Ocorreu algum erro interno, tente mais tarde",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      this.loader = false;
                    })
              );
          else {
            swal.fire({
              position: "top-end",
              icon: "error",
              title: "Selecione uma funcão para o gestor",
              showConfirmButton: false,
              timer: 1500,
            });
            this.loader = false;
          }
        else {
          swal.fire({
            position: "top-end",
            icon: "error",
            title: "Insira apenas email da Academia",
            showConfirmButton: false,
            timer: 1500,
          });
          this.loader = false;
        }
      } else {
        swal.fire({
          position: "top-end",
          icon: "error",
          title: "Insira um email válido",
          showConfirmButton: false,
          timer: 1500,
        });
        this.loader = false;
      }
    },
  },
};
</script>
<style>
</style>
