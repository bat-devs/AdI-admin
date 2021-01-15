import { Doughnut } from "vue-chartjs";
import firebase from "firebase";
const db=firebase.firestore();
let apliNegocio=0; 
let apliSalario=0; 
let apliFamilia=0;
let apliEstudante=0;
let apliKandengue=0;
let apliSomarPlus=0;
let cofreTesouro=0;


export default {
  extends: Doughnut,
  props: ["data", "options"],
  async beforeCreate() {
    
    
       db
        .collection("simulation")
        .where("productName", "==", "Aplicação Negócio")
        .onSnapshot( function(querySnapshot) {
          
          apliNegocio=  querySnapshot.size;
          console.log("fize "+apliNegocio);
        
        });
    
     apliSalario = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação salário")
        .get()
    ).size;
     apliFamilia = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação família")
        .get()
    ).size;
     apliEstudante = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação Estudante")
        .get()
    ).size;
    apliKandengue = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação kandengue")
        .get()
    ).size;
     apliSomarPlus = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação Somar +")
        .get()
    ).size;
     cofreTesouro = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Cofre de Ouro")
        .get()
    ).size;
    
    let chartData = {
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
          ],
        },
      ],
    };
  
    this.renderChart(chartData, {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px",
    });
  },
 
};
