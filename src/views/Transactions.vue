<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
    <div class="d-flex justify-content-center mt-3">
      <half-circle-spinner
        v-if="loader"
        :animation-duration="1000"
        :size="60"
        color="#113855"
      />
    </div>
    <modal :show.sync="addTransaction">
      <h5
        slot="header"
        modal-classes="modal-dialog-centered modal-xl"
        class="modal-title"
        id="modal-title-default"
      >
        Adicionar transação
        <span style="font-weight: bold"></span>
      </h5>
      <base-input
        v-model="description"
        label="Descrição"
        placeholder="Descriçaõ"
        input-classes="form-control"
      />
      <base-input
        v-model="value"
        label="Valor"
        placeholder="Valor"
        input-classes="form-control"
      />
      <template slot="footer">
        <base-button
          type="secondary"
          class="ml-auto"
          @click="addTransaction = false"
          >Fechar
        </base-button>
        <base-button
          type="primary"
          class="ml-auto"
          @click="addTrans()"
          >Adicionar transação
        </base-button>
      </template>
    </modal>
    <button @click="addTransaction = true" class="btn btn-primary ml-3 mt-3 mb-3">
      Adicionar transação
    </button>
    <div class="table-responsive">
      <div>
        <table class="table align-items-center table-light">
          <thead class="thead-light">
            <tr>
              <th scope="col" class="sort" data-sort="name">Nome do cliente</th>
              <th scope="col" class="sort" data-sort="name">Aplicação</th>
              <th scope="col" class="sort" data-sort="budget">Capital</th>
              <th scope="col" class="sort" data-sort="budget">Duração</th>
              <th scope="col" class="sort" data-sort="budget">Resultado</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr>
              <td class="budget">oi</td>
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">
                      {{ this.$route.params.id }}
                    </span>
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { HalfCircleSpinner } from "epic-spinners";
import swal from "sweetalert2";
export default {
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      loader: true,
      addTransaction: false,
      description: "",
      value: "",
    };
  },

  methods: {
    addTrans() {
      //código do adicionar as tranasções
      swal.fire({
        position: "top-end",
        icon: "success",
        title: "A transação foi adicionada",
        showConfirmButton: false,
        timer: 1500,
      });
      this.addTransaction=false;
    },
  },
};
</script>
