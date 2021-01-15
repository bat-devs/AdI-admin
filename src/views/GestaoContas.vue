<template>
  <div>
    <base-header
      style="background-color: #db8d07"
      class="pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
    </base-header>
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
              <td class="budget">Milton Bernardo</td>
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm"></span>
                  </div>
                </div>
              </th>
              <td class="budget">AKZ</td>
              <td class="budget">meses</td>
              <td class="budget">AKZ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      accounts: [],
    };
  },
  created() {
    
  },
};
</script>
<style>
</style>
