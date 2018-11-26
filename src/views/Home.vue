<template>
  <div class="home">
    <h1>{{this.state.users[userId()].name+"'s"}} Timeline: </h1>
    <div class="row" >
    <div class="col-md-4">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Suggested Friends(Online Users)</h5>
                    <ul class="list-group">
                        <li class="list-group-item" v-for= "user in state.users" :key="user.id">{{user.name}} <a @click.prevent="addFriend(user.id)" id="friendbuttons" class="btn btn-sm btn-primary">Add Friend</a> </li>
                    </ul>
                </div>
            </div>
        </div>
<div class="col-md-4">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">{{this.state.users[userId()].name+"'s"}} Friends</h5>
                    <ul class="list-group">
                        <li class="list-group-item" v-for= "x in state.friends" :key="x.id">{{state.users[x].name}} <a @click.prevent="removeFriend(x)" id="friendbuttons" class="btn btn-sm btn-danger">Remove Friend</a> 
                                                                                                                    <a @click.prevent="viewProfile(x)" id="friendbuttons" class="btn btn-sm btn-success">View Profile</a> </li>
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
               }  
            },  
        getExercises(id){
            let x = api.GetMyExercises(id)
            console.log(x)
            return x
        },
        getFriends(id){
          let x = api.GetFriends(id)
          return JSON.parse(x)
        },
        addFriend(id){
          this.state.friends.push(id)
          api.addFriend(api.userId,id)
          //console.log(api.userId + " added " + id)
        },
        removeFriend(id){
            api.removeFriend(api.userId,id)
            //console.log(api.userId + " removed " + id)
        },
        viewProfile(id){
            let x = api.viewProfile(id);
            console.log(x)
        },
        userId: ()=> api.userId
    }
}

</script>
