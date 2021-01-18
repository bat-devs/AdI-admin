<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <download-excel :data="data.json_data"
    :fields="data.json_fields" class="mt-3 ml-3 mb-3" style="width:230px"
    name="Simulações de créditos.xls">
      <button class="btn btn-primary"><i class="fas fa-file-excel"></i> Baixar ficheiro excel</button>
    </download-excel>
    <div class="d-flex justify-content-center">
      <half-circle-spinner
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import JsonExcel from "vue-json-excel";

import { HalfCircleSpinner } from "epic-spinners";

const db = firebase.firestore();

export default {
  components: {
    HalfCircleSpinner,
    downloadExcel: JsonExcel,
  },
  data() {
    return {
      credits: [],
      loader: true,
      data: {
        json_fields: {
          "Nome do cliente": "name",
          "E-mail":"email",
          "Telefone":"phone",
          "Data de registo":"registDate",
          "Abertura de conta":"accountOpening",
          "Aplicação": "productName",
          "Capital": "capital",
          "Duração (meses)": "duration",
          "Resultado": "result",
        },
        json_data: [],
        json_meta: [
          [
            {
              key: "charset",
              value: "utf-8",
            },
          ],
        ],
      },
    };
  },
  created() {
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
            email:email,
          });
        });
        this.credits = creditsArray;
        this.data.json_data=creditsArray;
        this.loader = false;
      });
  },
};
</script>
