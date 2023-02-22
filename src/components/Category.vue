<template>
    <v-row class="ma-2">    
        <v-col cols="12" sm="6" md="4" v-for="cat in categorias" :key="cat.idCategory">
            <v-card class="mx-auto altoUnif" @click="openCatList(cat.strCategory)">
                <v-img :src="cat.strCategoryThumb" alt="Imagen de categoria" cover/>

                <v-card-subtitle class="pt-4">
                    {{ cat.strCategory }}
                </v-card-subtitle>

                <v-card-text class="textSect">
                    <p class="textJust">{{ cat.strCategoryDescription }}</p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
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
.altoUnif{
  height: 100%;
}
.textJust{
    text-align: justify;
}
.textSect {
    height: inherit;
    background-color: aquamarine;
}
</style>