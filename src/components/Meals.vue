<template>
    <div v-for="meal in mealsResp" :key="meal.id">
        <img :src="meal.strMealThumb" alt="Imagen de categoria">
        <p><b>{{ meal.strMeal }}</b></p>
        <h6>Categoría: {{ meal.strCategory }} | Origen: {{ meal.strArea }}</h6>
    </div>
</template>
<script>
    export default{
        name:"mealComp",
        props:["mealsResp"]    
    }
</script>