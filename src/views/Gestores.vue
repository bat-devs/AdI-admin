<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
    </base-header>

    <div class="d-flex justify-content-start" style="margin: 20px">
      <router-link to="/gestores/adicionar-gestor" class="btn btn-primary">
        <i class="fas fa-plus"></i> Adicionar Gestor
      </router-link>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <half-circle-spinner
        v-if="loader"
        :animation-duration="1000"
        :size="60"
        color="#113855"
      />
    </div>
    <div class="table-responsive" v-if="!loader">
      <div>
        <table class="table align-items-center table-light">
          <thead class="thead-light">
            <tr>
              <th scope="col" class="sort" data-sort="name">Email</th>
              <th scope="col" class="sort" data-sort="name">Nível de acesso</th>
              <th scope="col" class="sort" data-sort="name">Acções</th>
              <th scope="col" class="sort" data-sort="name">Inscrição feita por:</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="(conta, index) in contas" :key="index">
              <td class="budget">{{ conta.email }}</td>
              <td class="budget">
                {{
                  conta.role === 0
                    ? "Administrador"
                    : conta.role === 1
                    ? "Editor"
                    : "Visualizador"
                }}
              </td>
              <td class="budget">
                <button @click="deleteGestor(conta.id)" class="btn btn-danger">
                  Apagar
                </button>
              </td>
              <td class="budget">{{ conta.assignedby }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { HalfCircleSpinner } from "epic-spinners";
import firebase from "firebase";
import Swal from "sweetalert2";
const db = firebase.firestore();
export default {
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      loader: false,
      contas: [],
    };
  },
  created() {
    /*db.collection("admin")
      .get()
      .then((snapshot) => {
        const contas = [];
        snapshot.forEach((doc) => {
          let f = doc.data();
          contas.push({ ...f, id: doc.id });
        });
        this.contas = contas;
        console.log("Conta ::: ", contas);
      });*/
    db.collection("admin").onSnapshot((querySnapshot) => {
      var contas = [];
      querySnapshot.forEach(function (doc) {
        let f = doc.data();
        contas.push({
          ...f,
          id: doc.id,
        });
      });
      this.contas=contas;      
    })
  },
  methods: {
    deleteGestor(id) {
      console.log(id);
      Swal.fire({
        title: "Tem a certeza que deseja eliminar este gestor?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim!",
      }).then((result) => {
        if (result.isConfirmed) {
          db.collection("admin")
            .doc(id)
            .delete()
            .then(function () {
              Swal.fire("Apagado!", "O gestor foi apagado", "success");
            })
            .catch(function (error) {
              Swal.fire(error.message, "warning");
            });
          
        }
      });
    },
  },
};
</script>
