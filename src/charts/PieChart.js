import { Doughnut } from "vue-chartjs";
import firebase from "firebase";
export default {
  extends: Doughnut,
  props: ["data", "options"],
  async mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object

  
    const apliNegocio= await (await firebase.firestore().collection("simulation").where("productName", "==", "Aplicação Negócio").get()).size;
    let apliSalario= await (await firebase.firestore().collection("simulation").where("productName", "==", "Aplicação salário").get()).size;
    let apliFamilia= await (await firebase.firestore().collection("simulation").where("productName", "==", "Aplicação família").get()).size;
    let apliEstudante= await (await firebase.firestore().collection("simulation").where("productName", "==", "Aplicação Estudante").get()).size;
    let apliKandengue= await (await firebase.firestore().collection("simulation").where("productName", "==", "Aplicação kandengue").get()).size;
    let apliSomarPlus= await (await firebase.firestore().collection("simulation").where("productName", "==", "Aplicação Somar +").get()).size;
    let cofreTesouro= await (await firebase.firestore().collection("simulation").where("productName", "==", "Cofre de Ouro").get()).size;
    let  credFacil= await (await firebase.firestore().collection("simulation").where("productName", "==", "Crédito Fácil").get()).size;
    let credHabitcao= await (await firebase.firestore().collection("simulation").where("productName", "==", "Crédito Habitação").get()).size;
    let credAutomovel= await (await firebase.firestore().collection("simulation").where("productName", "==", "Crédito Automóvel").get()).size;
    let credPessoal= await (await firebase.firestore().collection("simulation").where("productName", "==", "Crédito Pessoal").get()).size;
    let credFacilidadeTesouraria= await (await firebase.firestore().collection("simulation").where("productName", "==", "Crédito Facilidade de Tesouraria").get()).size;
    let credEmpresarial= await (await firebase.firestore().collection("simulation").where("productName", "==", "Crédito Empresarial").get()).size;
    let  adiantaSalario= await (await firebase.firestore().collection("simulation").where("productName", "==", "Adiantamento de Salário").get()).size;

    
      
      let chartData={
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
            data: [
              apliNegocio,
              apliSalario,
              apliFamilia,
              apliEstudante,
              apliKandengue,
              apliSomarPlus,
              cofreTesouro,
              credFacil,
              credHabitcao,
              credAutomovel,
              credPessoal,
              credFacilidadeTesouraria,
              credEmpresarial,
              adiantaSalario,
            ],
          },
        ],
      };
      

    
    this.renderChart(chartData, {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px"
    });
  }
};
