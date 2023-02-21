<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <item-categoria v-bind:categorias="categorias"></item-categoria>
  </div>
</template>

<script>
import axios from 'axios'
import itemCategoria from './Category.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    itemCategoria
  },
  data(){
    return{
      categorias:[]
    }
  },
  mounted(){
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((resp) => {
      this.categorias = resp.data.categories
    }
    )
    .catch((err) => {
      console.log(err)
    })
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
</style>
