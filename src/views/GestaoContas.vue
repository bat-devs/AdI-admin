<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <div class="col-md-6">
        <div class="col-md-6 mt-4">
          <base-input alternative v-model="search" placeholder="Procuar pelo nome..."></base-input>
      </div>
    </div>

    <div class="table-responsive">
      <div>
        <table class="table align-items-center table-light">
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
                    type="button"
                    @click="accountData(account.accountNumber)"
                    class="btn btn-danger"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <modal :show.sync="modal">
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
  </div>
</template>
<script>
import firebase from "firebase";
const db = firebase.firestore();
export default {
  data() {
    return {
      accounts: [],
      modal: false,
      userAccountData: {},
      search: "",
    };
  },
  created() {
    db.collection("users").onSnapshot((querySnapshot) => {
      var accountsArray = [];
      querySnapshot.forEach(async (doc) => {
        if (doc.data().account) {
          let f = doc.data().account;
          accountsArray.push({ ...f, email: doc.data().email });
        }
      });
      this.accounts = accountsArray;
    });
  },
  methods: {
    accountData(id) {
      this.userAccountData = this.accounts.find(
        (account) => account.accountNumber == id
      );
      this.modal = true;
    },
  },
  computed: {
    accountsfilter() {
      return this.accounts.filter((accounts) => {
        return accounts.name.toLowerCase().includes(this.search.toLowerCase()) ;
      });
    },
  },
};
</script>
<style>
</style>
