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
              <td class="budget">Milton Bernardo</td>
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">{{
                      aplication.productName
                    }}</span>
                  </div>
                </div>
              </th>
              <td class="budget">{{ aplication.capital }}</td>
              <td class="budget">{{ aplication.duration }} meses</td>
              <td class="budget">{{ aplication.result }} kz</td>
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
  data() {
    return {
      aplications: [],
    };
  },
  created() {
      db.collection("simulation").where("type","==","Aplicação").onSnapshot(querySnapshot=>{
        var aplicationsArray=[]
        querySnapshot.forEach(doc=>{
          let f=doc.data();
          aplicationsArray.push(f);
        })
        this.aplications=aplicationsArray;
      });
      
  },
};
</script>
