<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <div class="d-flex justify-content-center mt-3">
      <half-circle-spinner
        v-if="loader"
        :animation-duration="1000"
        :size="60"
        color="#113855"
      />
    </div>
    <modal :show.sync="addTransaction">
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Adicionar transação
        <span style="font-weight: bold"></span>
      </h5>
      <base-input
        v-model="description"
        label="Descrição"
        placeholder="Descriçaõ"
        input-classes="form-control"
      />
      <base-input
        v-model="value"
        label="Valor"
        placeholder="Valor"
        input-classes="form-control"
      />
      <template slot="footer">
        <base-button
          type="secondary"
          class="ml-auto"
          @click="addTransaction = false"
          >Fechar
        </base-button>
        <base-button type="primary" class="ml-auto" @click="addTrans()"
          >Adicionar transação
        </base-button>
      </template>
    </modal>
    <button
      @click="addTransaction = true"
      class="btn btn-primary ml-3 mt-3 mb-3"
    >
      Adicionar transação
    </button>
    <div class="table-responsive">
      <div>
        <table class="table align-items-center table-light">
          <thead class="thead-light">
            <tr>
              <th scope="col" class="sort" data-sort="name">Descrição</th>
              <th scope="col" class="sort" data-sort="name">
                valor da Transação
              </th>
              <th scope="col" class="sort" data-sort="budget">saldo</th>
              <th scope="col" class="sort" data-sort="budget">Data</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="(transaction, index) in transactions" :key="index">
              <td class="budget">{{ transaction.description }}</td>

              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">
                      {{ transaction.value }}
                    </span>
                  </div>
                </div>
              </th>

              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">
                      {{ transaction.fundAfter }}
                    </span>
                  </div>
                </div>
              </th>

              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">
                      {{ transaction.data }}
                    </span>
                  </div>
                </div>
              </th>
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
export default {
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      transactions: [],
      loader: true,
      addTransaction: false,
      description: "",
      value: "",
      id: this.$route.params.id,
    };
  },
  created() {
    this.getData();
  },

  watch: {
    $route() {
      this.id =
        this.$route.params.id != undefined ? this.$route.params.id : null;

      if (this.id != undefined) {
        this.getData();
      }
    },
  },
  methods: {
    getData() {
      db.collection("transactions")
        .where("reference", "==", parseInt(this.id))
        .get()
        .then((querySnapshot) => {
          var transactionsArray = [];
          querySnapshot.forEach(function (doc) {
            let f = doc.data();
            let date = new Date(doc.data().createdAt);
            let month = date.getMonth() + 1;
            transactionsArray.push({
              ...f,
              data: date.getDate() + "/" + month + "/" + date.getFullYear(),
            });
          });
          this.transactions = transactionsArray;
          this.loader = false;
        });
    },

    async addTrans() {
      //código do adicionar as tranasções
      var dataUser;
      var money;

      await db
        .collection("users")
        .where("account.accountNumber", "==", parseInt(this.$route.params.id))
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            if (doc.data().account) {
              dataUser = doc;
            }
          });
        });

      money = parseInt(dataUser.data().account.money);

      db.collection("transactions")
        .add({
          createdAt: Date.now(),
          description: this.description,
          fundAfter: parseInt(this.value) + money,
          reference: parseInt(this.$route.params.id),
          value: parseInt(this.value),
          assingnedBy: this.$store.getters.currentUserEmail
        })
        .then(() => {
          swal.fire({
            position: "top-end",
            icon: "success",
            title: "A transação foi adicionada",
            showConfirmButton: false,
            timer: 1500,
          });
          var currentAccount = dataUser.data().account;
          currentAccount.money += parseInt(this.value);

          db.collection("users").doc(dataUser.id).update({
            account: currentAccount,
          });
          this.addTransaction = false;

          let date = new Date(Date.now());
          let month = date.getMonth() + 1;

          this.transactions.push({
            data: date.getDate() + "/" + month + "/" + date.getFullYear(),
            description: this.description,
            fundAfter: parseInt(this.value) + parseInt(money),
            reference: parseInt(this.$route.params.id),
            value: parseInt(this.value),
          });
        });
    },
  },
};
</script>
