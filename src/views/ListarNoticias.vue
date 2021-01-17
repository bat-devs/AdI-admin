<template>
  <div>
    <base-header style="background-color:#DB8D07" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
    </base-header>

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
            <tr>
              <th scope="row">
                <div class="media align-items-center">
                  <div class="media-body">
                    <span class="name mb-0 text-sm">Ontem choveu</span>
                  </div>
                </div>
              </th>
              <td class="budget">25-01-2020</td>
              <td>
                <div class="row">
                  <button type="button" class="btn btn-warning"><i class="far fa-edit"></i></button>
                  <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
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
export default {};
</script>
<style>
</style>
