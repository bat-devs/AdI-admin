<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>

    <modal :show.sync="Pubfacebook">
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Postar no facebook
        <span style="font-weight: bold"></span>
      </h5>
      <h2>Deseja postar no facebook?</h2>
      <facebook-login
        class="btn"
        appId="200688768464937"
        @login="login"
        @sdk-loaded="sdkLoaded"
        @logout="logout"
        loginLabel="Iniciar Sessão"
        logoutLabel="Sair"
      >
      </facebook-login>
      <template slot="footer">
        <base-button
          type="secondary"
          class="ml-auto"
          @click="Pubfacebook = false"
          >Fechar
        </base-button>
      </template>
    </modal>
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
              <label for="main" class="image-wrapper">
                <img id="image" v-bind:src="mainImage" />
              </label>
              <input id="main" type="file" @change="teste" accept="image/x-png,image/gif,image/jpeg" />
              <hr class="my-4" />
              <!-- Address -->
              <div class="others-files-header-wrapper">
              <h6 class="heading-small text-muted mb-4">
                Outras fotos sobre a notícia
              </h6>
              <button @click="clearOthersImages" class="btn btn-warning btn btn">Limpar</button>
              </div>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <div class="image-group">
                      <div 
                        class="image-wrapper"
                        :key="image"
                        v-for="image in allImages">
                        <img 
                          id="image" 
                          v-bind:src="image"
                        />
                      </div>
                      <label for="all" class="image-wrapper">
                        <img 
                          id="image" 
                          src="img/others/add-image.jpg"
                        />
                      </label>
                      <input
                        id="all"
                        type="file"
                        @change="teste2"
                        name="outrasFotos[]"
                        accept="image/x-png,image/gif,image/jpeg"
                        multiple
                      />
                    </div>
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
             
            </form>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>
  
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import BTooltipDirective from "bootstrap-vue/esm/directives/tooltip";
import firebase from "firebase";

//import swal from "sweetalert2";
import facebookLogin from "facebook-login-vuejs";
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
      mainImage: 'img/others/add-image.jpg',
      allImages: [],
      isConnected: false,
      Pubfacebook: false,
      // name: '',
      //email: '',
      // personalID: '',
      // picture: '',
      // FB: undefined,
      te:'',
      noticia: {
        content: "",
        title: "",
        mainImage: null,
        keywords: [],
        othersfiles: [],
        pageToken:'',
      },
    };
  },

  methods: {
 //não mexer

  async postar(imagesURL,titulo,texto,id) {
 
  
  
  this.FB.getLoginStatus( function(response) {
  if (response.status === 'connected') {
    var accessToken = response.authResponse.accessToken;
      this.FB.api(
          '/me/accounts', 
          'get',{
            access_token: accessToken,
          },
         async  function(response){            
         
          for(var i=0;i<response.data.length;i++){
            if(response.data[i].id==100632798699325){
              
            this.pageToken= response.data[i].access_token;
              var conteudo=titulo+"\n\n"+texto;
              var fotos=[];
              let dados={
                "access_token": this.pageToken,
                "message": conteudo,  
              };
             var caminho="https://storage.googleapis.com/academiadeinvestimento-ba1c3.appspot.com/images/"+id+"/0.jpg";
           

          this.FB.api('/17841445161723909/media?image_url='+caminho+'&caption='+conteudo, 'post', {
          access_token: this.pageToken,
          }, async function(response){
            console.log(response);
            if(response.id){
              this.FB.api(
                '/17841445161723909/media_publish?creation_id='+response.id, 
                'post',{
                  access_token: this.pageToken,
                },
                function(){            
                      
              });
            }
            
          });
                
               
    for(var i1=0;i1<imagesURL.length;i1++){
                        console.log(this.pageToken);
     await this.FB.api('/100632798699325/photos', 'post', {
              access_token: this.pageToken,
              url: imagesURL[i1],
              message: 'teste',
              published: false
              }, 
              async function(response){
                if (response && response.id){
                    fotos.push(await response.id);
                  dados["attached_media["+parseInt(fotos.length-1)+"]"]={"media_fbid":await response.id};
                }
                console.log(response);
                if(imagesURL.length==fotos.length){
                      
                    this.FB.api(
                      '/100632798699325/feed', 
                      'post', 
                      dados,
                      function(response){
                        console.log("ola",dados);
                        console.log(response);
                    });
                  }
              });
      }


            }
          }   
        }); 
      } 
    });
  
   


    },
    async getTokenPage(){

  
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
    },
    async login() {
      this.Pubfacebook=false;
      this.isConnected = true;
      
    },
    logout() {
      this.isConnected = false;
    },
    clearOthersImages() {
      this.allImages = [],
      this.noticia.othersfiles = [];
    },

    onCopy() {
      this.$notify({
        type: "success",
        title: "Copied to clipboard",
      });
    },
    teste2(e) {
       
      var image = e.target.files || e.dataTransfer.files;
      this.noticia.othersfiles.push(image);
      image.forEach(e => this.allImages.push(URL.createObjectURL(e)));
    
    },
    teste(e) {
      var image = e.target.files || e.dataTransfer.files;
      var blob = image[0].slice(0, image[0].size, 'image/jpg'); 
      var newFile = new File([blob], 'principal.jpg', {type: 'image/jpg'});
    
      this.noticia.mainImage=newFile;
      const fakeImageURL = URL.createObjectURL(this.noticia.mainImage);
      this.mainImage = fakeImageURL;
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
      
      
      this.Pubfacebook=true;
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
          this.id = id.id;
          var imagesURL = [];
          var mainImageURL;
          var lengthMainImage = this.noticia.mainImage.name.split(".").length;
          var mainType = this.noticia.mainImage.name.split(".")[
            lengthMainImage - 1
          ];

          await firebase
            .storage()
            .ref()
            .child("images/" + this.id + "/" + 0 +'.'+mainType )
            .put(this.noticia.mainImage)
            .then(
              async (image) =>
                await image.ref
                  .getDownloadURL()
                  .then((url) => (mainImageURL = url))
            );

          if (this.noticia.othersfiles[0].length > 0)
            Object.entries(this.noticia.othersfiles[0]).forEach(
              async ([index, image]) => {
                var lengthImage = image.name.split(".").length;
                var typeImage = image.name.split(".")[lengthImage - 1];
                let n = parseInt(index) + 1;
                await firebase
                  .storage()
                  .ref()
                  .child("images/" + this.id + "/" + n + "." + typeImage)
                  .put(image)
                  .then(async (image) => {
                    await image.ref.getDownloadURL().then((url) => {
                      imagesURL.push(url);

                      if (
                        imagesURL.length == this.noticia.othersfiles[0].length
                      )
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
                            imagesURL.push(mainImageURL);
                         
                          if(this.isConnected)
                            this.postar(
                              imagesURL,
                              this.noticia.title,
                              this.noticia.content,
                              this.id
                            );

                            //-------------------------------------
                          });
                    });
                  });
              }
            );
          else
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
                  imagesURL.push(mainImageURL);
        
                  if(this.isConnected)
                      this.postar(
                      imagesURL,
                      this.noticia.title,
                      this.noticia.content,
                      this.id
                      );

                // -----------------------------------------
              });
        });
        
    },
  },
};
</script>
<style>
  .others-files-header-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .image-group{
    display: flex;
    flex-wrap: wrap;
  }
  .image-wrapper {
    margin: 0.5rem;
    min-width: 5rem;
    max-width: 10rem;
    min-height: 5rem;
    max-height: 10rem;
    border-radius: 5px;
    overflow: hidden;
  }
  .image-wrapper > img{
    width: 100%;
    height: 100%;
  }
  input[type="file"] {
    opacity: 0;
  }
</style>
