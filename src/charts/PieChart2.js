import { Doughnut } from "vue-chartjs";
import firebase from "firebase";
export default {
  extends: Doughnut,
  props: ["data", "options"],
  async beforeCreate() {
    
    let credFacil = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Fácil")
        .get()
    ).size;
    let credHabitcao = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Habitação")
        .get()
    ).size;
    let credAutomovel = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Automóvel")
        .get()
    ).size;
    let credPessoal = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Pessoal")
        .get()
    ).size;
    let credFacilidadeTesouraria = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Facilidade de Tesouraria")
        .get()
    ).size;
    let credEmpresarial = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Empresarial")
        .get()
    ).size;
    let adiantaSalario = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Adiantamento de Salário")
        .get()
    ).size;

    let chartData = {
      hoverBackgroundColor: "red",
      hoverBorderWidth: 10,
      labels: [
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
      hoverBorderWidth: "10px",
    });
  },
};
