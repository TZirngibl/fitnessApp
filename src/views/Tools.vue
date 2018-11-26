<template>
  <div class="home">
    <div class="row" >
    <div class="col-md-4">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Body Mass Index Calculator</h5>
                    <div class="form-inline"><label for="userHeightFt">Enter Height:</label> <input class="form-control" style="margin-left: 7px" type="number" placeholder="Feet" id="userHeightFt" value="0"/>Ft <input class="form-control" style="margin-left: 30px" type="number" placeholder="Inches" id="userHeightIn" value="0"/>In</div>
                    <div class="form-inline"><label for="userWeight">Enter Weight:</label> <input class="form-control" style="margin-left: 5px" type="number" placeholder="Weight in Lbs" id="userWeight"/></div><br>
                    <div id="bmiline"><b>Your BMI:    </b><span id="finalBMI"></span></div><br>
                    <a @click.prevent="calculateBMI()" class="btn btn-primary" id="bmicalc"> Calculate BMI</a>
                    <a @click.prevent="addBMI()"  class="btn btn-success" id="addtc"> Add to Progress Chart </a>
                    
                </div>
            </div>
        </div> 
        <div class="col-md-4">
        <div class="card">
            <table id="table5" class="table table-bordered">
                <tbody>
                <tr>
                <th scope="col">
                <div><strong>BMI</strong></div>
                </th>
                <th scope="col"><strong>Weight Status</strong></th>
                </tr>
                <tr>
                <td>Below 18.5</td>
                <td>Underweight</td>
                </tr>
                <tr>
                <td>18.5 – 24.9</td>
                <td>Normal or Healthy Weight</td>
                </tr>
                <tr>
                <td>25.0 – 29.9</td>
                <td>Overweight</td>
                </tr>
                <tr>
                <td>30.0 and Above</td>
                <td>Obese</td>
                </tr>
                </tbody>
            </table> 
        </div>
        </div> 
        </div>
    </div>
</template>

<style>
#addtc{
  float : right;
}
#bmicalc{
  float : left;
}
#bmiline{
    text-align: center;
}
#userHeightFt{
    width: 75px;
}
#userHeightIn{
    width: 75px;
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
                //.then( ()=> api.GetMyExercises(api.userid).then(x=> this.completedExercises = x) )
               }  
            },
        calculateBMI() {
            let heightft = document.getElementById("userHeightFt").value;
            let heightin = document.getElementById("userHeightIn").value;
            let weight = document.getElementById("userWeight").value;
            let height = (parseFloat(heightft)*12)
            if(heightin != 0){
                height += parseFloat(heightin)
            }
            height *= height;
            let x = weight / height;
            let y = x * 703;
            document.getElementById("finalBMI").innerHTML =  +y.toFixed(2);
            },
        userId: ()=> api.userId
    }
}

</script>
