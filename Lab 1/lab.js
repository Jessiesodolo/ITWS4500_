$(document).ready(function() {

    var userdata ="";
    var t2 ="";
    var screenm ="";
    var displayAmt = 5;
    var col1 = [];
    var col2 = [];
   

  $.getJSON( "tweetsFromTwitter.json", function( data ) {
      

      $.each( data, function( key, val ) {
        //console.log(val.lang);
  
        userdata = '<li>' +  val.user["name"] + '<p>' + val.text + '</p>' +  '</li>';
        screenm = '<li>' + '<p>' + val.user["screen_name"] + '</p>' +  '</li>';
        if(key < 5){
           //return false;
          $("#first").append(userdata);
          $("#second").append(screenm); 
        }
        if(key >= 5){
            col1.push(userdata);
            col2.push(screenm);
        }
        
        if(key == 75){
           return false;
        }
        
      });
      $("li").addClass("list-group-item");

    var refreshId = setInterval( function() 
    {

      var hold = col1.shift();
      $("#first").prepend(hold);
      $("li").addClass("list-group-item");
      $("#first li:first-child").hide();
      $("#first li:last-child").remove();     
      $("#first li:first-child").slideDown(600);


      var hold1 = col2.pop();
      $("#second").append(hold1);
      $("li").addClass("list-group-item");
      $("#second li:last-child").hide();
      $("#second li:first-child").slideUp(600,function(){
          $("#second li:first-child").remove(); 
      });
          
      $("#second li:last-child").slideDown();


      
    }, 5000); 
     //console.log($("#first li:last-child").remove());
  });


  
    

});





