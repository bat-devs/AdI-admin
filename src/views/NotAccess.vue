<template>
    <div class="not-found">
       <img src="../assets/images/mono-logo.png" width="200px" />
        <h1>Não tem previlégio para aceder a esta página</h1>
        <a @click="$router.go(-1)" class="btn btn-success" style="color:white">Voltar</a>
    </div>
</template>
<style scoped>
    .not-found{
        height: 100%;
        width: 100%;
        margin-top: 20%;
        display: flex;
        padding-left: 10%;
        padding-right: 10%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>