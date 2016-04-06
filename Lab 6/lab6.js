var app = angular.module("Tweetsl6", []);

      app.controller("Tweets", function($scope, $http, $window) {
        
       $scope.loadlink = false;
       $scope.loadlinks = false;
       $scope.file = 'store.txt';
       $scope.file2 = 'convention-tweets.csv';
      	$scope.exporttype = null;

        $scope.dosomething = function(){
          $http.get("/tweets", {params:{"q":$scope.srch,"count":$scope.cnt}} )
          .then(function(response) {
              $scope.allData = response.data;
              //console.log(allData);
              
        });
          
      };
      /// Send a post request to my server with the information on which file type was selected to then export the data.
       $scope.sendData = function(){

       	  	$scope.data = { fileType: $scope.exporttype };
       	  	$scope.loadlink = !$scope.loadlink;
       		$scope.loadlinks = !$scope.loadlinks;

       	    $scope.sock = io.connect('http://localhost:3000');
        	$scope.sock.on('message', function(message) {
	        	$window.alert('The server has a message for you: ' + message);
	        	console.log(message);
    		})
        
          $http.post("/type", $scope.data)
          .then(function(response) {
            
              //console.log(allData);
             


              
        });
          
      };


      
});

