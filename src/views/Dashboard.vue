<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <keep-alive>
      <pie-chart :height="100"></pie-chart>
      <pie-chartt :height="100"></pie-chartt>
    </keep-alive>

  </div>
</template>
<script>
import PieChart from "../charts/PieChart";
import PieChartt from "../charts/PieChart2";
export default {
  components: { PieChart, PieChartt },
  data() {
    return {
      load: true,
      modals:{
        modal:false
      }
    };
  },
};
</script>
<style>
</style>
