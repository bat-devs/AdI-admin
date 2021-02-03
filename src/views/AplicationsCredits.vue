<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
    </base-header>
    <div class="mt-3 ml-3 mb-3" v-if="!loader">
      <button class="btn btn-primary" @click="insertCodeModal = true">
        Fazer download do relatório
      </button>
    </div>
    <modal :show.sync="insertCodeModal">
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Insira o código para efectuar o download do relatório
        <span style="font-weight: bold"></span>
      </h5>

      <base-input
        name="code"
        label="Insira a referência de download"
        placeholder="Código"
        input-classes="form-control-alternative"
        v-model="EnterCode"
      />
      <template slot="footer">
        <base-button
          type="secondary"
          class="ml-auto"
          @click="insertCodeModal = false"
          >Fechar
        </base-button>
        <base-button type="primary" @click="modalChange()">Entrar</base-button>
      </template>
    </modal>
    <modal :show.sync="downloadExcelModal">
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Download do relatório
        <span style="font-weight: bold"></span>
      </h5>
      <download-excel
        :data="data.json_data"
        :fields="data.json_fields"
        class="mt-3 ml-3 mb-3"
        name="Relatório.xls"
        style="width: 230px"
      >
        <button class="btn btn-primary">
          <i class="fas fa-file-excel"></i> Baixar ficheiro excel
        </button>
      </download-excel>
      <template slot="footer">
        <base-button
          type="secondary"
          class="ml-auto"
          @click="downloadExcelModal = false"
          >Fechar
        </base-button>
      </template>
    </modal>

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
              <th scope="col" class="sort" data-sort="budget">Tipo</th>
              <th scope="col" class="sort" data-sort="name">Aplicação</th>
              <th scope="col" class="sort" data-sort="budget">Capital</th>
              <th scope="col" class="sort" data-sort="budget">Duração</th>
              <th scope="col" class="sort" data-sort="budget">Resultado</th>
              <th scope="col" class="sort" data-sort="budget">Data</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="(aplication, index) in aplications" :key="index">
              <td class="budget">{{ aplication.name }}</td>

              <td class="budget">{{ aplication.type }}</td>
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
              <td class="budget">
                {{  new Date(aplication.createdAt).toLocaleString()}}
              </td>
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
import swal from "sweetalert2";
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
          "Telefone": "phone",
          "Data de registo": "createdAt",
          "Abertura de conta": "accountCreationUser",
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
      EnterCode: "",
      downloadExcelModal: false,
      insertCodeModal: false,
    };
  },
  created() {

 

    db.collection("simulation")
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        var aplicationsArray = [];
        querySnapshot.forEach(async (doc) => {
        let f = doc.data();
         let name ,  email;//accountCreationUser;//phone, createdAtUser, 
          await db
            .collection("users")
            .doc(f.uid)
            .get()
            .then((document) => {
              const userData =  document.data();
              
              name = userData.name;
              email = userData.email;
              //phone = userData.account.phone || "";
              //accountCreationUser  = new Date(userData.account.createdAt).toLocaleString() || "";
            });

          aplicationsArray.push({
            ...f,
            name,
            email,
            //phone,
            //accountCreationUser,
          });
            

         
        });
        this.aplications = aplicationsArray;
        this.data.json_data = aplicationsArray;
        this.loader = false;
      });
  },
  methods: {
    modalChange() {
      if (this.EnterCode === "123456") {
        this.EnterCode = "";
        this.insertCodeModal = false;
        this.downloadExcelModal = true;
      } else {
        this.EnterCode = "";
        swal.fire({
          position: "top-end",
          icon: "error",
          title: "A referência inserida está errada!",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    },
  },
};
</script>
