<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
      
    </base-header>
    <div class="container-fluid mt--7">
      <div class="col-xl order-xl-1">
        <card shadow type="secondary">
          <div slot="header" class="bg-white border-0">
            <div class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">Adicionar notícia</h3>
              </div>
            </div>
          </div>
          <template>
            <form @submit.prevent>
              <h6 class="heading-small text-muted mb-4">Título</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg">
                    <base-input
                      v-model="noticia.title"
                      name="title"
                      label="Escreva aqui o título da notícia"
                      placeholder="Título.."
                      input-classes="form-control-alternative"
                    />
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">
                Imagem Principal da notícia
              </h6>

              <input type="file" @change="teste" />
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">
                Outras fotos sobre a notícia
              </h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <input type="file" name="outrasFotos[]" multiple />
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Description -->
              <h6 class="heading-small text-muted mb-4">Conteúdo da notícia</h6>
              <div class="pl-lg-4">
                <div class="form-group">
                  <textarea
                    v-model="noticia.content"
                    rows="4"
                    class="form-control form-control-alternative"
                    placeholder="Escreve aqui o conteúdo da sua notícia"
                  >
                  </textarea>
                </div>
              </div>
              <button
                @click="saveData"
                class="btn btn-success btn-lg btn-block"
              >
                Publicar notícia
              </button>
             <!--   <facebook-login class="button"
      appId="2172026989597254"
      @login="login"
      @sdk-loaded="sdkLoaded">
    </facebook-login>-->
            </form>
          </template>
        </card>
      </div>
    </div>
    <!-- <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">Icons</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-lg-3 col-md-6"
                                     v-for="(icon, index) in icons" :key="icon.name + index">
                                    <button type="button"
                                            v-b-tooltip.hover.top
                                            :title="icon.name"
                                            v-clipboard:copy="icon.name"
                                            v-clipboard:success="onCopy"
                                            class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                        <div>
                                            <i :class="icon.name"></i>
                                            <span>{{icon.name.substring(6)}}</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
  </div>
</template>
  
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import BTooltipDirective from "bootstrap-vue/esm/directives/tooltip";
import firebase from "firebase";
import swal from "sweetalert2";
//import facebookLogin from 'facebook-login-vuejs';
 


const db = firebase.firestore();
Vue.use(VueClipboard);
export default {
  components: {
  //facebookLogin
},
  directives: {
    "b-tooltip": BTooltipDirective,
  },
  data() {
    return {
   // isConnected: false,
   // name: '',
    //email: '',
   // personalID: '',
   // picture: '',
   // FB: undefined,
   
      noticia: {
        content: "",
        title: "",
        mainImage: null,
        othersfiles: [],
      },
      icons: [
        { name: "ni ni-active-40" },
        { name: "ni ni-air-baloon" },
        { name: "ni ni-album-2" },
        { name: "ni ni-align-center" },
        { name: "ni ni-align-left-2" },
        { name: "ni ni-ambulance" },
        { name: "ni ni-app" },
        { name: "ni ni-archive-2" },
        { name: "ni ni-atom" },
        { name: "ni ni-badge" },
        { name: "ni ni-bag-17" },
        { name: "ni ni-basket" },
        { name: "ni ni-bell-55" },
        { name: "ni ni-bold-down" },
        { name: "ni ni-bold-left" },
        { name: "ni ni-bold-right" },
        { name: "ni ni-bold-up" },
        { name: "ni ni-bold" },
        { name: "ni ni-book-bookmark" },
        { name: "ni ni-books" },
        { name: "ni ni-box-2" },
        { name: "ni ni-briefcase-24" },
        { name: "ni ni-building" },
        { name: "ni ni-bulb-61" },
        { name: "ni ni-bullet-list-67" },
        { name: "ni ni-bus-front-12" },
        { name: "ni ni-button-pause" },
        { name: "ni ni-button-play" },
        { name: "ni ni-button-power" },
        { name: "ni ni-calendar-grid-58" },
        { name: "ni ni-camera-compact" },
        { name: "ni ni-caps-small" },
        { name: "ni ni-cart" },
        { name: "ni ni-chart-bar-32" },
        { name: "ni ni-chart-pie-35" },
        { name: "ni ni-chat-round" },
        { name: "ni ni-check-bold" },
        { name: "ni ni-circle-08" },
        { name: "ni ni-cloud-download-95" },
        { name: "ni ni-cloud-upload-96" },
        { name: "ni ni-compass-04" },
        { name: "ni ni-controller" },
        { name: "ni ni-credit-card" },
        { name: "ni ni-curved-next" },
        { name: "ni ni-delivery-fast" },
        { name: "ni ni-diamond" },
        { name: "ni ni-email-83" },
        { name: "ni ni-fat-add" },
        { name: "ni ni-fat-delete" },
        { name: "ni ni-fat-remove" },
        { name: "ni ni-favourite-28" },
        { name: "ni ni-folder-17" },
        { name: "ni ni-glasses-2" },
        { name: "ni ni-hat-3" },
        { name: "ni ni-headphones" },
        { name: "ni ni-html5" },
        { name: "ni ni-istanbul" },
        { name: "ni ni-circle-08" },
        { name: "ni ni-key-25" },
        { name: "ni ni-laptop" },
        { name: "ni ni-like-2" },
        { name: "ni ni-lock-circle-open" },
        { name: "ni ni-map-big" },
        { name: "ni ni-mobile-button" },
        { name: "ni ni-money-coins" },
        { name: "ni ni-note-03" },
        { name: "ni ni-notification-70" },
        { name: "ni ni-palette" },
        { name: "ni ni-paper-diploma" },
        { name: "ni ni-pin-3" },
        { name: "ni ni-planet" },
        { name: "ni ni-ruler-pencil" },
        { name: "ni ni-satisfied" },
        { name: "ni ni-scissors" },
        { name: "ni ni-send" },
        { name: "ni ni-settings-gear-65" },
        { name: "ni ni-settings" },
        { name: "ni ni-single-02" },
        { name: "ni ni-single-copy-04" },
        { name: "ni ni-sound-wave" },
        { name: "ni ni-spaceship" },
        { name: "ni ni-square-pin" },
        { name: "ni ni-support-16" },
        { name: "ni ni-tablet-button" },
        { name: "ni ni-tag" },
        { name: "ni ni-tie-bow" },
        { name: "ni ni-time-alarm" },
        { name: "ni ni-trophy" },
        { name: "ni ni-tv-2" },
        { name: "ni ni-umbrella-13" },
        { name: "ni ni-user-run" },
        { name: "ni ni-vector" },
        { name: "ni ni-watch-time" },
        { name: "ni ni-world" },
        { name: "ni ni-zoom-split-in" },
        { name: "ni ni-collection" },
        { name: "ni ni-image" },
        { name: "ni ni-shop" },
        { name: "ni ni-ungroup" },
        { name: "ni ni-world-2" },
        { name: "ni ni-ui-04" },
      ],
    };
  },
 
  methods: {
 /*
 não mexer
  postar() {
  

             this.FB.api(
  '/108709280980225/photos',
  'POST',
  {
    "name": "ola mundo",
  
    "url": "https://appharbor.com/assets/images/stackoverflow-logo.png",
  "access_token": "EAAe3cnEoUkYBANC6comcXBwQ6QAZBkfvgFftr4fg6W4MNjVvZAabTx3irZBgWVgd3IbNqaGrOaY36d0uPFMwEwYY1YrvPj0skC5TPbQg3j7j1hCt7qRPcvkTBBcZAqZAZBIUNEckQayY01ZBO9ESJrZBras1UTG5gZBBjmkLZCPoLdUe74NZC6mNLK8RfgxAUxCZBplkGS4xmKgpNwZDZD"},
  function(response) {
      // Insert your code here
      console.log(response);
  }
);



{
"message": "xxx",
"published": true,
"attached_media[0]": "{"media_fbid":"photo_id1" }"
"attached_media[1]": "{"media_fbid":"photo_id2" }"
}



 //publicar foto com legenda
       this.FB.api(
  '/108709280980225/photos',
  'POST',
  {
    "name": "ola mundo",
    "url": "https://appharbor.com/assets/images/stackoverflow-logo.png",
  "access_token": "EAAe3cnEoUkYBACbmtIeVuUt4kWsbC2ZBHvxpgSJf9wZApXUmEQZCQyiBlppEP7GhngN9RjMmTfPwvatWHlXEFSohRKmoc4nA8obuHrWpZAQMMuQ9jJwi6ZCJUXBDrIaqHt3Jl5MhSssYmpR6TecChlS5RoFbjxHqP9DsHKAPqr2eyHVXZAq6hyVHtR71QbIpsZD"},
  function(response) {
      // Insert your code here
      console.log(response);
  }
);

//publicar texto
       this.FB.api(
  '/108709280980225/feed',
  'POST',
  {
    "name": "ola mundo",
    "url": "https://appharbor.com/assets/images/stackoverflow-logo.png",
  "access_token": "EAAe3cnEoUkYBACbmtIeVuUt4kWsbC2ZBHvxpgSJf9wZApXUmEQZCQyiBlppEP7GhngN9RjMmTfPwvatWHlXEFSohRKmoc4nA8obuHrWpZAQMMuQ9jJwi6ZCJUXBDrIaqHt3Jl5MhSssYmpR6TecChlS5RoFbjxHqP9DsHKAPqr2eyHVXZAq6hyVHtR71QbIpsZD"},
  function(response) {
      // Insert your code here
      console.log(response);
  }
);

    
  },
  sdkLoaded(payload) {
    this.isConnected = payload.isConnected
    this.FB = payload.FB
    if (this.isConnected) this.postar()
  },
  login() {
    this.isConnected = true
    this.postar()
  },
 */

    onCopy() {
      this.$notify({
        type: "success",
        title: "Copied to clipboard",
      });
    },
    saveData() {
      db.collection("news")
        .add({
          publishedAt: firebase.firestore.Timestamp.now(),
          ...this.noticia,
        })
        .then(function () {
          swal.fire({
            position: "top-end",
            icon: "success",
            title: "A sua notícia foi publicada",
            showConfirmButton: false,
            timer: 1200,
          });
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    deleNew() {
      //apagar
      firebase
        .firestore()
        .collection("news")
        .doc("id")
        .delete()
        .then(function () {
          console.log("apagdao");
        })
        .catch(function (error) {
          console.error("Erro ", error);
        });
    },
    // Função para adicionar noticia
    addNews(){
      
     /*

    firebase.firestore().collection("publicacao").add({
        content:  'fixe',
        keywords: 'fixe',
        mainImage: 'fixe',
        title: 'fixe',
        published: false,

    }).then(async (id)=>{
        this.id= await id.id;
        var k=[];
        var i=0;

        while(i<10){
            await firebase.storage().ref().child('images/'+this.id+"/"+i+imagem.name ).put(imagem).then( async ()=>{

                await firebase.storage().ref().child('images/'+this.id+"/"+i+imagem.name).getDownloadURL().then( 
                    async function(downloadURL) {
                        await k.push(downloadURL); 
                });
            });
        i++;
        }
        console.log(k);
        firebase.firestore().collection("publicacao").doc(this.id).update({
            images: k,

        }).then(()=>{
            alert("Esse é o foi");
        });

    });

    */
    }
    
  },
};
</script>
<style>
</style>
