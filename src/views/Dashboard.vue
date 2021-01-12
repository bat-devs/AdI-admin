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
export default {
  components: { PieChart },
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Academia1", "Academia2", "Academia3"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [5, 10, 5],
          },
        ],
      },
    };
  },
};
</script>
<style>
</style>
