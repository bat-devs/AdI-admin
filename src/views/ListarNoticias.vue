<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <div class="d-flex justify-content-start" style="margin:20px">
      <router-link
        to="/noticias/adicionar-noticia"
        class="btn btn-primary"
        
        > <i class="fas fa-plus"></i> Adicionar Notícia </router-link
      >
    </div>
    <div class="table-responsive">
      <div>
        <table class="table align-items-center table-light">
          <thead class="thead-light">
            <tr>
              <th scope="col" class="sort" data-sort="name">Nome da notícia</th>
              <th scope="col" class="sort" data-sort="budget">
                Data de publicação
              </th>
              <th scope="col" class="sort" data-sort="status">Acções</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="(noticia, index) in noticias" :key="index">
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">{{ noticia.title }}</span>
                  </div>
                </div>
              </th>
              <td class="budget">
                {{ noticia.publishedAt.toDate().toLocaleString() }}
              </td>
              <td>
                <div class="row">
                  <button type="button" class="btn btn-warning">
                    <i class="far fa-edit"></i>
                  </button>
                  <button type="button" class="btn btn-danger">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";

const db = firebase.firestore();
let noticias = [];
export default {
  data() {
    return {
      noticias,
    };
  },
  beforeCreate() {
    noticias=[];
    db.collection("news")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          noticias.push(doc.data());
        });
      });
    
  },
  beforeDestroy() {
    noticias=[];
  },
};
</script>
<style>
</style>
