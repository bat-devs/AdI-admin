<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <ul class="navbar-nav align-items-center d-none d-md-flex ml-lg-auto">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div
            class="media align-items-center"
            slot="title"
            style="cursor: pointer"
          >
            <i class="fas fa-user"></i>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">
                {{ this.$store.state.currentUserEmail }}</span>
            </div>
          </div>

          <template>
            <li @click="logOut()" class="dropdown-item" style="cursor: pointer">
              <i class="ni ni-button-power"></i>
              <span>Sair</span>
            </li>
          </template>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      currentUserEmail: this.$store.getters.getCurrentUserEmail,
    };
  },
  
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            sessionStorage.clear();
            this.$router.push("/login");
          });
        });
    },
  },
};
</script>
