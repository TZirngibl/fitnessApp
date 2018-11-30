<style>
</style>

<script>
import * as api from '@/services/api_access';
import Chart from 'chart.js';
import ChartData from '../services/chart-data.js';

export default {
    data(){
        return {
            ChartData: ChartData,
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
        createChart(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                const myChart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
                });
            },
        userId: ()=> api.userId
    },
    mounted(){
        this.createChart('bmi-chart', this.ChartData)
    }
}
</script>

<template>
    <div class="container">
        <canvas id="bmi-chart" width="800" height="400"></canvas>
    </div>
</template>
