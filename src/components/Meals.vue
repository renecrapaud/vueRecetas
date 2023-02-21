<template>
    <div v-for="meal in mealsResp" :key="meal.idMeal">
        <div @click="openMealDet(meal.idMeal)" class="category-container">
            <img :src="meal.strMealThumb" alt="Imagen de categoria">
            <p><b>{{ meal.strMeal }}</b></p>
            <h6>Categoría: {{ meal.strCategory }} | Origen: {{ meal.strArea }}</h6>
        </div>
    </div>
</template>
<script>
    export default{
        name:"mealComp",
        props:["mealsResp"],
        methods:{
            openMealDet(mealId){
                this.$router.push("/meal/" + mealId)
            }
    }
    }
</script>