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
                    <h3>Ingredientes
                        <div class="tooltip">
                            <v-icon icon="mdi-content-copy" v-on:click="copiarAlPortapapeles(ingredientes, 'ing')"/>
                            <span v-bind:class ="showIngr ? 'tooltiptext' : 'hidden'">Copiado</span>
                        </div>
                    </h3>
                        <span v-for="(ingr, index) in ingredientes" :key="index">{{ ingr }}, </span>
                    <h3 class="mt-3">Medidas
                        <div class="tooltip">
                            <v-icon icon="mdi-content-copy" v-on:click="copiarAlPortapapeles(medidas, 'm')"/>
                            <span v-bind:class ="showMed ? 'tooltiptext' : 'hidden'">Copiado</span>
                        </div>
                    </h3>
                        <span v-for="(mide, index) in medidas" :key="index">{{ mide }}, </span>
                    <h3 class="ma-3">
                        Instrucciones 
                        <div class="tooltip">
                            <v-icon icon="mdi-content-copy" v-on:click="copiarAlPortapapeles(meals.strInstructions,'itc')"/>
                            <span v-bind:class ="showInstr ? 'tooltiptext' : 'hidden'">Copiado</span>
                        </div>
                    </h3>
                    
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
            medidas: [],
            showIngr: false,
            showMed: false,
            showInstr: false
        }
    },
    methods:{
        copiarAlPortapapeles(instr, tooltip){
            this.showTooltip(tooltip)
            navigator.clipboard.writeText(instr)
        },
        showTooltip(tooltip) {
            if(tooltip == 'ing') {
                this.showIngr = true
                this._timerId = setTimeout(() => this.showIngr = false, 3000)
            }
            if(tooltip == 'm') {
                this.showMed = true
                this._timerId = setTimeout(() => this.showMed = false, 3000)
            }
            if(tooltip == 'itc') {
                this.showInstr = true
                this._timerId = setTimeout(() => this.showInstr = false, 3000)
            }
     }
    },
    mounted(){
        axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.$route.params.id)
        .then((res)=>{
            this.meals = res.data.meals[0]
            let medidaTmp = []
            Object.keys(this.meals).forEach((ingr) => {
                if(ingr.includes('Ingredient') && this.meals[ingr].trim()!== ''){
                    this.ingredientes.push(this.meals[ingr])
                }
                if(ingr.includes('Measure') && this.meals[ingr].trim()!== ''){
                    medidaTmp.push(this.meals[ingr])
                }
            })
            medidaTmp.forEach((medida, index) => {
                this.medidas.push(medida + ' ' + this.ingredientes[index])
            })
        })
    },
    beforeUnmount(){
        clearTimeout(this._timerId)
    }
}
</script>

<style scoped>
    .textJust{
        text-align: justify;
    }
    .tooltip {
        position: relative;
        display: inline-block;
        /* border-bottom: 1px dotted black; */
    }

    .tooltip .tooltiptext {
        /* visibility: hidden; */
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
    }

    .tooltiptext {
        visibility: visible !important;
    }
    .hidden{
        visibility: hidden;
    }
</style>