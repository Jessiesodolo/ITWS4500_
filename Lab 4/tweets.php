<!Doctype html>
<html>
  <head>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
      <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="lab4.css">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
     
     
  <body ng-app="Tweetsl4" ng-controller="Tweetsls">

    <div class="container">
      <div class="row">
          <div class="col-centered">
             <input type="search" ng-model="srch" class="input-medium search-query rounded" placeholder="Search here">
             <button type="submit" class="btn btn-info btn-sm" ng-click="dosomething()">
              <span class="glyphicon glyphicon-search"></span>Search
            </button>
          </div>
           
            <div class="col-md-8 pull-left mainfeed">
              <ul class="list-group" id="first">
                <li ng-repeat="val in allData" class="list-group-item" >{{ val.user.name}} <p>{{ val.text}}</p></li>
              </ul>
            </div>

            <div class="col-md-2 secondfeed">
              <ul class="list-group" id="second">
                <li ng-repeat="val in allData" class="list-group-item" ><p>{{ val.user.screen_name}}</p></li>
              </ul>
            </div>

            


      </div>


    </div>
  
   
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
    <script type="text/javascript">

      var app = angular.module("Tweetsl4", []);

      app.controller("Tweetsls", function($scope, $http) {
        $scope.dosomething = function(){
          $http.get("get_tweets.php",{params:{"q":$scope.srch}} )
          .then(function(response) {
              $scope.allData = response.data.statuses;
              console.log($scope.allData[0]);
              
          });
          
        };
            
      });


      //$http.get("get_tweets.php")

    </script>

  
  </body>
  
</html>
