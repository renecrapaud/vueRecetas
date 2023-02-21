import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './components/HomePage'
import CategoryDetails from './components/CategoryDetails'
import MealDetails from './components/MealDetails'

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

createApp(App).use(router).mount('#app')
