var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var path = require('path');

// Set a stream listener for tweets matching tracking keywords


var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'peB2aVjUJ1VvOkIaQBJGKjeev',
  consumer_secret: 'R6L4pHsTOv8v4FbF8zeCwSyEcvmCfVsyN0jk554geVcQhCw1Nd',
  access_token_key: '346335059-9x6o4cTBVoVqRc3c9YJNyQe8IzIYZv6YEyJvunF4',
  access_token_secret: 'snl86neVlbfHLLDpJt16xGFg3LiAwGGfxxKKs3d626OYJ'
});

app.use('/', express.static(path.join(__dirname, '/')));

app.get('/', function(request, response){
    response.sendFile('lab5.html', {root: './'});
});



var hold = [];
var cnt = 0;
var incre = 0; 
var fs = require('fs');
app.get('/tweets', function(req,res){
    
  cnt = Number(req.query.count);
  //console.log(req.query.count);
  
    client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
    stream.on('data', function(tweet) {
      if(cnt  > 0){
        hold.push(tweet);

        fs.writeFile('store.txt', JSON.stringify(tweet), function(err) {
          if (err) throw err;
        });
      



      }

      
      else{
        stream.destroy();
        res.send(hold);
        
       }
      cnt--;

      //console.log(cnt);
      });
    });
   
    
  
    
    //stream.on('error', function(error) {
      //throw error;
    
  //});


});
  
//twitterStreamClient.on('tweet', function(tweet) {
    //console.log(tweet);
//});



//var stream = client.stream('statuses/sample')

//stream.on('tweet', function (tweet) {
  //console.log(tweet)
//})
//client.get(path, params, callback);




//app.set("view options", {layout: false});
    //app.use(express.static(__dirname));
    //app.use(app.router);



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


