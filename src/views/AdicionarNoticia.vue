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
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <div class="Field_wrapper">
                      <img
                        v-bind:src="imagePreview"
                        class="preview-image"
                        alt="placeholder"
                        @click="openUpload"
                      />
                      <input
                        type="file"
                        name="mainImage"
                        id="file-field"
                        v-on:change="updatePreview"
                        style="display: none; width: 100%; height: 100%"
                        class="input-filee"
                      />
                    </div>
                  </div>
                </div>
              </div>
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

const db = firebase.firestore();
Vue.use(VueClipboard);
export default {
  directives: {
    "b-tooltip": BTooltipDirective,
  },
  data() {
    return {
      noticia: {
        content: "",
        title: "",
        imagePreview: "../assets/images/image-holder.png",
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

      /*var storageRef = firebase.storage().ref(`news/"${this.imagePreview.name}`);
      const task = storageRef.put(this.imagePreview);
      task.on("state_changed");*/
    },
    openUpload() {
      document.getElementById("file-field").click();
    },
    updatePreview(e) {
      var reader,
        files = e.target.files;

      if (files.lenght === 0) {
        console.log("empty");
      }

      reader = new FileReader();

      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };

      reader.readAsDataURL(files[0]);
    },
  },
};
</script>
<style>
.Field_wrapper {
  width: 202px;
  height: 202px;
  position: relative;
  cursor: pointer;
  background-image: url("../assets/images/image-holder.png");
  background-position: center;
}
.preview-image {
  width: 200px;
  height: 202px;
}
</style>
