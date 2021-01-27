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
            <tr >
              <td class="budget">oi</td>
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">
                    {{$route.params.id}}
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
export default {
  components: {
    
  },
  data() {
    return {
      
    };
  },
  
  methods: {
    
    addTransaction(description,fundAfter,referencem,value){
      firebase.firestore().collection("transactions").add({
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
