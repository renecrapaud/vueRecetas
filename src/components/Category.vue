<template>
    <div v-for="cat in categorias" :key="cat.idCategory">
        <div @click="openCatList(cat.strCategory)" class="category-container">
            <img :src="cat.strCategoryThumb" alt="Imagen de categoria">
            <h6>{{ cat.strCategory }}</h6>
            <p>{{ cat.strCategoryDescription }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"itemCategoria",
    props:['categorias'],
    methods:{
        openCatList(catName){
            this.$router.push("/category/" + catName)
        }
    },

}
</script>
<style scoped>
.category-container{
  border: 1px solid orange;
  padding: 50px;
}
</style>