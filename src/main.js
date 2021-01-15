/*!

=========================================================
* Vue Argon Dashboard - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import firebase from 'firebase';
import store from './store/index'



var firebaseConfig = {
  apiKey: "AIzaSyCN1ArbazW6utDg8rjk3l6TKCW_m8TYAMQ",
  authDomain: "academiadeinvestimento-ba1c3.firebaseapp.com",
  projectId: "academiadeinvestimento-ba1c3",
  storageBucket: "academiadeinvestimento-ba1c3.appspot.com",
  messagingSenderId: "1010952872733",
  appId: "1:1010952872733:web:2dc7a20a20f143ac9c77f4",
  measurementId: "G-Z2KGNZ07LQ"
};
// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);

Vue.config.productionTip = false

let app = '';

firebase.auth().onAuthStateChanged(function() {
  if(!app)
  {
    Vue.use(ArgonDashboard)
    new Vue({
      router,
      store:store,
      render: h => h(App)
    }).$mount('#app')
  }
});

export default firebase


