// let url = require('url');
import url from 'url';
let adr = 'http://localhost:8080/default.htm?year=2017&month=february';
//Parse the address:
let q = url.parse(adr, true);

/*The parse method returns an object containing url properties*/
console.log(q.host);
console.log(q.pathname);
console.log(q.search);

/*The query property returns an object with all the querystring parameters as properties:*/
let qdata = q.query;
console.log(qdata.month);