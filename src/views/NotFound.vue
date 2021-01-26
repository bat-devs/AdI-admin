<template>
    <div class="not-found">
       <img src="../assets/images/mono-logo.png" width="200px" />
        <h1>Página não encontrada</h1>
        <a @click="$router.go(-1)" class="btn btn-success" style="color:white">Voltar</a>

    </div>
</template>
<style scoped>
    .not-found{
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>