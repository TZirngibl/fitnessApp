<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a @click.prevent="login" class="btn btn-sm btn-primary" :class="{disabled: userId() !== null}">Login</a>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/health">Health</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/profile">Profile</router-link>
            </li>
            

        </ul>
    </nav>
</template>

<style>
</style>


<script>
import * as api from "@/services/api_access" 
//import * as fb from "@/services/facebook"
export default {
    methods: {
        login(){
            //fb.FBLogin();
            api.Login(prompt("Enter your name"))
        },
        userId(){
            let x = api.userId;
            return x;
        }

    }
}

</script>