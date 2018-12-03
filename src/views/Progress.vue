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
    methods: {
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
        <h3>Coming Soon</h3>
        <canvas id="bmi-chart" width="800" height="400"></canvas>
    </div>
</template>
