<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a @click.prevent="login()" id="logn" class="btn btn-sm btn-primary" :class="{disabled: userid !== null}">Login</a>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/tools">Tools</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/progress">Progress</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/profile">Profile</router-link>
            </li>
        </ul>
    </nav>
</template>
<style>
#logn{
    vertical-align: -webkit-baseline-middle;
}
</style>
<script>
import * as api from "@/services/api_access" 
import * as fb from "@/services/facebook"
export default {
    data(){
        return {
            userid: null
        }
    },
    methods: {
        login(){
            fb.FBLogin()
            //api.Login(prompt("Enter your name"))
            //.then(x => this.userid = x.id)
        },
        userId(){
            let x = api.userId;
            return x;
        }

    }
}

</script>