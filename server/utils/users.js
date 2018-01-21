class Users {

  constructor(){
    this.users=[];
  }

  addUser(id,name,room) {
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var user = this.getUser(id);
    if(user){
      this.users= this.users.filter( user=>user.id!== id)
    }
    return user;
  }

  getUser(id){
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room){
    //get List of user by room
    var users = this.users.filter(user => user.room === room);
    var namesArrays = users.map(user=>user.name);
    return namesArrays;

  }

}

module.exports  = {Users};


// new Person can be used
// class Person {
//
//   constructor(name,age) {
//     this.name=name;
//     this.age=age;
//   }
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
//
// }
//
// var me = new Person('Shriman',24);
// console.log(me.getUserDescription());
