const expect = require('expect');
var {generateMessage} =require('./message');

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
