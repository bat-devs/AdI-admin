<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    
    <keep-alive>
      <pie-chart :height="100" :data="dataChart"></pie-chart>
      <pie-chartt :height="100"></pie-chartt>
    </keep-alive>
    <button v-on:click="actualizar" class="btn btn-primary ml-3">
      Actualizar gráfico
    </button>
  </div>
</template>
<script>
import PieChart from "../charts/PieChart";
import PieChartt from "../charts/PieChart2";
import firebase from "firebase";

const db = firebase.firestore();

   

export default {
  components: { PieChart, PieChartt, },
  data() {
    return {
      load: true,
      modals: {
        modal: false,
      },
      apliNegocio: 0,
      apliSalario: 0,
      apliFamilia: 0,
      apliEstudante: 0,
      apliKandengue: 0,
      apliSomarPlus: 0,
      cofreTesouro: 0,

      dataChart: {
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
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
    };
  },

  methods: {
    async actualizar() {
      this.apliNegocio = await (
        await db
          .collection("simulation")
          .where("productName", "==", "Aplicação Negócio")
          .get()
      ).size;

      this.apliSalario = await (
        await db
          .collection("simulation")
          .where("productName", "==", "Aplicação salário")
          .get()
      ).size;

      this.apliFamilia = await (
        await db
          .collection("simulation")
          .where("productName", "==", "Aplicação família")
          .get()
      ).size;

      this.apliEstudante = await (
        await db
          .collection("simulation")
          .where("productName", "==", "Aplicação Estudante")
          .get()
      ).size;

      this.apliKandengue = await (
        await db
          .collection("simulation")
          .where("productName", "==", "Aplicação kandengue")
          .get()
      ).size;

      this.apliSomarPlus = await (
        await db
          .collection("simulation")
          .where("productName", "==", "Aplicação Somar +")
          .get()
      ).size;

      this.cofreTesouro = await (
        await db
          .collection("simulation")
          .where("productName", "==", "Cofre de Ouro")
          .get()
      ).size;

      this.dataChart = {
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
              this.apliNegocio,
              this.apliSalario,
              this.apliFamilia,
              this.apliEstudante,
              this.apliKandengue,
              this.apliSomarPlus,
              this.cofreTesouro,
            ],
          },
        ],
      };
    },
  },
  async created() {
    this.apliNegocio = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação Negócio")
        .get()
    ).size;

    this.apliSalario = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação salário")
        .get()
    ).size;
    this.apliFamilia = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação família")
        .get()
    ).size;
    this.apliEstudante = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação Estudante")
        .get()
    ).size;

    this.apliKandengue = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação kandengue")
        .get()
    ).size;

    this.apliSomarPlus = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Aplicação Somar +")
        .get()
    ).size;
    this.cofreTesouro = await (
      await db
        .collection("simulation")
        .where("productName", "==", "Cofre de Ouro")
        .get()
    ).size;

    this.dataChart = {
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
            this.apliNegocio,
            this.apliSalario,
            this.apliFamilia,
            this.apliEstudante,
            this.apliKandengue,
            this.apliSomarPlus,
            this.cofreTesouro,
          ],
        },
      ],
    };
  },
};
</script>
<style>
</style>
