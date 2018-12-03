<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link @click.native="login" id="logn" class="btn btn-sm btn-primary" :to="'/home'" :class="{disabled: userId() !== null}">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/home">Home</router-link>
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
            <li class="nav-item">
                <router-link @click.native="logout" id="logout" class="btn btn-sm btn-danger" :to="'/'">Log Out</router-link>
            </li>
        </ul>
    </nav>
</template>
<style>
#logn{
    vertical-align: -webkit-baseline-middle;
}
#logout{
    vertical-align: -webkit-baseline-middle;
    margin-left: 1000%;
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
        },
        userId(){
            let x = api.userId;
            return x;
        },
        logout(){
            //let x = api.getAT(this.userid)
            fb.FBLogout();
            alert("You have logged out!");
        }

    }
}

</script>