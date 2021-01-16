import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  props: ["data"],
  mounted() {
    console.log("fixe");
    this.renderChart(this.data, {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px",
    });
  },
  watch: {
    data: function() {
      this.renderChart(this.data, {
        borderWidth: "10px",
        hoverBackgroundColor: "red",
        hoverBorderWidth: "10px",
      });
    }
  }
};
