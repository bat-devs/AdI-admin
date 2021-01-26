<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>

    <card type="frame">
      <div class="d-flex justify-content-center">
        <half-circle-spinner
          v-if="loader"
          :animation-duration="1000"
          :size="60"
          color="#113855"
        />
      </div>
      <keep-alive>
        <pie-chart :height="100" :data="dataChart" v-if="!loader"></pie-chart>
      </keep-alive>
    </card>
    <button v-on:click="actualizar" class="btn btn-primary ml-3">
      Actualizar gráfico
    </button>
  </div>
</template>
<script>
import PieChart from "../charts/PieChart";
import firebase from "firebase";
import { HalfCircleSpinner } from "epic-spinners";
const db = firebase.firestore();

   

export default {
  components: { PieChart, HalfCircleSpinner },
  data() {
    return {
      loader: true,
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
      credFacil: 0,
      credHabitcao: 0,
      credAutomovel: 0,
      credPessoal: 0,
      credFacilidadeTesouraria: 0,
      credEmpresarial: 0,
      adiantaSalario: 0,

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
            backgroundColor: [
              "#1abc9c",
              "#2ecc71",
              "#3498db",
              "#9b59b6",
              "#27ae60",
              "#34495e",
              "#f1c40f",
              "#e67e22",
              "#e74c3c",
              "#d35400",
              "#c0392b",
              "#7f8c8d",
              "#f39c12",
            ],
            data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,],
          },
        ],
      },
    };
  },

  methods: {
    async actualizar() {
      this.loader = true;
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
      this.credFacil = await (
        await firebase
          .firestore()
          .collection("simulation")
          .where("productName", "==", "Crédito Fácil")
          .get()
      ).size;
      this.credHabitcao = await (
        await firebase
          .firestore()
          .collection("simulation")
          .where("productName", "==", "Crédito Habitação")
          .get()
      ).size;
      this.credAutomovel = await (
        await firebase
          .firestore()
          .collection("simulation")
          .where("productName", "==", "Crédito Automóvel")
          .get()
      ).size;
      this.credPessoal = await (
        await firebase
          .firestore()
          .collection("simulation")
          .where("productName", "==", "Crédito Pessoal")
          .get()
      ).size;
      this.credFacilidadeTesouraria = await (
        await firebase
          .firestore()
          .collection("simulation")
          .where("productName", "==", "Crédito Facilidade de Tesouraria")
          .get()
      ).size;
      this.credEmpresarial = await (
        await firebase
          .firestore()
          .collection("simulation")
          .where("productName", "==", "Crédito Empresarial")
          .get()
      ).size;
      this.adiantaSalario = await (
        await firebase
          .firestore()
          .collection("simulation")
          .where("productName", "==", "Adiantamento de Salário")
          .get()
      ).size;
      this.loader = false;
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
            backgroundColor: [
              "#1abc9c",
              "#2ecc71",
              "#3498db",
              "#9b59b6",
              "#3498db",
              "#34495e",
              "#f1c40f",
              "#e67e22",
              "#e74c3c",
              "#d35400",
              "#c0392b",
              "#7f8c8d",
              "#f39c12",
            ],
            data: [
              this.apliNegocio,
              this.apliSalario,
              this.apliFamilia,
              this.apliEstudante,
              this.apliKandengue,
              this.apliSomarPlus,
              this.cofreTesouro,
              this.credFacil,
              this.credHabitcao,
              this.credAutomovel,
              this.credPessoal,
              this.credFacilidadeTesouraria,
              this.credEmpresarial,
              this.adiantaSalario,
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
    this.credFacil = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Fácil")
        .get()
    ).size;
    this.credHabitcao = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Habitação")
        .get()
    ).size;
    this.credAutomovel = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Automóvel")
        .get()
    ).size;
    this.credPessoal = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Pessoal")
        .get()
    ).size;
    this.credFacilidadeTesouraria = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Facilidade de Tesouraria")
        .get()
    ).size;
    this.credEmpresarial = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Crédito Empresarial")
        .get()
    ).size;
    this.adiantaSalario = await (
      await firebase
        .firestore()
        .collection("simulation")
        .where("productName", "==", "Adiantamento de Salário")
        .get()
    ).size;
    this.loader = false;
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
          backgroundColor: [
            "#1abc9c",
            "#2ecc71",
            "#3498db",
            "#9b59b6",
            "#3498db",
            "#34495e",
            "#f1c40f",
            "#e67e22",
            "#e74c3c",
            "#d35400",
            "#c0392b",
            "#7f8c8d",
            "#f39c12",
          ],
          data: [
            this.apliNegocio,
            this.apliSalario,
            this.apliFamilia,
            this.apliEstudante,
            this.apliKandengue,
            this.apliSomarPlus,
            this.cofreTesouro,
            this.credFacil,
            this.credHabitcao,
            this.credAutomovel,
            this.credPessoal,
            this.credFacilidadeTesouraria,
            this.credEmpresarial,
            this.adiantaSalario,
          ],
        },
      ],
    };
  },
};
</script>
<style>
</style>
