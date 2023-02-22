<template>
  <div class="mb-2 whtSpc">
    <h3 class="floatLeft">Buscar recetas: </h3>
    <br class="d-sm-none">
    <input type="text" v-model="search" v-on:keyup.enter="searchData" placeholder="Enter para buscar" 
    class="search-input floatLeft ml-4"/>
    <br class="d-sm-none">
    <v-btn color="primary" class="ml-4" @click="searchData">
      Buscar
    </v-btn>
    <v-btn color="error" class="ml-4" @click="limpiarBusqueda">
      Limpiar
    </v-btn>
  </div>
  <v-alert
    v-if="errors"
    density="compact"
    type="warning"
    title="Alerta"
    text="No se obtuvieron resultados"
  ></v-alert>
   
  <Meals v-if="meals" v-bind:mealsResp="meals"></Meals>
  
  <div v-if="categorias && !meals">
    <h3>Por categorías</h3>
    <item-categoria v-bind:categorias="paginado"></item-categoria>
    <div class="text-center">
      Actual: {{ pagActual }} de {{ totPags }}
    </div>
    <div class="text-center">
      <a v-on:click="pagAnt" class="ligaPag">Anterior</a> | <a v-on:click="pagSig" class="ligaPag">Siguiente</a>
    </div>
  </div>
  <v-progress-circular
    v-if="!meals && !categorias && !errors"
    :size="50"
    color="primary"
    indeterminate
  ></v-progress-circular>
</template>
<script>
import axios from 'axios'
import itemCategoria from './Category.vue'
import Meals from './Meals.vue'
import Swal from 'sweetalert2'

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  components:{
    itemCategoria,
    Meals
  },
  data(){
    return{
      categorias:null,
      meals:null,
      search:'',
      pagActual: 1,
      tamPag: 3,
      totPags: 0,
      errors: null
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
      this.errors = err
      this.categorias = null
      this.meals = null
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
        this.meals = null
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
    },
    limpiarBusqueda(){
      this.meals = null
      this.search = ''
    }
  }
}
</script>

<style scooped>
.search-input{
  border: none;
  border-bottom: 1px solid orange;
  min-height: 20px;
  margin-top: 20px;
  margin-bottom:20px;
}

.ligaPag{
  cursor: pointer;
}
.floatLeft{
  display: inline-block;
}
.whtSpc{
  white-space: nowrap;
}
</style>