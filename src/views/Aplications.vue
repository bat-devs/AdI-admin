<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <div class="mt-3 ml-3 mb-3" v-if="!loader">
      <button class="btn btn-primary" v-if="this.$store.state.getRoleEditor || this.$store.getters.getRoleAdmin"  @click="changeTax = true">
        Alterar o valor das taxas
      </button>
    </div>
    <modal :show.sync="changeTax" v-if="this.$store.state.getRoleEditor || this.$store.getters.getRoleAdmin">
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Mudar as taxas de créditos
        <span style="font-weight: bold"></span>
      </h5>

      <div class="row d-flex justify-content-around">
        <button
          class="btn btn-primary mt-4"
          @click="getCredit(credit.id)"
          v-for="(credit, index) in creditsTaxes"
          :key="index"
        >
          {{ credit.data().name }}
        </button>
      </div>
      <template slot="footer">
        <base-button type="secondary" class="ml-auto" @click="changeTax = false"
          >Fechar
        </base-button>
      </template>
    </modal>
    <modal :show.sync="editTax" v-if="this.$store.getters.getRoleEditor ||this.$store.getters.getRoleAdmin">
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Editar
        <span style="font-weight: bold"></span>
      </h5>
      <form @submit.prevent="editCredit">
        <table class="list">
          <tr v-for="(valor, juroIndex) in juros" :key="juroIndex">
            <th>{{ valor[0] }}</th>
            <td
              v-for="(taxa, taxaIndex) in valor.slice(1)"
              :key="taxaIndex"
              style="inline-block; text-align: center;"
            >
              <span v-if="juroIndex === 0">{{ taxa }} meses</span>
              <input
                class="form-control"
                :value="taxa"
                v-if="juroIndex > 0"
                max="100"
              />
            </td>
          </tr>
        </table>
        <div class="mt-2 d-flex justify-content-around">
          <base-button
            type="secondary"
            value="not"
            class="ml-auto"
            @click="editTax = false"
            >Fechar
          </base-button>
          <button class="btn btn-primary ml-auto" value="not" type="submit">
            Guardar Novas Taxas
          </button>
        </div>
      </form>
    </modal>
    <div class="d-flex justify-content-center">
      <half-circle-spinner
        class="mt-4"
        v-if="loader"
        :animation-duration="1000"
        :size="60"
        color="#113855"
      />
    </div>
    <div class="table-responsive">
      <div>
        <table class="table align-items-center table-light" v-if="!loader">
          <thead class="thead-light">
            <tr>
              <th scope="col" class="sort" data-sort="name">Nome do cliente</th>
              <th scope="col" class="sort" data-sort="name">Aplicação</th>
              <th scope="col" class="sort" data-sort="budget">Capital</th>
              <th scope="col" class="sort" data-sort="budget">Duração</th>
              <th scope="col" class="sort" data-sort="budget">Resultado</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="(credit, index) in credits" :key="index">
              <td class="budget">{{ credit.name }}</td>
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">{{
                      credit.productName
                    }}</span>
                  </div>
                </div>
              </th>
              <td class="budget">{{ credit.capital }} AKZ</td>
              <td class="budget">{{ credit.duration }} meses</td>
              <td class="budget">{{ credit.result.toFixed(2) }} AKZ</td>
              <td class="budget">{{ new Date(credit.createdAt).toLocaleString()}} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";

import { HalfCircleSpinner } from "epic-spinners";
import swal from "sweetalert2";

const db = firebase.firestore();
const creditsTaxes = [];
let juros1 = [];
export default {
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      credits: [],
      loader: true,
      changeTax: false,
      editTax: false,
      creditsTaxes,
      juros: [],
      id: "",
    };
  },
  created() {
    db.collection("simulation")
      .where("type", "==", "Aplicação")
      .onSnapshot((querySnapshot) => {
        var creditsArray = [];
        querySnapshot.forEach(async (doc) => {
          let f = doc.data();
          let name = await (
            await db.collection("users").doc(doc.data().uid).get()
          ).data().name;
          let email = await (
            await db.collection("users").doc(doc.data().uid).get()
          ).data().email;
          creditsArray.push({
            ...f,
            name: name,
            email: email,
          });
          creditsArray.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        });
        this.credits = creditsArray;
        this.loader = false;
      });

    db.collection("applications")
      .get()
      .then(querySnapshot => querySnapshot.forEach(doc => creditsTaxes.push(doc)));
  },
  methods: {
    async getCredit(id) {
      this.id = id;
      juros1 = [];
      await db
        .collection("applications")
        .doc(id)
        .collection("taxTable")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            juros1.push(doc.data()[doc.id]);
          });
          this.juros = juros1;
        });
      this.changeTax = false;
      this.editTax = true;
    },
    editCredit(submitEvent) {
      const elements = submitEvent.target.elements;
      let novasTaxas = [];
      novasTaxas.push(this.juros[0]);
      this.juros.forEach((value, index) => {
        if (index > 0) {
          let newLine = [];
          value.forEach((_, taxIndex) => {
            const currentIndex =
              taxIndex - 1 + (index - 1) * (value.length - 1);
            if (taxIndex === 0) {
              newLine.push(value[taxIndex]);
            } else if (elements[currentIndex].value !== "not") {
              newLine.push(elements[currentIndex].value);
            }
          });
          novasTaxas.push(newLine);
        }
      });
      novasTaxas.forEach(
        async (line, index) =>
          await db
            .collection("applications")
            .doc(this.id)
            .collection("taxTable")
            .doc(`${index}`)
            .update({
              [`${index}`]: line,
            })
            .then(() => {
              swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
              this.editTax=false;
            })
      );
    },
  },
};
</script>
