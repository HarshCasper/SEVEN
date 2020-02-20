class Users {

    constructor(){

        this.users = [];

    }

    addUser(id, name, roomPar){

        var room = roomPar.toUpperCase();

        var user = {id,name, room};

        this.users.push(user);

        return user;
    }

    removeUser(id){

        var userFiltered = this.users.filter((user)=>user.id === id)[0];

        if(userFiltered){

            this.users = this.users.filter((user)=> user.id !== id);

        }
    
        return userFiltered;

    }

    getUser(id){

        var userFiltered = this.users.filter((user)=>user.id === id)[0];

        return userFiltered;

    }

    getUserByName(name){

        var userFiltered = this.users.filter((user)=>user.name === name)[0];

        return userFiltered;

    }

    getUserList(room){

        var usersFiltered = this.users.filter((user)=>user.room === room.toUpperCase());

        var namesArray = usersFiltered.map((user)=>user.name);

        return namesArray;

    }

    getRoomList(){

        var roomArray = this.users.map((user)=>user.room);

        return [...new Set(roomArray)]; //returns unique items

    }

   }

module.exports = {

    Users

};