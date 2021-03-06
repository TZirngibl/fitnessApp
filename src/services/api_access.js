const api_root = "http://localhost:80/fitnessApp";
export let userId = null;
export let profileView = null;

export function GetState(){
    return myFetch(api_root + "/").then(x => {
        return x;
    });
}
export function getProfileView(){
    return profileView;
}
export function setProfileView(id){
    profileView = id;
}
export function setuserId(id){
    userId = id;
}
export function getAT(id){
    return(myFetch(api_root + "/users/"+id+"/accesstoken").then(x => {
        return x;
    }))
}
export function GetMyExercises(id){
    return(myFetch(api_root + "/users/"+id+"/completedExercises"))
}

export function GetFriends(id){
    return(myFetch(api_root + "/users/"+id+"/friends"))
}

export function GetUserId(){
    return userId;
}

export function addFriend(id1,id2){  
    return fetch(api_root + "/users/"+id1+"/addFriend/"+id2, {method: "post"})
}

export function removeFriend(id,id1){
    return fetch(api_root + "/users/"+id+"/removeFriend/"+id1, {method: "delete"})
}

export function viewProfile(id){
    return myFetch(api_root + "/users/" +id);
}

export function addWorkout(id,name,reps,weight){
    return(myFetch(api_root + "/users/"+id+"/addWorkout",{  "name"  :   name,
                                                            "reps"  :   reps,
                                                            "weight":   weight
                                                        }))
}

export function Login(name, fbid, access_token){
    return myFetch(api_root + `/users`, { name, fbid, access_token })
    .then(x=> userId = x.id);
}


function myFetch(url = ``, data = null) {
    let options = {
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
            userid: userId,
          }
    };
    if(data){
        options = { 
          ...options,
          method:  "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
              ...options.headers,
              "Content-Type": "application/json; charset=utf-8" 
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
    }
    return fetch(url, options)
    .then(response =>{
      return response.json()
    }); // parses response to JSON
}