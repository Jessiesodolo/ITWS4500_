$(document).ready(function() {

  

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    error('not supported');
  }



  function success(pos) {
    var lat =  pos.coords.latitude;
    var lon =  pos.coords.longitude;
     //console.log(crd.latitude);
     //console.log(crd.longitude);

    getData(lat,lon);
    getforecast(lat,lon);
    
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
      

  function getData(lat,lon){
       var weatherData = {};
       var mainData = {};
       var windData = {};
       var place = '';
       var count = 0;
      

      $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat + "&lon=" + lon + "&appid=daf3262ac4d75951a6aba40a261c9923",
        dataType: "json",
        success: function(Data, status){
         
          $.each(Data, function(i, value) {
           // console.log(Data);
           place = Data.name;
          $.extend(weatherData, Data.weather[0]);
          $.extend(mainData, Data.main);
          $.extend(windData, Data.wind);

         // console.log(weatherData);
          // console.log(windData);
          // console.log(mainData);
          

           //console.log(place); 
           //pass "name" using name

           count += 1;
           if (count == 1){
            return false;
           }
             //console.log(count);
            });
          postToday(weatherData, mainData, windData, place);
          //console.log(place);

         
          
        }, error: function(msg) {
                // there was a problem
          alert("There was a problem: " + msg.status + " " + msg.statusText);
        }

    });

  };

///==============================================================================================
//// Five day forecast cal

    
function getforecast(lat,lon){
  var d = new Date();
    var mon = d.getMonth() +1 ;
    var day = d.getDate();
    var yr = d.getFullYear();
    var currentdate = "";
    var entry = 0;
    var dt = '';
    var cnt = 0;
    var num;

    var morning = [];
    var afternoon = [];
    var evening = [];



    if(mon < 10 && day < 10){ currentdate +=   yr + "-" + "0" + mon + "-" + "0" + day; }
    if(mon < 10 && day > 10 ){ currentdate +=  yr + "-" + "0" + mon + "-"  + day;     }
    if(mon > 10 && day < 10 ){ currentdate +=   yr + "-"  + mon + "-" + "0"  + day;  }

    //console.log(currentdate);
            
   $.ajax({
          type: "GET",
          url: "http://api.openweathermap.org/data/2.5/forecast?lat="+lat + "&lon=" + lon + "&appid=7cef3c7896da16cadc047625f4813827",
          dataType: "json",
          success: function(Data, status){
           
            $.each(Data, function(i, value) {
              //console.log(Data.list);
              while (entry < 40 ) {
                 dt = Data.list[entry].dt_txt;
                 num = dt.search(currentdate);
                 //console.log(currentdate);
                 
                 
                 /// If it's not today's date
                if(num == -1){

                  if( dt.search("09:00:00") > -1){
                    morning.push(Data.list[entry].dt_txt);
                    morning.push(Data.list[entry].main.temp);
                    morning.push(Data.list[entry].weather[0].description);
                  }

                  if( dt.search("15:00:00") > -1){
                    afternoon.push(Data.list[entry].dt_txt);
                    afternoon.push(Data.list[entry].main.temp);
                    afternoon.push(Data.list[entry].weather[0].description);
                  }


                  if( dt.search("18:00:00") > -1){
                    evening.push(Data.list[entry].dt_txt);
                    evening.push(Data.list[entry].main.temp);
                    evening.push(Data.list[entry].weather[0].description);

                  }


                }


                 entry++;
              }
                 
             
             //console.log(place); 
             //pass "name" using name

             cnt += 1;
             if (cnt == 1){
              return false;
             }
               //console.log(count);
              });
            
            console.log(morning);

           postForecast(morning, afternoon, evening);
            
          }, error: function(msg) {
                  // there was a problem
            alert("There was a problem: " + msg.status + " " + msg.statusText);
          }

      });


};



function postToday(obj, obj1, obj2, town){
  var d = new Date();
  $("#Town").html(" " + town + ", NY Weather");
  $("#currentday").html(weekDay(d));
  $("#degree").html( Math.floor(( obj1.temp  - 273.15)* 1.8000) + "&#8457" );
  $("#des").html("Weather can be described as " + obj.main);
  var min = Math.floor(( obj1.temp_min  - 273.15)* 1.8000);
  var max = Math.floor(( obj1.temp_max  - 273.15)* 1.8000);

  $("#details").append("<li>" + "Wind" + "&nbsp" +  "&nbsp" + "&nbsp" + "&nbsp" + obj2.speed + "mph" + "</li>");
  $("#details").append("<li>" + "Humidity" + "&nbsp" +  "&nbsp" + "&nbsp" + "&nbsp" + obj1.humidity + "</li>");
  $("#details").append("<li>" + "Pressure" + "&nbsp" +  "&nbsp" + "&nbsp" + "&nbsp" + obj1.pressure + "in" + "&#8593" + " </li>");
  $("#details").append("<li>" + "High" + "&nbsp" +  "&nbsp" + "&nbsp" + "&nbsp" + max + "&#8457" + "</li>");
  $("#details").append("<li>" + "Low" + "&nbsp" +  "&nbsp" + "&nbsp" + "&nbsp" + min + "&#8457" + "</li>");

  document.getElementById("details").style.listStyleType = 'none';
  document.getElementById("degree").style.fontSize  = 'large';
  document.getElementById("des").style.fontSize = 'large';

};


function postForecast(obj, obj1, obj2){
  
  $("#moreinfo").append("<li>" + "<h2>" + weekDay(obj[0]) + "" + "</h2>"  +  "Morning: " + tempConvert(obj[1]) + "&#8457" +  "&nbsp" + "Afternoon: " + tempConvert(obj1[1]) + "&#8457" + "&nbsp" + "Evening: " + tempConvert(obj2[1]) + "&#8457"  + "</li>" );
  $("#moreinfo").append("<li>" + "<h2>" + weekDay(obj[3]) + "" + "</h2>"  +  "Morning: " + tempConvert(obj[4]) + "&#8457" +  "&nbsp" + "Afternoon: " + tempConvert(obj1[4]) + "&#8457" + "&nbsp" + "Evening: " + tempConvert(obj2[4]) + "&#8457" + "</li>" );
  $("#moreinfo").append("<li>" + "<h2>" + weekDay(obj[6]) + "" + "</h2>"  +  "Morning: " + tempConvert(obj[7]) + "&#8457" +  "&nbsp" + "Afternoon: " + tempConvert(obj1[7]) + "&#8457" + "&nbsp" + "Evening: " + tempConvert(obj2[7]) + "&#8457" + "</li>" );
  $("#moreinfo").append("<li>" + "<h2>" + weekDay(obj[9]) + "" + "</h2>"  +  "Morning: " + tempConvert(obj[10]) + "&#8457" +  "&nbsp" + "Afternoon: " + tempConvert(obj1[10]) + "&#8457" + "&nbsp" + "Evening: " + tempConvert(obj2[10]) + "&#8457" + "</li>");
  $("#moreinfo").append("<li>" + "<h2>" + weekDay(obj[12]) + "" + "</h2>"  +  "Morning: " + tempConvert(obj[13]) + "&#8457" +  "&nbsp" + "Afternoon: " + tempConvert(obj1[13]) + "&#8457" + "&nbsp" + "Evening: " + tempConvert(obj2[13]) + "&#8457" + "</li>" );


 $("#moreinfo li").addClass("list-group-item");

};


function weekDay(str){
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";



  var hold = new Date(str);
  var day = hold.getDay(); 

  return weekday[day]; 

}

function tempConvert(num1){
  return Math.floor(( num1  - 273.15)* 1.8000);
}


});