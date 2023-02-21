<template>
    <div v-if="meals">
        <h3>{{ meals['strMeal'] }} | {{ meals['strArea'] }}</h3>
        <img :src="meals.strMealThumb" v-bind:alt="meals.strMeal">
        <p>Categoría: {{ meals.strCategory }}</p>
        <div class="text-center">...</div>
        <h3>Ingredientes</h3>
            <span v-for="(ingr, index) in ingredientes" :key="index">{{ ingr }}, </span>
        <h3>Medidas</h3>
            <span v-for="(mide, index) in medidas" :key="index">{{ mide }} {{ ingredientes[index] }}, </span>
        <h3>Instrucciones</h3>
        <p>{{ meals.strInstructions }}</p>
        <div class="text-center">...</div>
        <h6 v-if="meals.strCreativeCommonsConfirmed">
            Creative Commons: {{ meals.strCreativeCommonsConfirmed }}
        </h6>
        <h6 v-if="meals.strSource">
            Fuente: <a v-bind:href="meals.strSource" target="_blank"> {{ meals.strSource }} </a>
        </h6>
        <h6 v-if="meals.strSource">
            Video en Youtube: <a v-bind:href="meals.strYoutube" target="_blank"> {{ meals.strYoutube }} </a>
        </h6>
        <h6 v-if="meals.strTags">
            Etiquetas: {{ meals.strTags }}
        </h6>
    </div>
    <div v-else>Cargando...</div>
</template>

<script>
import axios from 'axios'

export default{
    components:{
    },
    data(){
        return {
            meals:null,
            ingredientes: [],
            medidas: []
        }
    },
    mounted(){
        axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.$route.params.id)
        .then((res)=>{
            this.meals = res.data.meals[0]
            // const ingredientes = []
            Object.keys(this.meals).forEach(ingr => {
                if(ingr.includes('Ingredient') && this.meals[ingr].trim()!== ''){
                    this.ingredientes.push(this.meals[ingr])
                }
                if(ingr.includes('Measure') && this.meals[ingr].trim()!== ''){
                    this.medidas.push(this.meals[ingr])
                }
            })
        })
    }
}
</script>