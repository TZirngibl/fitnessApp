
class Game{
    constructor(){
        this.users = [];
    }
    login(name, fbid, access_token){
        let user = this.users.find(x=> x.fbid == fbid)
        if(!user){
            user = new User(name, this.users.length, fbid);
            this.users.push(user);
        }
        user.access_token = access_token;
        return user;
    }
}
class User{
    constructor(name, id, fbid){
        this.id = id;
        this.name = name;
        this.fbid = fbid;
        this.friends = [];
        this.access_token = null;
        this.completedExercises = [];
        this.bmiHistory = [];
    }
}
class Workout{
    constructor(id, name, reps, weight){
        this.id = id;
        this.name = name;
        this.reps = reps;
        this.weight = weight;
    }
}


module.exports = {
    User, Workout, Game
}