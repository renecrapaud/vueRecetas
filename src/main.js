import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './components/HomePage'
import CategoryDetails from './components/CategoryDetails'
import MealDetails from './components/MealDetails'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})

const routes = [
    {
        path: "/",
        name: "homePage",
        component: HomePage
    },
    {
        path: "/category/:title",
        name: "Category",
        component: CategoryDetails
    },
    {
        path: "/meal/:id",
        name: "Meal",
        component: MealDetails
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

createApp(App).use(router).use(vuetify).mount('#app')
