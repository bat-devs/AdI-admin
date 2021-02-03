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
                    <input
                      type="file"
                      @change="teste2"
                      name="outrasFotos[]"
                      multiple
                    />
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
              <button @click="addNews" class="btn btn-success btn-lg btn-block">
                Publicar notícia
               
              </button>
               <facebook-login class="button"
      appId="200688768464937"
      @login="login"
      @sdk-loaded="sdkLoaded"
      @logout="logout"
      loginLabel="Iniciar Sessão"
      logoutLabel="Sair">
    </facebook-login>
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
//import swal from "sweetalert2";
import facebookLogin from 'facebook-login-vuejs';
//const db = firebase.firestore();
Vue.use(VueClipboard);
export default {
  components: {
    facebookLogin
  },
  directives: {
    "b-tooltip": BTooltipDirective,
  },
  data() {
    return {
       isConnected: false,
      // name: '',
      //email: '',
      // personalID: '',
      // picture: '',
      // FB: undefined,
      noticia: {
        content: "",
        title: "",
        mainImage: null,
        keywords: [],
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


    
 //não mexer
  async postar(imagesURL,titulo,texto) {
    var conteudo=titulo+"\n\n"+texto;
    var fotos=[];
 
                      for(var i=0;i<imagesURL.length;i++){
                        console.log(imagesURL[i]);
                     await this.FB.api('/100632798699325/photos', 'post', {
                          access_token: "EAAC2hn7BOCkBAE2jtPPMvTkecnuandWRTXYIKC7sa4sZA5xG2SCUsXGiaKLXV3DszFK0vN3mZCs4igT1Ccih06sg2RxZCwGEJAZA20iiu9mKGHP2YOZCocOKFthkc8aQGDCYQqW8xVC8FpvbrNgxW8vjX0cg76BRXy1lOy3OLtPih3V5UXl7c1p17QbXsY64ZD",
                      url: imagesURL[i],
                      message: 'teste',
                      published: false
                    }, async function(response){
                      if (response && response.id)
                      fotos.push(await response.id);
                        
                        if(imagesURL.length==fotos.length){
                      console.log(fotos);
                    this.FB.api('/100632798699325/feed', 'post', {
                          "access_token": "EAAC2hn7BOCkBAE2jtPPMvTkecnuandWRTXYIKC7sa4sZA5xG2SCUsXGiaKLXV3DszFK0vN3mZCs4igT1Ccih06sg2RxZCwGEJAZA20iiu9mKGHP2YOZCocOKFthkc8aQGDCYQqW8xVC8FpvbrNgxW8vjX0cg76BRXy1lOy3OLtPih3V5UXl7c1p17QbXsY64ZD",
                      "attached_media[0]": {"media_fbid":fotos[0]},
                      "attached_media[1]": {"media_fbid":fotos[1]},
                      "attached_media[2]": {"media_fbid":fotos[2]},
                      "message": conteudo,
                      
                    }, function(response){
                        console.log("enviou",response);
                        
                    });
                    }
                    });


                      }



   
/*
    this.FB.api('/100632798699325/photos', 'post', {
      access_token: "EAAC2hn7BOCkBAE2jtPPMvTkecnuandWRTXYIKC7sa4sZA5xG2SCUsXGiaKLXV3DszFK0vN3mZCs4igT1Ccih06sg2RxZCwGEJAZA20iiu9mKGHP2YOZCocOKFthkc8aQGDCYQqW8xVC8FpvbrNgxW8vjX0cg76BRXy1lOy3OLtPih3V5UXl7c1p17QbXsY64ZD",
  url: 'https://appharbor.com/assets/images/stackoverflow-logo.png',
  message: 'teste',
  published: false
}, function(response){
  if (response && response.id)
    console.log('Photo uploaded', response.id);
});

/*
  
             this.FB.api(
  '/100632798699325/photos',
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
  '/100632798699325/photos',
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
  '/100632798699325/feed',
  'POST',
  {
    "name": "ola mundo",
    "url": "https://appharbor.com/assets/images/stackoverflow-logo.png",
  "access_token": "EAAe3cnEoUkYBACbmtIeVuUt4kWsbC2ZBHvxpgSJf9wZApXUmEQZCQyiBlppEP7GhngN9RjMmTfPwvatWHlXEFSohRKmoc4nA8obuHrWpZAQMMuQ9jJwi6ZCJUXBDrIaqHt3Jl5MhSssYmpR6TecChlS5RoFbjxHqP9DsHKAPqr2eyHVXZAq6hyVHtR71QbIpsZD"},
  function(response) {
      // Insert your code here
      console.log(response);
  }*
);*/
    
  },
  sdkLoaded(payload) {
    this.isConnected = payload.isConnected
    this.FB = payload.FB
    
  },
  login() {
    this.isConnected = true
    
  },
   logout() {
    this.isConnected = false;
    
    
  },
 
    onCopy() {
      this.$notify({
        type: "success",
        title: "Copied to clipboard",
      });
    },
    teste2(e)
    {
      var image=e.target.files || e.dataTransfer.files;
      
      this.noticia.othersfiles.push(image);
    },
    teste(e) {
      var image = e.target.files || e.dataTransfer.files;
      this.noticia.mainImage = image[0];
     
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
    async addNews() {

      

      await firebase
        .firestore()
        .collection("news")
        .add({
          content: this.noticia.content,
          keywords: "fixe",
          title: this.noticia.title,
          published: firebase.firestore.Timestamp.now(),
        })
        .then(async (id) => {
          this.id =  id.id;
          var imagesURL = [];
          var mainImageURL;
          var lengthMainImage=this.noticia.mainImage.name.split(".").length;
          var mainType = this.noticia.mainImage.name.split(".")[lengthMainImage-1];
          
          
          await firebase
            .storage()
            .ref()
            .child("images/" + this.id + "/" + 0 + "." + mainType)
            .put(this.noticia.mainImage)
            .then(async (image) => await image.ref.getDownloadURL().then( (url)=> mainImageURL=url));
          
          
        if(this.noticia.othersfiles[0].length>0)
            Object.entries(this.noticia.othersfiles[0]).forEach(
              async ([index, image]) => {
                var lengthImage=image.name.split(".").length;
                var typeImage=image.name.split(".")[lengthImage-1];
                let n=parseInt(index)+1;
                await firebase
                  .storage()
                  .ref()
                  .child("images/" + this.id + "/" + n + "."+typeImage)
                  .put(image)
                  .then(async (image) => {
                    await image.ref.getDownloadURL().then((url)=> {
                      imagesURL.push(url);
                       
                    if(imagesURL.length==this.noticia.othersfiles[0].length)
                       firebase
                      .firestore()
                      .collection("news")
                      .doc(this.id)
                    .update({
                      images: imagesURL,
                      mainImage: mainImageURL,
                      })
                      .then(async () => {
                          // terminar o loader

                        this.postar(imagesURL,this.noticia.title,this.noticia.content);
                    
                          //-------------------------------------
                      });
                    
                    });
                  });  
              });
              else
                 firebase
                  .firestore()
                  .collection("news")
                  .doc(this.id)
                .update({
                  images: imagesURL,
                  mainImage: mainImageURL,
                  })
                  .then( () => {
                      // terminar o loader ------------------------
                   

                    // -----------------------------------------
                  });
                    });

                    
    },
  },
};
</script>
<style>
</style>
