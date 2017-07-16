angular.module('controllers')

.controller('UserInfoController',['$scope','$rootScope','$http','$location',
        function($scope,$rootScope, $http, $location) {
      	
      	var id = $rootScope.id;
      	
      	$http.get('selectByPrimaryKey/' + id + '.do').success(function(data){
              $scope.user = data;
              alert($scope.user);
      	});
      	 
}])