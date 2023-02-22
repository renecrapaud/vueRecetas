<template>
    <v-row class="ma-2" v-if="meals">
        <v-col cols="0" sm="2" md="2" lg="3"></v-col>
        <v-col cols="12" sm="8" md="8" lg="6">
            <v-card class="mx-auto">
                <v-img :src="meals.strMealThumb" v-bind:alt="meals.strMeal" cover>
                </v-img>

                <v-card-subtitle class="pt-4">
                    <p> {{ meals['strMeal'] }} | {{ meals['strArea'] }} </p>
                </v-card-subtitle>

                <v-card-text>
                    <h3>Ingredientes</h3>
                        <span v-for="(ingr, index) in ingredientes" :key="index">{{ ingr }}, </span>
                    <h3 class="mt-3">Medidas</h3>
                        <span v-for="(mide, index) in medidas" :key="index">{{ mide }} {{ ingredientes[index] }}, </span>
                    <h3 class="ma-3">Instrucciones</h3>
                    <p class="textJust">{{ meals.strInstructions }}</p>
                </v-card-text>
                <v-card-actions>
                    <h6 v-if="meals.strCreativeCommonsConfirmed">
                        Creative Commons: {{ meals.strCreativeCommonsConfirmed }}
                    </h6>
                    <h6 v-if="meals.strSource">
                        Fuente: <a v-bind:href="meals.strSource" target="_blank"> {{ meals.strSource }} </a>
                    </h6>
                    <h6 v-if="meals.strSource">
                        Youtube: <a v-bind:href="meals.strYoutube" target="_blank"> {{ meals.strYoutube }} </a>
                    </h6>
                    <h6 v-if="meals.strTags">
                        Etiquetas: {{ meals.strTags }}
                    </h6>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <v-progress-circular
        v-else
        :size="50"
        color="primary"
        indeterminate
    ></v-progress-circular>
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

<style>
    .textJust{
        text-align: justify;
    }
</style>