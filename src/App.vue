<template>
  <v-layout>
      <v-app-bar color="primary" density="compact">
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon><img alt="Vue logo" src="./assets/logo.png" height="30"/></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>RECETARIO</v-app-bar-title>

        <template v-slot:append>
          <router-link to="/"><v-btn icon="mdi-dots-vertical"><v-icon icon="mdi-home" /></v-btn></router-link>
          
        </template>
      </v-app-bar>

      <v-main class="layout0">
        <v-container fluid>
          <router-view></router-view> 
        </v-container>
      </v-main>
    </v-layout>

</template>

<script>

export default {
  name: 'App',
  components: {
},
  data(){
    return {
      
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
.layout0{
  --v-layout-top: 0px !important;
}
</style>
