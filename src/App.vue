<template>
  <img alt="Vue logo" src="./assets/logo.png" height="50">
  <h1>Buscador de recetas</h1>
  <input type="text" v-model="search" v-on:keyup.enter="searchData" placeholder="buscar Receta"/>
  <Meals v-bind:mealsResp="meals"></Meals>
  <HelloWorld msg="Recetario"/>

</template>

<script>
import axios from 'axios';
import HelloWorld from './components/HelloWorld.vue'
import Meals from './components/Meals.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Meals
},
  data(){
    return {
      meals:[],
      search:''
    }
  },
  methods:{
    searchData(){
      axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + this.search)
      .then((resp)=>{
        this.meals = resp.data.meals
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
