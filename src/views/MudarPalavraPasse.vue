<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
    </base-header>

        <base-button
          type="primary"
          @click="changePassword('HardCode')"
          >Mudar Palavra-Passe
        </base-button>
  </div>
</template>
  
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import firebase from 'firebase';

Vue.use(VueClipboard);
export default {
  data() {
    return {
      role: 3,
      email: '',
    }
  },
  methods: {
    setRole(role) {
      this.role = role;
    },
    changePassword(newPassword) {
      firebase.auth().currentUser.updatePassword(newPassword)
        .then(() => {
          this.$store.commit('changePassword', newPassword);
          // SUCESS
        })
        .catch(error => {
          // ERROR
          console.log("Error :::: ", error);
        })
    }
  }
};
</script>
<style>
</style>


