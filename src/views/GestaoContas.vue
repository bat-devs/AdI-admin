<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <div class="col-md d-flex justify-content-around">
      <div class="col-md-6 mt-4">
        <base-input
          alternative
          v-model="search"
          placeholder="Procurar pela referência..."
        ></base-input>
      </div>
      <div v-if="data.json_data.length != 0">
        <download-excel
          :data="data.json_data"
          :fields="data.json_fields"
          class="mt-3 ml-5 mb-3"
          name="Relatório de transações.xls"
          style="width: 230px"
        >
          <button class="btn btn-primary">
            <i class="fas fa-file-excel"></i> Baixar relatório (Excel)
          </button>
        </download-excel>
      </div>
      <div v-else>
        <p>Não tem nenhuma transação</p>
      </div>
    </div>

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
              <th scope="col" class="sort" data-sort="name">Número da conta</th>
              <th scope="col" class="sort" data-sort="name">Nome do cliente</th>
              <th scope="col" class="sort" data-sort="budget">Acções</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="(account, index) in accountsfilter" :key="index">
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">{{
                      account.accountNumber
                    }}</span>
                  </div>
                </div>
              </th>
              <td class="budget">{{ account.name }}</td>
              <td class="budget">
                <div class="row">
                  <button
                    v-if="
                      $store.getters.getRoleAdmin ||
                      $store.getters.getRoleEditor ||
                      $store.getters.getRoleViewer
                    "
                    type="button"
                    @click="accountData(account.accountNumber)"
                    class="btn btn-primary"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button
                    v-if="$store.getters.getRoleAdmin"
                    type="button"
                    @click="accountDataEdit(account.accountNumber)"
                    class="btn btn-info"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <router-link
                    class="btn btn-warning"
                    :to="{
                      name: 'Transações',
                      params: { id: account.accountNumber },
                    }"
                  >
                    <i class="fas fa-exchange-alt"></i>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <modal
      :show.sync="modal"
      v-if="
        $store.getters.getRoleAdmin ||
        $store.getters.getRoleEditor ||
        $store.getters.getRoleViewer
      "
    >
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Conta de
        <span style="font-weight: bold">{{ userAccountData.name }}</span>
      </h5>
      <p>
        <span style="font-weight: bold">Número da conta:</span>
        {{ userAccountData.accountNumber }}
      </p>
      <br />
      <p>
        <span style="font-weight: bold">Nome:</span> {{ userAccountData.name }}
      </p>
      <br />
      <p>
        <span style="font-weight: bold">Número do BI:</span>
        {{ userAccountData.bi }}
      </p>
      <br />
      <p>
        <span style="font-weight: bold">Data de nascimento:</span>
        {{ userAccountData.birthDate }}
      </p>
      <br />
      <p>
        <span style="font-weight: bold">Morada:</span>
        {{ userAccountData.address }}
      </p>
      <br />
      <p>
        <span style="font-weight: bold">Género:</span>
        {{ userAccountData.gender }}
      </p>
      <br />
      <p>
        <span style="font-weight: bold">Nacionalidade:</span>
        {{ userAccountData.nationality }}
      </p>
      <br />
      <p>
        <span style="font-weight: bold">Número de telefone:</span>
        {{ userAccountData.phone }}
      </p>
      <br />
      <p>
        <span style="font-weight: bold">E-mail:</span>
        {{ userAccountData.email }}
      </p>
      <template slot="footer">
        <base-button type="secondary" class="ml-auto" @click="modal = false"
          >Fechar
        </base-button>
      </template>
    </modal>
    <modal
      :show.sync="modal1"
      modal-classes="modal-dialog-centered modal-xl"
      v-if="$store.getters.getRoleAdmin"
    >
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Editar dados de
        <span style="font-weight: bold">{{ userAccountData.name }}</span>
      </h5>

      <div class="pl-lg">
        <div class="row">
          <div class="col-lg">
            <base-input
              name="title"
              label="Nome"
              v-model="updateAccount.name"
            />
          </div>
        </div>
      </div>
      <div class="pl-lg">
        <div class="row">
          <div class="col-lg">
            <base-input
              name="title"
              label="Morada"
              v-model="updateAccount.address"
            />
          </div>
        </div>
      </div>
      <div class="pl-lg">
        <div class="row">
          <div class="col-lg">
            <base-input
              name="title"
              label="Nº do bilhete de identidade"
              v-model="updateAccount.bi"
            />
          </div>
        </div>
      </div>
      <div class="pl-lg">
        <div class="row">
          <div class="col-lg">
            <base-input
              type="date"
              name="title"
              label="Data de nascimento"
              v-model="updateAccount.birthDate"
            />
          </div>
        </div>
      </div>
      <div class="pl-lg">
        <div class="row">
          <div class="col-lg">
            <base-input label="Género">
              <select
                v-if="updateAccount.gender == 'M'"
                class="form-control"
                v-model="updateAccount.gender"
              >
                <option selected :value="updateAccount.gender">M</option>
                <option value="F">F</option>
              </select>
              <select
                v-if="updateAccount.gender == 'F'"
                class="form-control"
                v-model="updateAccount.gender"
              >
                <option selected :value="updateAccount.gender">F</option>
                <option value="M">M</option>
              </select>
            </base-input>
          </div>
        </div>
      </div>
      <div class="pl-lg">
        <div class="row">
          <div class="col-lg">
            <base-input
              name="title"
              label="Nacionalidade"
              v-model="updateAccount.nationality"
            />
          </div>
        </div>
      </div>
      <div class="pl-lg">
        <div class="row">
          <div class="col-lg">
            <base-input
              name="title"
              label="Número de telefone"
              v-model="updateAccount.phone"
            />
          </div>
        </div>
      </div>

      <template slot="footer">
        <base-button type="secondary" @click="modal1 = false"
          >Fechar
        </base-button>
        <base-button type="primary" @click="updateData(userAccountData.id)"
          >Salvar alterações</base-button
        >
      </template>
    </modal>
  </div>
</template>
<script>
import firebase from "firebase";
import BaseInput from "../components/BaseInput.vue";
import swal from "sweetalert2";
import JsonExcel from "vue-json-excel";
import { HalfCircleSpinner } from "epic-spinners";
const db = firebase.firestore();
export default {
  components: {
    BaseInput,
    HalfCircleSpinner,
    downloadExcel: JsonExcel,
  },
  data() {
    return {
      loader: true,
      accounts: [],
      modal: false,
      modal1: false,
      userAccountData: {},
      search: "",
      allTransactions: [],
      updateAccount: {
        accountNumber: "",
        name: "",
        address: "",
        bi: "",
        birthDate: "",
        gender: "",
        nationality: "",
        phone: "",
      },
      data: {
        json_fields: {
          "Nome do cliente": "user.name",
          "E-mail": "user.email",
          "Número de telefone": "user.account.phone",
          "Número da conta": "user.account.accountNumber",
          "Saldo": "value",
          "Valor depois da transação": "fundAfter",
          "Descrição": "description",
          "Data da transação": "createdSim",
          "Feita por": "assignedby",
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
    db.collection("users").onSnapshot((querySnapshot) => {
      var accountsArray = [];
      querySnapshot.forEach(async (doc) => {
        if (doc.data().account) {
          let f = doc.data().account;
          accountsArray.push({ ...f, email: doc.data().email, id: doc.id });
        }
        this.loader = false;
      });
      this.accounts = accountsArray;
    });
    this.getAllTransactions();
  },
  methods: {
    accountData(id) {
      this.userAccountData = this.accounts.find(
        (account) => account.accountNumber == id
      );
      this.modal = true;
    },
    accountDataEdit(id) {
      this.userAccountData = this.accounts.find(
        (account) => account.accountNumber == id
      );
      this.updateAccount.accountNumber = this.userAccountData.accountNumber;
      this.updateAccount.name = this.userAccountData.name;
      this.updateAccount.address = this.userAccountData.address;
      this.updateAccount.bi = this.userAccountData.bi;
      this.updateAccount.birthDate = this.userAccountData.birthDate;
      this.updateAccount.gender = this.userAccountData.gender;
      this.updateAccount.nationality = this.userAccountData.nationality;
      this.updateAccount.phone = this.userAccountData.phone;
      this.modal1 = true;
    },
    updateData(id) {
      db.collection("users")
        .doc(id)
        .update({
          account: {
            accountNumber: this.updateAccount.accountNumber,
            name: this.updateAccount.name,
            address: this.updateAccount.address,
            bi: this.updateAccount.bi,
            birthDate: this.updateAccount.birthDate,
            gender: this.updateAccount.gender,
            nationality: this.updateAccount.nationality,
            phone: this.updateAccount.phone,
          },
          assignedby: this.$store.getters.getCurrentUserEmail,
        })
        .then(function () {
          swal.fire({
            position: "top-end",
            icon: "success",
            title: "Os dados foram atualizados!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    getAllTransactions() {
      var dataUser;
      db.collection("transactions").onSnapshot((querySnapshot) => {
        var transactions = [];
        querySnapshot.forEach(async (doc) => {
          let f = doc.data();

          await db
            .collection("users")
            .where("account.accountNumber", "==", f.reference)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach(async (doc1) => {
                dataUser = doc1.data();
              });
            });
          transactions.push({
            ...f,
            createdSim: new Date(f.createdAt).toLocaleString(),
            user: dataUser,
          });
        });

        this.allTransactions = transactions;
        this.data.json_data = transactions;
      });
    },
  },
  computed: {
    accountsfilter() {
      return this.accounts.filter((accounts) => {
        return accounts.accountNumber
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
};
</script>
<style>
</style>
