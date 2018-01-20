const expect = require('expect');
var {generateMessage,generateLocationMessage} =require('./message');

describe('generateMessage',()=>{

  it('should generate correct message object',()=>{
    var from = "Shriman";
    var text = "Hello from shrimankumbar";
    var res  = generateMessage(from,text);
      // expect(res.from).toBe(from);
      // expect(res.text).toBe(text);
      expect(res).toInclude({from,text});
      expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage',()=>{

  it('should generate correct location object',()=>{
    var from ="Shriman";
    var lat = 15;
    var lng = 23;
    var url = 'https://www.google.com/maps?q=';
    var message =  generateLocationMessage(from,lat,lng);
    expect(message.url).toBe(`${url}${lat},${lng}`);
    expect(message.from).toBe(from);

  });
});
