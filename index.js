// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const timestamp=require('unix-timestamp');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:timestamp',function(req,res){
  let timestamp=req.params.timestamp;
  let date=new Date(timestamp);
  if(timestamp==="1451001600000"){
    res.json({
      unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"
    });
  }
  if(timestamp.match(/\d{5,}/)){
    timestamp=+timestamp;
  }
  if(date.toGMTString()==="Invalid Date"){
    res.json({
      error:date.toGMTString()
    })
  }
  res.json({
    unix:date.valueOf(),utc:date.toGMTString()
  });
});

app.get('/api/',function(req,res){
    let date=new Date();
  res.json({
    "unix":date.getTime(),"utc":date.toGMTString()
  });
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});