const {Users} =  require('./users');
const expect = require('expect');




describe('Users', () => {
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users=[{id:'1',name:'Mike',room:'Node Course'},
                 {id:'2',name:'Jen',room:'React Course'},
                 {id:'3',name:'Julse',room:'Node Course'}];
  })

  it('should add new user',()=>{
    var users = new Users();
    var user = {id:'1001',name:'Shriman',room:'The Office Fans'};
    var res = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for node course',()=>{
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike','Julse']);
  });

  it('should return names for react course',()=>{
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });

  it('should remove  user',()=>{
    var userId = '1';
    var user =  users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user',()=>{
    var userId = '4';
    var user =  users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find  user',()=>{
    var userId='2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find user',()=>{
    var userId='4';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

});
