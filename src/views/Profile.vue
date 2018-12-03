<template>
<div>
    <h1>Your Profile</h1>
    <div class="row">
<div class="col-md-4">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">{{this.state.users[userId()].name+"'s"}} Friends</h5>
                    <ul class="list-group">
                        <li class="list-group-item" v-for= "x in state.friends" :key="x.id">{{state.users[x].name}} <a @click.prevent="removeFriend(x)" id="friendbuttons" class="btn btn-sm btn-danger">Remove Friend</a> </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-4">
             <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Your Completed Workouts</h5>
                    <ul class="list-group">
                        <li id="doneWorkout" class="list-group-item" v-for= "x in state.completedExercises" :key="x.name"><b>{{x.name}}</b>
                                                                                                         <br> {{x.reps}} Reps
                                                                                                         <br> {{x.weight}} Lbs</li>
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
    </div>
</div>
</template>

<style>
#friendbuttons{
    float: right;
}
#doneWorkout{
    background-color: lightgreen;
}
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
    mounted(){
        setInterval(this.refresh , 1000)
    },
    methods: {
        refresh(){
            let id = api.userId
            this.state.userid = id;
            if(id !== null){
                api.GetState()
                .then(x=> {
                    this.state.users = x;
                    this.state.completedExercises = x[id].completedExercises
                    this.state.friends = x[id].friends
                })
                }else{
                   this.state = {};
               } 
            },  
        addWorkout__(){
            let id = api.GetUserId()
            let wName = document.getElementById("workoutName").value;
            let wReps = document.getElementById("workoutReps").value;
            let wWeight = document.getElementById("workoutWeight").value;
            api.addWorkout(id,wName,wReps,wWeight)
            alert("Great Job!");
        },
        getExercises(id){
            let x = api.GetMyExercises(id)
            console.log(x)
            return x
        },
        removeFriend(id){
            api.removeFriend(api.userId,id)
            console.log(api.userId + " removed " + id)
        },
        userId: ()=>  api.GetUserId()
    }
}
</script>
