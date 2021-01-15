<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>

    <pie-chart
      
      :height="100"
      
    ></pie-chart>
   
  </div>
</template>
<script>
import PieChart from "../charts/PieChart";

export default {
  components: { PieChart },
  data() {
    return {
      
    };
  },
};
</script>
<style>
</style>
