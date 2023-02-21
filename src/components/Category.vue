<template>
    <div class="category-container" v-for="cat in categorias" :key="cat.idCategory">
        <img :src="cat.strCategoryThumb" alt="Imagen de categoria">
        <h6>{{ cat.strCategory }}</h6>
        <p>{{ cat.strCategoryDescription }}</p>
    </div>
</template>

<script>
export default {
    name:"itemCategoria",
    props:['categorias']
}
</script>
<style scoped>
.category-container{
  border: 1px solid yellow;
  padding: 50px;
}
</style>