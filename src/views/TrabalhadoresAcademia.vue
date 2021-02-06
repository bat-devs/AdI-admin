<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
    </base-header>

    <div class="d-flex justify-content-center mt-3">
      <half-circle-spinner
        v-if="loader"
        :animation-duration="1000"
        :size="60"
        color="#113855"
      />
    </div>
    <div class="table-responsive" v-if="!loader">
      <div>
        <table class="table align-items-center table-light">
          <thead class="thead-light">
            <tr>
              <th scope="col" class="sort" data-sort="name">Nome do cliente</th>
              <th scope="col" class="sort" data-sort="name">Telefone</th>
              <th scope="col" class="sort" data-sort="budget">Tipo</th>
              <th scope="col" class="sort" data-sort="name">
                Tipo da Aplicação
              </th>
              <th scope="col" class="sort" data-sort="name">Aplicação</th>
              <th scope="col" class="sort" data-sort="budget">Capital</th>
              <th scope="col" class="sort" data-sort="budget">Duração</th>
              <th scope="col" class="sort" data-sort="budget">Resultado</th>
              <th scope="col" class="sort" data-sort="budget">Data</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <tr >
              <td class="budget">oi</td>
              <td class="budget">oi</td>
              <td class="budget">oi</td>
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">oi</span>
                  </div>
                </div>
              </th>
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">oi</span>
                  </div>
                </div>
              </th>
              <td class="budget">oi</td>
              <td class="budget">iii meses</td>
              <td class="budget">ii AKZ</td>
              <td class="budget">
                jjj
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

import { HalfCircleSpinner } from "epic-spinners";
export default {
  components: {
      HalfCircleSpinner
  },
  data() {
    return {
      loader: false,
    };
  },

  methods: {
    //
  },
};
</script>
