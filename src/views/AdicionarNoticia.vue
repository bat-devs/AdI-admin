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
                @sdk-loaded="sdkLoaded">
              </facebook-login>
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
        keywords: [],
        othersfiles: [],
      },
    };
  },

  methods: {


    
 //não mexer
  async postar() {
   
var fotos=[];
 
  for(var i=0;i<3;i++){
  await this.FB.api('/100632798699325/photos', 'post', {
      access_token: "EAAC2hn7BOCkBAE2jtPPMvTkecnuandWRTXYIKC7sa4sZA5xG2SCUsXGiaKLXV3DszFK0vN3mZCs4igT1Ccih06sg2RxZCwGEJAZA20iiu9mKGHP2YOZCocOKFthkc8aQGDCYQqW8xVC8FpvbrNgxW8vjX0cg76BRXy1lOy3OLtPih3V5UXl7c1p17QbXsY64ZD",
  url: 'https://appharbor.com/assets/images/stackoverflow-logo.png',
  message: 'teste',
  published: false
}, async function(response){
  if (response && response.id)
  fotos.push(await response.id);
    console.log('Photo uploaded', response.id);
  console.log(i);
    if(i==3){
  console.log(fotos);
this.FB.api('/100632798699325/feed', 'post', {
      "access_token": "EAAC2hn7BOCkBAE2jtPPMvTkecnuandWRTXYIKC7sa4sZA5xG2SCUsXGiaKLXV3DszFK0vN3mZCs4igT1Ccih06sg2RxZCwGEJAZA20iiu9mKGHP2YOZCocOKFthkc8aQGDCYQqW8xVC8FpvbrNgxW8vjX0cg76BRXy1lOy3OLtPih3V5UXl7c1p17QbXsY64ZD",
  "attached_media[0]": {"media_fbid":fotos[0]},
  "attached_media[1]": {"media_fbid":fotos[1]},
  "attached_media[2]": {"media_fbid":fotos[2]},
  "message": 'teste',
  
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
    if (this.isConnected) this.postar()
  },
  login() {
    this.isConnected = true
    this.postar()
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
                      .then(() => {
                          // terminar o loader
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
                  .then(() => {
                      // terminar o loader
                  });
                    });
    },
  },
};
</script>
<style>
</style>
