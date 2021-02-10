<template >
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="BatDev"
      title="BatDev"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Home',
            icon: 'ni ni-tv-2 text-success',
            path: '/home',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Notícias',
            icon: 'ni ni-single-copy-04 text-orange',
            path: '/noticias',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Relatório das simulações',
            icon: 'fas fa-wallet text-yellow',
            path: '/aplications-credits',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Aplicações',
            icon: 'fas fa-wallet text-blue',
            path: '/aplicacoes',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Créditos',
            icon: 'fas fa-hand-holding-usd text-blue',
            path: '/creditos',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Gestão de Contas',
            icon: 'ni ni-single-02 text-purple',
            path: '/gestao-de-contas',
          }"
        />

        <sidebar-item
          v-if="this.$store.getters.getRoleAdmin"
          :link="{
            name: 'Trabalhadores da academia',
            icon: 'fas fa-briefcase text-purple',
            path: '/trabalhadores-academia',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <keep-alive>
            <router-view :key="$router.home"></router-view>
          </keep-alive>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";
export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  created() {
    // 
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss">
</style>
