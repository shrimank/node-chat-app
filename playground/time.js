var moment =  require('moment');

//var date = new moment();
//date.add(100,'year').subtract(9,'months');
//console.log(date.format('MMM Do,YYYY'));

var createdAt = new Date().getTime();
var someTimestamp =  moment().valueOf();
console.log(someTimestamp);
var date = new moment(someTimestamp);
console.log(date.format('hh:mm A'));
