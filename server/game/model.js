class Game{
    constructor(){
        this.users = [];
    }
}
class User{
    constructor(name, id){
        this.id = id;
        this.name = name;
        this.friends = [];
        this.completedExercises = [];
    }
}
class Workout{
    constructor(name, reps, weight){
        this.id = id;
        this.name = name;
        this.reps = reps;
        this.weight = weight;
    }
}
module.exports = {User, Workout, Game}