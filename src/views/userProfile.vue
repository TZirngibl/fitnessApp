<template>
<div>
    <h1>{{this.state.users[profileView()].name+"'s"}} Profile</h1>
    <div class="row">
<div class="col-md-4">
            <div class="card" >
                <div class="card-body">
                     <h5 class="card-title">{{this.state.users[profileView()].name+"'s"}} Friends</h5>
                    <ul class="list-group">
                        <li class="list-group-item" v-for= "x in this.state.users[profileView()].friends" :key="x.id">{{state.users[x].name}} </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-4">
           <div class="card" >
                <div class="card-body">
                     <h5 class="card-title">{{this.state.users[profileView()].name+"'s"}} Completed Exercises</h5>
                    <ul class="list-group">
                        <li class="list-group-item" v-for= "x in this.state.users[profileView()].completedExercises" :key="x.id">  <b> {{x.name}} </b>
                                                                                                                                        {{x.reps}} Reps
                                                                                                                                        {{x.weight}} Lbs</li>
                    </ul>
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
                friends: [],
                profileView: null
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
        profileView: ()=> api.getProfileView(),
        userId: ()=>  api.GetUserId()
    }
}
</script>
