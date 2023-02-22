<template>
    <v-row class="ma-2">
        <v-col cols="4" v-for="meal in mealsResp" :key="meal.idMeal">
            <div @click="openMealDet(meal.idMeal)" >
                <v-img :src="meal.strMealThumb" alt="Imagen de categoria" cover/>
                <p><b>{{ meal.strMeal }}</b></p>
            </div>
        </v-col>
    </v-row>
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