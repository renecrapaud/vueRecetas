<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Buscador de recetas</h3>
    <input type="text" v-model="search" v-on:keyup.enter="searchData" placeholder="buscar Receta" class="search-input"/>
    <Meals v-bind:mealsResp="meals"></Meals>
    <div class="text-center">...</div>
    <h3>Todas las categorías</h3>
    <item-categoria v-bind:categorias="paginado"></item-categoria>
    <div class="text-center">
      Actual: {{ pagActual }} de {{ totPags }}
    </div>
    <div class="text-center">
      <a v-on:click="pagAnt">Anterior</a> | <a v-on:click="pagSig">Siguiente</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import itemCategoria from './Category.vue'
import Meals from './Meals.vue'
import Swal from 'sweetalert2'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    itemCategoria,
    Meals
  },
  data(){
    return{
      categorias:[],
      meals:[],
      search:'',
      pagActual: 1,
      tamPag: 5,
      totPags: 0
    }
  },
  computed:{
    indexStart(){
      return (this.pagActual -1) * this.tamPag
    },
    indexEnd(){
      return this.indexStart + this.tamPag
    },
    paginado(){
      return this.categorias.slice(this.indexStart, this.indexEnd)
    }
  },
  mounted(){
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((resp) => {
      this.categorias = resp.data.categories
      this.totPags = Math.ceil(this.categorias.length / this.tamPag)
    }
    )
    .catch((err) => {
      console.log(err)
    })
  },
  methods:{
    searchData(){
      if(this.search.trim() !== ''){
        axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + this.search)
        .then((resp)=>{
          this.meals = resp.data.meals
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Escriba el texto a buscar',
          icon: 'error',
          confirmButtonText: 'De acuerdo'
        })

      }
    },
    pagAnt(){
      if(this.pagActual > 1){
        this.pagActual--
      }
    },
    pagSig(){
      if(this.pagActual < this.totPags){
        this.pagActual++
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.search-input{
  border: none;
  border-bottom: 1px solid orange;
  min-height: 20px;
  margin-top: 20px;
  margin-bottom:20px;
}
*{
  font-family: monospace;
}
</style>
