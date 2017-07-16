angular.module('billOfPrintDraftController',[])

.controller('billOfPrintDraftCtrl',['$scope','$rootScope','$http','$location','$cookies','$cookieStore',
    function($scope,$rootScope, $http, $location, $cookies, $cookieStore) {
//	$cookieStore.put("modify_flag",0);
	if($cookieStore.get('user') != null && $cookieStore.get('user') != undefined){
		$rootScope.username=$cookieStore.get('user').username;
		$rootScope.role=$cookieStore.get('user').role;
		$rootScope.dept=$cookieStore.get('user').dept;
		$rootScope.deptid=$cookieStore.get('user').deptid;
		$('#hid_dept').val($rootScope.dept);
		$('#hid_deptId').val($rootScope.deptid);
	}else{
		$location.path('/home');
	}
	
	if($location.absUrl().indexOf('printTradeApplyA')){
		$("body").attr("background-image","none");
		var url=$location.absUrl();
		var str = url.split('/');
		var path=str[5];
		var id=str[6];
//		if($cookieStore.get('modify_flag') != null && $cookieStore.get('modify_flag') != undefined){
//			modify_flag=$cookieStore.get('modify_flag');
////			alert("预览：" + modify_flag);
//		}
		
//		alert("id:" + id);
		if(id!=undefined && id!=null && id!=""){
			$http.get('queryDraftById/' + id + '.do').success(function(data){
//				alert("data:" + data);
				if(data!=null && data!=undefined && data!=""){
					if(data.financialCnt!=0 || data.deptid=="200" || data.deptid==null || data.deptid == ''){
//						alert("data.financialCnt: " + data.financialCnt);
						$scope.draft = data;
						$scope.printDate=getNowFormatDate();
						$scope.no=data.no;
						$scope.bank=data.bank;
						$scope.contractid=data.contractid;
						$scope.loandate=data.loandate;
						$scope.currency=data.currency;
						$scope.draftrate=data.draftrate;
						$scope.draftamount=data.draftamount;
						$scope.draftdeadline=data.draftdeadline;
						$scope.financialdeptapply=data.financialdeptapply;
					}else{
//						alert("data.businessCnt: " + data.businessCnt);
//						alert("在这里跳到了打印预览:" + path)
						$location.path('printTradeApplyY/' + id);
					}
				}
			}).error(function(error){
				alert("打印操作失败");
			})
		}else if(path=="billOfDraft"){
			if($rootScope.role=='A'){
				$location.path('/listTradeA');
			}else if($rootScope.role=='B'){
				$location.path('/listTradeA');
			}else if($rootScope.role=='Y'){
				$location.path('/listTradeY');
			}
		}
	}
	
	if($location.absUrl().indexOf('printTradeApplyY')){
		$("body").attr("background-image","none");
		var url=$location.absUrl();
		var str = url.split('/');
		var id=str[6];
		if(id!=undefined && id!=null && id!=""){
			$http.get('queryDraftById/' + id + '.do').success(function(data){
				if(data!=null && data!=undefined && data!=""){
					$scope.draft = data;
					$scope.printDateY=getNowFormatDate();
					$scope.no=data.no;
					$scope.bankY=data.bank;
					$scope.contractidY=data.contractid;
					$scope.loandateY=data.loandate;
					$scope.currencyY=data.currency;
					$scope.draftrateY=data.draftrate;
					$scope.draftamountY=data.draftamount;
					$scope.draftdeadlineY=data.draftdeadline;
					$scope.businessdeptapply=data.businessdeptapply;
					$scope.deptY=data.dept;
					
					$http.get('getInfoFromBillAndAccept/' + data.contractid + '.do').success(function(data1){
						if(data1!=null && data1!=undefined && data1!=''){
							$scope.commodityY=data1[0].bill.goods;
							$scope.crtamountY=data1[0].bill.crtamount;
							$scope.proxyclientY=data1[0].bill.proxyclient;
						}
					})
				}
			}).error(function(error){
				alert("打印操作失败");
			})
		}else if(path=="billOfDraft"){
			if($rootScope.role=='A'){
				$location.path('/listTradeA');
			}else if($rootScope.role=='B'){
				$location.path('/listTradeA');
			}else if($rootScope.role=='Y'){
				$location.path('/listTradeY');
			}
		}
	}
	
	$scope.printDraftA=function(){
		var id=$('#id').val();
		if(id==undefined || id==null || id==""){
			alert("请选择一条需要预览的信息");
		}else{
			$location.path('printTradeApplyA/' + id);
		}
	}
	
	$scope.printDraftY=function(){
		var id=$('#id').val();
		if(id==undefined || id==null || id==""){
			alert("请选择一条需要预览的信息");
		}else{
//			alert("将要跳转到打印预览");
			$location.path('printTradeApplyY/' + id);
		}
	}
	
	$scope.print = function(){
		window.print();
	}

}])