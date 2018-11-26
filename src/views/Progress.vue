<template>
  <div class="home">
      BMI Progress Chart Will Eventually Be Here
    </div>
  </template>

<style>
</style>

<script>
import * as api from '@/services/api_access';
export default {
    data(){
        return {
            state: {
                userid: null,
                users: [],
                completedExercises: [],
                friends: []
            }
        }
    },
    created(){
        setInterval(this.refresh, 500);
        
    },
    methods: {
        refresh(){
            let id = api.userId
            if(id !== null){
                api.GetState()
                .then(x=> this.state.users = x)
                api.GetState()
                .then(x=> this.state.completedExercises = x[id].completedExercises)
                api.GetState()
                .then(x=> this.state.friends = x[id].friends)
                //.then( ()=> api.GetMyExercises(api.userid).then(x=> this.completedExercises = x) )
               }  
            },
        userId: ()=> api.userId
    }
}

</script>
