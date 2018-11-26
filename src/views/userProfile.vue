<template>
<div>
    <h1>{{this.state.users[userId()].name+"'s"}} Profile  USERPROFILE PAGE</h1>
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
                    <h5 class="card-title">Add New Workout</h5>
                    Workout Name<input class="form-control" type="text" placeholder="Enter Workout Name" id="workoutName">
                    Workout Reps<input class="form-control" type="number" placeholder="Enter Workout Reps" id="workoutReps">
                    Workout Weight<input class="form-control" type="number" placeholder="Enter Workout Weight" id="workoutWeight"><br>
                    <a @click.prevent="addWorkout__" class="btn btn-primary">Add Workout</a>
                </div>
            </div>
        </div>
        <div class="col-md-4">
           
        </div>
    </div>
</div>
</template>

<style>
#friendbuttons{
    float: right;
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
    created(){
        setInterval(this.refresh, 500);
    },
    methods: {
        refresh(){
            let id = api.GetUserId()
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
        getExercises(id){
            let x = api.GetMyExercises(id)
            console.log(x)
            return x
        },
        userId: ()=>  api.GetUserId()
    }
}
</script>
