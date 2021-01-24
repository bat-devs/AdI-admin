<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <div class="mt-3 ml-3 mb-3" v-if="!loader">
      <button class="btn btn-primary" @click="changeTax = true">
        Alterar o valor das taxas
      </button>
    </div>
    <div class="d-flex justify-content-center">
      <half-circle-spinner
        class="mt-4"
        v-if="loader"
        :animation-duration="1000"
        :size="60"
        color="#113855"
      />
    </div>
    <modal :show.sync="changeTax">
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
          @click="editCredit(credit.id)"
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
    <modal :show.sync="editTax">
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Editar
        <span style="font-weight: bold"></span>
      </h5>

      <base-input
        name="code"
        label="Insira a referência de download"
        placeholder="Código"
        input-classes="form-control-alternative"
        
      />
      <template slot="footer">
        <base-button type="secondary" class="ml-auto" @click="editTax = false"
          >Fechar
        </base-button>
      </template>
    </modal>
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

const db = firebase.firestore();
const creditsTaxes = [];
export default {
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      credits: [],
      loader: true,
      changeTax: false,
      editTax:false,
      creditsTaxes,
    };
  },
  beforeCreate() {
    db.collection("simulation")
      .where("type", "==", "Crédito")
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
        });
        this.credits = creditsArray;
        this.loader = false;
      });

    db.collection("credits")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(async (doc) => {
          let f = doc;
          creditsTaxes.push(f);
        });
      });
  },
  methods: {
    editCredit(id) {
      db.collection("credits")
        .doc(id)
        .collection("taxTable")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(async (doc)=>{
            console.log(doc.data()[doc.id])
          })
        });
        this.changeTax=false;
        this.editTax=true;
    },
  },
};
</script>
