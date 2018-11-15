const Joi = require('joi');
const express = require('express');
const {Game, Workout, User} = require('./model');
const app = express.Router();
app.use(express.json());

let game = new Game();
let workouts = 1;

app.get('/users/:id/friends', (req,res) => {
    const user = game.users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('404: The user with the given id was not found.');

    for (let i=0; i < user.friends.length;i++){
        console.log(req.params.id + "friends are:")
        const friend = game.users.find(c => c.id === parseInt(user.friends[i]));
        console.log(i + "  " + friend.name)
    }
    res.send(user.friends);
})

//ADD FRIEND, 
//USER DOING THE ADD IS ID.
// ND USER TO BE ADDED IS FRIENDSID 
app.post('/users/:id/addFriend/:friendsId', (req,res) => {
    const user = game.users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('404: The user with the given id was not found.');

    user.friends.push(req.params.friendsId)
    res.send(req.params.friendsId + "added as a friend")
})

//DISPLAY COMPLETED EXERCISES FOR USER ID IN URL
app.get('/users/:id/completedExercises', (req,res) => {
    const user = game.users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('404: The user with the given id was not found.');
    res.send(user.completedExercises);
})

//ADD WORKOUT TO USER ID IN URL
app.post('/users/:id/addWorkout', (req,res) => {
    const user = game.users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('404: The user with the given id was not found.');

    const { error } = validateWorkout(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let workout = new Workout(workouts++, req.body.name, req.body.reps, req.body.weight)
    user.completedExercises.push(workout);
    res.send(workout);
})

//ROOT OF SERVER
app.get('/', (req,res) => {
    res.send(game.users)
})

//GET ALL USERS AND WORKOUTS
app.get('/users', (req,res) => {
    res.send(game.users);
})

//GET SPECIFIC USER AND WORKOUTS
app.get('/users/:id', (req,res) => {
    const user = game.users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('404: The user with the given id was not found.');
    res.send(user);
});

//CREATE 
app.post('/users', (req,res) => {

    //Joi Validation
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let user = new User(req.body.name, game.users.length)

    game.users.push(user);
    res.send(user);
});

//UPDATE
app.put('/users/:id', (req,res) => {
    //look up the user
    //if not existing, return 404
    const user = game.users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('404: The user with the given id was not found.');

    //Joi Validation
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    user.name = req.body.name;
    res.send(user);

})

//DELETE
app.delete('/users/:id', (req,res) => {
    const user = game.users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('404: The user with the given id was not found.');

    const index = game.users.indexOf(user);
    game.users.splice(index, 1);

    res.send(user);
})

function validateWorkout(workout) {
    const schema = {
        name: Joi.string().required(),
        reps: Joi.required(),
        weight: Joi.required()
    };
    return Joi.validate(workout, schema);
}
function validateUser(user) {
    const schema = {
        name: Joi.string().required()
    };
    return Joi.validate(user, schema);
}


module.exports = app;