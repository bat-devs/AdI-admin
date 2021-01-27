<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <div class="table-responsive">
      <div>
        <table class="table align-items-center table-light">
          <thead class="thead-light">
            <tr>
              <th scope="col" class="sort" data-sort="name">Descrição</th>
              <th scope="col" class="sort" data-sort="name">valor da Transação</th>
              <th scope="col" class="sort" data-sort="budget">saldo</th>
              <th scope="col" class="sort" data-sort="budget">Data</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="(transaction,index) in transactions" :key="index">
              
              <td class="budget">{{transaction.description}}</td>

              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">
                   {{transaction.value}}
                    </span>
                  </div>
                </div>
              </th>
              
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">
                    {{transaction.fundAfter}}
                    </span>
                  </div>
                </div>
              </th>

              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">
                    {{transaction.data}}
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
const db = firebase.firestore();
export default {
  components: {
    
  },
  data() {
    return {
      transactions: [],
    };
  },
  created(){
console.log(this.$route.params.id);
      db.collection("transactions").where("reference", "==",parseInt(this.$route.params.id))
      .get().then(querySnapshot=>{
      var transactionsArray = [];
      querySnapshot.forEach(function (doc) {
          let f = doc.data();
          let date=new Date(doc.data().createdAt);
          let month=date.getMonth()+1;
          transactionsArray.push({
            ...f,
            data: date.getDate()+"/"+month+"/"+date.getFullYear()
          });
        });
        this.transactions = transactionsArray;
    });
/*
    db.collection("transactions")
      .where("reference", "==",this.$route.params.id)
      .onSnapshot((querySnapshot) => {
        var transactionArray = [];
        querySnapshot.forEach(async (doc) => {
          let f = doc.data();
          transactionArray.push(f);
        });
     
       this.transactions=transactionArray;
       console.log(this.transactions);
      });*/
  },
  methods: {
    
    addTransaction(description,fundAfter,reference,value){
      db.collection("transactions").add({
        createAt: firebase.firestore.Timestamp.now(),
        description: description,
        fundAfter: fundAfter,
        reference: reference,
        value: value
      });
    }
  },
};
</script>
