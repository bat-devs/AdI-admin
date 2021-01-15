import { Doughnut } from "vue-chartjs";
import firebase from "firebase";
export default {
  extends: Doughnut,
  props: ["data", "options"],
  async beforeCreate() {
    
    const apliNegocio = await (
      await
       firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Aplicação Negócio")
        .get()
    ).size;
    let apliSalario = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Aplicação salário")
        .get()
    ).size;
    let apliFamilia = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Aplicação família")
        .get()
    ).size;
    let apliEstudante = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Aplicação Estudante")
        .get()
    ).size;
    let apliKandengue = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Aplicação kandengue")
        .get()
    ).size;
    let apliSomarPlus = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Aplicação Somar +")
        .get()
    ).size;
    let cofreTesouro = await (
      await firebase
        .firestore()
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
