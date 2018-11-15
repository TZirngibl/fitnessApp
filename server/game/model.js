
class Game{
    constructor(){
        this.users = [];
    }
}
class User{
    constructor(name, id){
        this.id = id;
        //this.fbid = fbid;
        this.name = name;
        this.friends = [];
        this.completedExercises = [];
    }
    /*login(name, fbid, access_token){
        let user = this.users.find(x=> x.fbid == fbid)
        if(!user){
            user = new User(name, )
        }
        const user = {
            id: game.users.length,
            name: req.body.name,
            friends: [],
            completedExercises: []
        }
        user.access_token = access_token;
        this.users.push(user);
        return user;
    }*/
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