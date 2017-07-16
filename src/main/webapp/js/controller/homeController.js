angular.module('homeController',['ngCookies'])

.controller('homeCtrl',['$scope','$rootScope','$http','$location','$cookies','$cookieStore','$route',
    function($scope,$rootScope, $http, $location,$cookies,$cookieStore,$route) {
	$('#loginError').hide();
	if($cookieStore.get('user') != null && $cookieStore.get('user') != undefined){
		$rootScope.username=$cookieStore.get('user').username;
		$rootScope.role=$cookieStore.get('user').role;
		$rootScope.dept=$cookieStore.get('user').dept;
		$('#hid_deptId').val($cookieStore.get('user').deptid);
		$('#id').val($rootScope.deptId);
//		alert($rootScope.dept);
	}else{
		$location.path('/home');
	}
	
	if($location.absUrl().indexOf('printTradeApplyY')){
		$("body").attr("background-image","none");
		var url=$location.absUrl();
		var path=url.lastIndexOf("notice");

		if(path!=-1 && $rootScope.role=='Y'){
			$location.path('/home');
		}
	}
	
	$scope.reloadRoute = function() {
	   $route.reload();
	}
	
	$scope.click=function(){
		
		var id = 1;
		alert("主页信息controller " + id);
		
		$http.get('findByName/' + id + '.do').success(function(data){
	        $scope.user = data;
	        alert($scope.user.username + "  success");
		}).error(function(error){
			alert("error:");
		});
	}
	
	$scope.queryByUsername=function(){
		var username=$rootScope.username;
		$http.get('queryByUsername/' + username + '.do').success(function(success){
			$scope.user = success;
			alert("success");
		}).error(function(error){
			alert("error");
		})
	}
	
	$scope.addUser=function(){
		$http.post('addUser.do',$scope.user).success(function(success){
	    	alert("success");
	    }).error(function(error){
	    	alert("error");
	    });
	}
	
	$scope.queryLogin=function(){
		var username=$scope.user.username;
		var password=$scope.user.password;
		$http.get('queryLogin/' + username + '/' + password + '.do').success(function(success){
			if(success.username!=undefined){
				$scope.user = success;
				$cookieStore.put('user', success);
				$('#hid_dept').val(success.dept);
				if(success.role == 'Y'){
					$location.path('/addCredit');
				}else{
					$location.path('/notice');
				}
				
			}else{
				alert("用户名或者密码错误！")
				$('#loginError').show();
			}
		}).error(function(error){
			alert("error");
		})
	}
	
	$scope.logout=function(){
		alert("用户" + $rootScope.username  + "退出系统!!!");
		$rootScope.username=null;
		$cookieStore.remove('user');
		$location.path('/home');
	}
	
	function getrefundDate() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate()+2;
		
		
		if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
			if(strDate>31){
				strDate-=31;
				month+=1;
				if(month>12){
					month-=12;
					year+=1;
				}
			}
		}else if(month==4 || month==6 || month==9 || month==11){
			if(strDate>30){
				strDate-=30;
				month+=1;
				if(month>12){
					month-=12;
					year+=1;
				}
			}
		}else if(month==2){
			if((year%4==0 && year%100!=0) || (year%400==0)){
				if(strDate>29){
					strDate-=29;
					month+=1;
					if(month>12){
						month-=12;
						year+=1;
					}
				}
			}else{
				if(strDate>28){
					strDate-=28;
					month+=1;
					if(month>12){
						month-=12;
						year+=1;
					}
				}
			}
		}
		
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		} 
		var fundDate = year + seperator1 + month + seperator1 + strDate;
		return fundDate;
	}
	
	function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
      	if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        } 
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
	
}])