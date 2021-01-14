<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>

    <pie-chart
      :data="chartData"
      :height="100"
      :options="chartOptions"
    ></pie-chart>
  </div>
</template>
<script>
import PieChart from "../charts/PieChart";
import firebase from "firebase";
let teste3;
export default {
  components: { PieChart },
  data() {
    return {
      teste:null,
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [
          "Aplicação Negócio",
          "Aplicação salário",
          "Aplicação família",
          "Aplicação Estudante",
          "Aplicação kandengue",
          "Aplicação Somar +",
          "Cofre de Ouro",
          "Crédito Fácil",
          "Crédito Habitação",
          "Crédito Automóvel",
          "Crédito Pessoal",
          "Crédito Facilidade de Tesouraria",
          "Crédito Empresarial",
          "Adiantamento de Salário",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [teste3, 10, 5],
          },
        ],
      },
      
    };
  },
   beforeCreate() {
    let teste2;
    
    firebase
      .firestore()
      .collection("simulation")
      .where("productName", "==", "Aplicação Negócio")
      .get()
      .then( function (querySnapshot) {
        teste2= querySnapshot.size;
        
        teste3=teste2;
        //this.$store.commit("setapliNegocio", querySnapshot.size); 
        //alert(this.$store.state.apliNegocio);
      })
      .catch(function (error) {
        console.log("Erro: ", error);
      });
      setTimeout(() => {
        alert('oi')
      }, 2000);
  },
  methods: {
    sleep1(i){
      setTimeout(() => {
        alert('oi')
      }, i);
    }
  },
};
</script>
<style>
</style>
