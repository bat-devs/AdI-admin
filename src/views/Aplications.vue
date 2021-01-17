<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <download-excel
      :data="data.json_data"
      :fields="data.json_fields"
      style="width: 200px"
    >
      <button class="btn btn-primary">Baixar ficheiro excel</button>
    </download-excel>
    <div class="d-flex justify-content-center">
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
              <th scope="col" class="sort" data-sort="name">Nome do cliente</th>
              <th scope="col" class="sort" data-sort="name">Aplicação</th>
              <th scope="col" class="sort" data-sort="budget">Capital</th>
              <th scope="col" class="sort" data-sort="budget">Duração</th>
              <th scope="col" class="sort" data-sort="budget">Resultado</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="(aplication, index) in aplications" :key="index">
              <td class="budget">{{ aplication.name }}</td>
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">{{
                      aplication.productName
                    }}</span>
                  </div>
                </div>
              </th>
              <td class="budget">{{ aplication.capital }} AKZ</td>
              <td class="budget">{{ aplication.duration }} meses</td>
              <td class="budget">{{ aplication.result }} AKZ</td>
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
      aplications: [],
      loader: true,
      data: {
        json_fields: {
          "Nome do cliente": "name",
          "E-mail": "email",
         " Telefone": "phone",
          "Data de registo": "registDate",
          "Abertura de conta": "accountOpening",
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
      .where("type", "==", "Aplicação")
      .onSnapshot((querySnapshot) => {
        var aplicationsArray = [];
        querySnapshot.forEach(async (doc) => {
          let f = doc.data();

          let name = await (
            await db.collection("users").doc(doc.data().uid).get()
          ).data().name;
          let email = await (
            await db.collection("users").doc(doc.data().uid).get()
          ).data().email;
          aplicationsArray.push({
            ...f,
            name: name,
            email: email,
          });
        });
        this.loader = false;
        this.aplications = aplicationsArray;
        this.data.json_data = aplicationsArray;
      });
  },
};
</script>
