<template>
<div>
    <div class="row">
        <div class="col-md-4">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Online Users</h5>
                    <ul class="list-group">
                        <li class="list-group-item" v-for= "user in state.users" :key="user.userId">{{user.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Add New Workout</h5>
                    Workout Name<input class="form-control" type="text" placeholder="Enter Workout Name" id="workoutName">
                    Workout Reps<input class="form-control" type="number" placeholder="Enter Workout Reps" id="workoutReps">
                    Workout Weight<input class="form-control" type="number" placeholder="Enter Workout Weight" id="workoutWeight"><br>
                    <a @click.prevent="addWorkout__" class="btn btn-primary">Add Workout</a>
                </div>
            </div>
        </div>
                <div class="col-md-4">
             <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Your Completed Workouts</h5>
                    <ul class="list-group">
                        <li class="list-group-item" v-for= "x in state.completedExercises" :key="x.name"><b>{{x.name}}</b>
                                                                                                         <br> {{x.reps}} Reps
                                                                                                         <br> {{x.weight}} Lbs</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-4">
           
        </div>
    </div>
</div>
</template>

<style lang="scss">

</style>

<script>
import * as api from '@/services/api_access';
export default {
    data(){
        return {
            state: {
                userid: null,
                users: [],
                completedExercises: []
            }
        }
    },
    created(){
        setInterval(this.refresh, 100);
        
    },
    methods: {
        refresh(){
            api.GetState()
            .then(x=> this.state.users = x)
            let id = api.GetUserId()
            if(id !== null){
                api.GetState()
                .then(x=> this.state.completedExercises = x[id].completedExercises)
                //.then( ()=> api.GetMyExercises(api.userid).then(x=> this.completedExercises = x) )
               }  
            },  
        addWorkout__(){
            let id = api.GetUserId()
            let wName = document.getElementById("workoutName").value;
            let wReps = document.getElementById("workoutReps").value;
            let wWeight = document.getElementById("workoutWeight").value;
            api.addWorkout(id,wName,wReps,wWeight)
            this.refresh()
            console.log("refresh ran")
        },
        getExercises(id){
            let x = api.GetMyExercises(id)
            console.log(x)
            return x
        },
        userId: ()=> api.userId
    }
}
</script>
