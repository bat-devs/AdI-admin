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
        Postar
        <span style="font-weight: bold"></span>
      </h5>
      <h2>
        Aonde deseja publicar a notícia? <b> (Além de publicar no site)</b>
      </h2>
      <base-checkbox class="mb-3" v-model="facebook">
        <i class="fab fa-facebook"></i> Facebook
      </base-checkbox>
      <base-checkbox class="mb-3" v-model="instagram">
        <i class="fab fa-instagram"></i> Instagram
      </base-checkbox>
      <facebook-login
        v-if="(facebook || instagram) && !isConnected"
        class="facebook-button"
        appId="200688768464937"
        @login="login"
        @sdk-loaded="sdkLoaded"
        @logout="logout"
        loginLabel="Iniciar Sessão no Facebook"
        logoutLabel="Sair"
      >
      </facebook-login>
      <template slot="footer">
        <base-button type="primary" class="ml-auto" @click="addNews"
          >Publicar notícia
        </base-button>
        <base-button
          type="secondary"
          class="ml-auto"
          @click="Pubfacebook = false"
          >Fechar
        </base-button>
      </template>
    </modal>
    <modal id="loading-modal" :show.sync="loader" class="loading-modal">
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Carregando...
        <span style="font-weight: bold"></span>
      </h5>
      <div class="d-flex justify-content-center">
        <half-circle-spinner
          class="mt-4"
          v-if="loader"
          :animation-duration="1000"
          :size="60"
          color="#113855"
        />
      </div>
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
                      required
                    />
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <div class="row ml-4">
                <h6 class="heading-small mb-4">Imagem principal da notícia</h6>
                <h6 class="heading-small mb-4" style="color: red">
                  (Campo obrigatório)
                </h6>
              </div>
              <label for="main" class="image-wrapper">
                <img id="image" v-bind:src="mainImage" />
              </label>
              <input
                id="main"
                type="file"
                @change="teste"
                accept="image/x-png,image/gif,image/jpeg"
                style="border: 1px solid red"
              />
              <hr class="my-4" />
              <!-- Address -->
              <div class="others-files-header-wrapper">
                <h6 class="heading-small mb-4 ml-4">Outras fotos sobre a notícia</h6>
                <button
                  @click="clearOthersImages"
                  class="btn btn-warning btn btn"
                >
                  Limpar
                </button>
              </div>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <div class="image-group">
                      <div
                        class="image-wrapper"
                        :key="image"
                        v-for="image in allImages"
                      >
                        <img id="image" v-bind:src="image" />
                      </div>
                      <label for="all" class="image-wrapper">
                        <img id="image" src="img/others/add-image.jpg" />
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
              <div class="row ml-4" >
                <h6 class="heading-small mb-4">Conteúdo da notícia</h6>
                <h6 class="heading-small mb-4" style="color: red">
                  (Campo obrigatório)
                </h6>
              </div>
              <div class="pl-lg-4">
                <div class="form-group">
                  <textarea
                    v-model="noticia.content"
                    rows="4"
                    class="form-control"
                    placeholder="Escreve aqui o conteúdo da sua notícia..."
                  >
                  </textarea>
                </div>
              </div>
              <button
                @click="validations"
                class="btn btn-success btn-lg btn-block"
              >
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
import { HalfCircleSpinner } from "epic-spinners";
import firebase from "firebase";
import Swal from "sweetalert2";
//import swal from "sweetalert2";
import facebookLogin from "facebook-login-vuejs";
//const db = firebase.firestore();
Vue.use(VueClipboard);

export default {
  components: {
    facebookLogin,
    HalfCircleSpinner,
  },
  directives: {
    "b-tooltip": BTooltipDirective,
  },
  data() {
    return {
      mainImage: "img/others/add-image.jpg",
      allImages: [],
      isConnected: false,
      Pubfacebook: false,
      loader: false,
      currentUserEmail: "",
      facebook: false,
      instagram: false,
      imagesURL: [],
      pageToken: "",
      Vtitle: false,
      VmainImage: false,
      Vcontent: false,
      noticia: {
        content: "",
        title: "",
        mainImage: null,
        keywords: [],
        othersfiles: [],
        pageToken: "",
      },
    };
  },
  beforeCreate() {
    this.currentUserEmail = firebase.auth().currentUser.email;
  },
  methods: {
    validations() {
      if (!(this.noticia.tile == "")) this.Vtitle = true;

      if (!(this.mainImage == "img/others/add-image.jpg")) this.VmainImage = true;

      if (!(this.noticia.content == "")) this.Vcontent = true;

      if (!this.Vtitle || !this.VmainImage || !this.Vcontent) {
        Swal.fire({
          icon: "error",
          title: "Verifique os campos antes de publicar a notícia!",
          text:
            "Os campos obrigatórios não podem estar vázios!",
        });
      } else {
        this.Pubfacebook = true;
      }
    },
    cleanData() {
      this.mainImage = "img/others/add-image.jpg";
      this.allImages = [];
      this.isConnected = false;
      this.Pubfacebook = false;
      this.loader = false;
      this.currentUserEmail = "";
      this.facebook = false;
      this.instagram = false;
      this.imagesURL = [];
      this.noticia = {
        content: "",
        title: "",
        mainImage: null,
        keywords: [],
        othersfiles: [],
      };
    },
    async postar(imagesURL, titulo, texto, id) {
      await this.FB.getLoginStatus(async (response) => {
        if (response.status === "connected") {
          var accessToken = response.authResponse.accessToken;

          await this.FB.api(
            "/me/accounts",
            "get",
            {
              access_token: accessToken,
            },
            async (response) => {
              for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id == 102394148583669) {
                  this.pageToken = response.data[i].access_token;
                  var conteudo = titulo + "\n\n" + texto;
                  var fotos = [];
                  let dados = {
                    access_token: this.pageToken,
                    message: conteudo,
                  };

                  if (this.instagram) {
                    var caminho =
                      "https://storage.googleapis.com/academiadeinvestimento-ba1c3.appspot.com/images/" +
                      id +
                      "/0.jpg";

                    await this.FB.api(
                      "/17841446126037923/media?image_url=" +
                        caminho +
                        "&caption=" +
                        conteudo,
                      "post",
                      {
                        access_token: this.pageToken,
                      },
                      async (response) => {
                        if (response.id) {
                          await this.FB.api(
                            "/17841446126037923/media_publish?creation_id=" +
                              response.id,
                            "post",
                            {
                              access_token: this.pageToken,
                            },
                            () => {
                              if (!this.facebook) {
                                this.loader = false;
                                Swal.fire({
                                  position: "top-end",
                                  icon: "success",
                                  title: "A notícia foi publicada!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });
                                this.cleanData();
                                this.$router.push("/noticias");
                              }
                            }
                          );
                        }
                      }
                    );
                  }

                  if (this.facebook)
                    for (var i1 = 0; i1 < imagesURL.length; i1++) {
                      await this.FB.api(
                        "/102394148583669/photos",
                        "post",
                        {
                          access_token: this.pageToken,
                          url: imagesURL[i1],
                          message: "teste",
                          published: false,
                        },
                        async (response) => {
                          if (response && response.id) {
                            fotos.push(await response.id);
                            dados[
                              "attached_media[" +
                                parseInt(fotos.length - 1) +
                                "]"
                            ] = { media_fbid: await response.id };
                          }

                          if (imagesURL.length == fotos.length) {
                            await this.FB.api(
                              "/102394148583669/feed",
                              "post",
                              dados,
                              () => {
                                this.loader = false;
                                Swal.fire({
                                  position: "top-end",
                                  icon: "success",
                                  title: "A notícia foi publicada!",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });
                                this.cleanData();
                                this.$router.push("/noticias");
                              }
                            );
                          }
                        }
                      );
                    }
                }
              }
            }
          );
        }
      });
    },
    closeModal() {
      this.loader = false;
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
    },
    async login() {
      this.Pubfacebook = false;
      this.isConnected = true;
      this.Pubfacebook = true;
    },
    logout() {
      this.isConnected = false;
    },
    clearOthersImages() {
      (this.allImages = []), (this.noticia.othersfiles = []);
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
      image.forEach((e) => this.allImages.push(URL.createObjectURL(e)));
    },
    teste(e) {
      var image = e.target.files || e.dataTransfer.files;
      var blob = image[0].slice(0, image[0].size, "image/jpg");
      var newFile = new File([blob], "principal.jpg", { type: "image/jpg" });

      this.noticia.mainImage = newFile;
      const fakeImageURL = URL.createObjectURL(this.noticia.mainImage);
      this.mainImage = fakeImageURL;

      var img = new Image();
      img.src = fakeImageURL;
      img.onload = (event) => {
        var result =
          event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;
        if (!(result >= 0.8 && result <= 1.91))
          Swal.fire({
            icon: "error",
            title: "ERRO",
            text:
              "Imagem principal com resolução incompatível, por favor tente outra imagem!",
          });
      };
    },

    deleNew() {
      //apagar
      firebase
        .firestore()
        .collection("news")
        .doc("id")
        .delete()
        .then(function () {})
        .catch(function (error) {
          console.error("Erro ", error);
        });
    },
    // Função para adicionar noticia
    async addNews() {
      this.loader = true;

      await firebase
        .firestore()
        .collection("news")
        .add({
          content: this.noticia.content,
          keywords: "fixe",
          title: this.noticia.title,
          published: firebase.firestore.Timestamp.now(),
          assignedby: this.$store.getters.getCurrentUserEmail,
        })
        .then(async (id) => {
          this.id = id.id;
          var mainImageURL;
          var lengthMainImage = this.noticia.mainImage.name.split(".").length;
          var mainType = this.noticia.mainImage.name.split(".")[
            lengthMainImage - 1
          ];

          await firebase
            .storage()
            .ref()
            .child("images/" + this.id + "/" + 0 + "." + mainType)
            .put(this.noticia.mainImage)
            .then(
              async (image) =>
                await image.ref
                  .getDownloadURL()
                  .then((url) => (mainImageURL = url))
            );

          if ( this.noticia.othersfiles.length>0 && this.noticia.othersfiles[0].length > 0)
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
                      this.imagesURL.push(url);

                      if (
                        this.imagesURL.length ==
                        this.noticia.othersfiles[0].length
                      )
                        firebase
                          .firestore()
                          .collection("news")
                          .doc(this.id)
                          .update({
                            images: this.imagesURL,
                            mainImage: mainImageURL,
                          })
                          .then(async () => {
                            // terminar o loader
                            this.imagesURL.push(mainImageURL);
                            if (this.isConnected && this.loader) {
                              this.postar(
                                this.imagesURL,
                                this.noticia.title,
                                this.noticia.content,
                                this.id
                              );
                            } else {
                              this.loader = false;
                              Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "A notícia foi publicada!",
                                showConfirmButton: false,
                                timer: 1500,
                              });
                              this.cleanData();
                              this.$router.push("/noticias");
                            }
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
                images: this.imagesURL,
                mainImage: mainImageURL,
              })
              .then(async () => {
                // terminar o loader
                this.imagesURL.push(mainImageURL);

                if (this.isConnected && this.loader) {
                  this.postar(
                    this.imagesURL,
                    this.noticia.title,
                    this.noticia.content,
                    this.id
                  );
                } else {
                  this.loader = false;
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "A notícia foi publicada!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.cleanData();
                  this.$router.push("/noticias");
                }
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
.image-group {
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
.image-wrapper > img {
  width: 100%;
  height: 100%;
}
input[type="file"] {
  opacity: 0;
}
.facebook-button > button {
  border-radius: 10px;
  cursor: pointer;
}
.facebook-button > button > img {
  display: none;
}
.loading-modal .close {
  display: none;
}
.border-error {
  border: 1px solid red;
}
</style>
