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
              <span class="mb-0 text-sm font-weight-bold">{{
                currentUserEmail
              }}</span>
            </div>
          </div>

          <template>
            <!--<router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Perfil</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Settings</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Activity</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Support</span>
                        </router-link>
                        <div class="dropdown-divider"></div>-->
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
      currentUserEmail: "",
    };
  },
  beforeMount() {
    if (firebase.auth().currentUser) {
      this.$store.commit(
        "setcurrentUserEmail",
        firebase.auth().currentUser.email
      );
      this.currentUserEmail = this.$store.getters.getcurrentUserEmail;
    }
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
            this.$router.push("/login");
          });
        });
    },
  },
};
</script>
