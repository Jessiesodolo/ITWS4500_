var express = require('express');
var app = express();


var path = require('path');
var bodyParser = require('body-parser');


var Twitter = require('twitter');
var json2csv = require('json2csv');
var fs = require('fs');
 
var client = new Twitter({
  consumer_key: 'peB2aVjUJ1VvOkIaQBJGKjeev',
  consumer_secret: 'R6L4pHsTOv8v4FbF8zeCwSyEcvmCfVsyN0jk554geVcQhCw1Nd',
  access_token_key: '346335059-9x6o4cTBVoVqRc3c9YJNyQe8IzIYZv6YEyJvunF4',
  access_token_secret: 'snl86neVlbfHLLDpJt16xGFg3LiAwGGfxxKKs3d626OYJ'
});

app.use('/', express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());

app.get('/', function(request, response){
    response.sendFile('lab6.html', {root: './'});
});

var http = require('http').Server(app);
var io = require('socket.io')(http);


var hold = [];
var cnt = 0;
var message = '';

var fs = require('fs');
app.get('/tweets', function(req,res){
    
  cnt =  Number(req.query.count);
  
  //console.log(req.query.count);
  
    client.stream('statuses/filter', {track: req.query.q}, function(stream) {
    stream.on('data', function(tweet) {
      if(cnt  > 0){
        hold.push(tweet);

       
      
      }
      else{
        stream.destroy();
        res.send(hold);
        
       }
      cnt--;

      });
    });
   
});

/// This post method is used to get me the filetype the user chose
/// The "hold" array is where all of my tweets are stored. 
app.post('/type', function(req, res) {
    //console.log(req.body);
    if (req.body.fileType == "csv") {
        fields = [ "created_at","id","text","user_id","user_name","user_screen_name","user_location","user_followers_count","user_friends_count","user_created_at","user_time_zone",
        "user_profile_background_color",
        "user_profile_image_url",
        "geo",
        "coordinates",
        "place"
      ]
        fs.stat('convention-tweets.csv', function(err, fileStat) {
            if (err) {
                if (err.code == 'ENOENT') { message = "The file exist, it's being overwritten now"; }
            } else {
                if (fileStat.isFile()) { message = "The file doesn't exist, it's being created now" ;} 
            }
        });



        json2csv({ data: hold, fields: fields }, function(err, csv) {
          if (err) console.log(err);
          fs.writeFile('convention-tweets.csv', csv, function(err) {
            if (err) throw err;
            console.log('file saved');
          });
        });



    }
    else{
          fs.stat('store.txt', function(err, fileStat) {
            if (err) {
              console.log(err);
                if (err.code == 'ENOENT') { message = "The file exist, it's being overwritten now" ; }
            } else {
                if (fileStat.isFile()) { message = "The file doesn't exist, it's being created now" ;} 
            }
        });


      for (var i = 0; i < hold.length; i++) {
         fs.writeFile('store.txt', JSON.stringify(hold[i]), function(err) {
          if (err) throw err;
        });
      };


    }

      
    res.end();
});

// Socket is used to send messages to the user about there file


io.on('connection', function (socket) { 
          socket.emit('message', message); 
  });

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});





