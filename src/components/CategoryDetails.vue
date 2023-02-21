<template>
    <h3>{{ titulo_cat }}</h3>
    <Meals v-bind:mealsResp="meals"></Meals>
</template>

<script>
import Meals from './Meals.vue'
import axios from 'axios'

export default{
    components:{
        Meals
    },
    data(){
        return {
            titulo_cat: this.$route.params.title,
            meals:[],
            pags: 1,
            totPags: 1
        }
    },
    mounted(){
        axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + this.titulo_cat)
        .then((res)=>{
            this.$route.params
            this.meals = res.data.meals
        })
    }
}
</script>