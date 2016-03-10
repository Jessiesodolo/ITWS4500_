
var app = angular.module("Tweetsl5", []);

      app.controller("Tweets", function($scope, $http) {
        
        $scope.dosomething = function(){
          $http.get("/tweets", {params:{"q":$scope.srch,"count":$scope.cnt}} )
          .then(function(response) {
              $scope.allData = response.data;
              console.log(allData);
             

             
              
        });
          
      };
            
});




