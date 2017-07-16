angular.module('billOfDraftController',[])

.controller('billOfDraftCtrl',['$scope','$rootScope','$http','$location','$cookies','$cookieStore',
    function($scope,$rootScope, $http, $location, $cookies, $cookieStore) {
	
	if($cookieStore.get('user') != null && $cookieStore.get('user') != undefined){
		$rootScope.username=$cookieStore.get('user').username;
		$rootScope.role=$cookieStore.get('user').role;
		$rootScope.dept=$cookieStore.get('user').dept;
		$rootScope.deptid=$cookieStore.get('user').deptid;
		$('#hid_dept').val($rootScope.dept);
	}else{
		$location.path('/home');
	}
	
	if($location.absUrl().indexOf('printTradeApplyA')){
		var url=$location.absUrl();
		var str = url.split('/');
		var id=str[6];
		
		$http.get('queryDraftById/' + id + '.do').success(function(data){
			if(data!=null && data!=undefined && data!=""){
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
			}
		}).error(function(error){
			//alert("打印操作失败");
		})
	}
	
	if($location.absUrl().indexOf('printTradeApplyY')){
		$("body").attr("background-image","none");
		var url=$location.absUrl();
		var id=str[6];
		
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
				$http.get('getInfoFromBillAndAccept/' + data.contractid + '.do').success(function(data){
					if(data!=null && data!=undefined && data!=""){
						$scope.commodityY=data.bill.goods;
						$scope.crtamountY=data.bill.crtamount;
						$scope.proxyclientY=data.bill.proxyclient;
					}
				})
			}
		}).error(function(error){
			//alert("打印操作失败");
		})
	}
	
	var currBusinessCnt=0;
	var currFinancialCnt=0;
	$scope.listAllDraftOrderByBank=function(){
		$http.get('listAllDraftOrderByBank.do').success(function(success){
			alert("查询押汇信息列表成功");
		}).error(function(error){
			alert("查询押汇信息列表失败");
		})
	}
	
	$scope.listDraftByDeptOrderByBank=function(){
		var dept = $cookieStore.get('user').dept;
//		alert("listDraftByDeptOrderByBank  " + dept);
		$http.get('listDraftByDeptOrderByBank/' + dept + '.do').success(function(success){
			alert("查询本部门的押汇信息列表成功");
		}).error(function(error){
			alert("查询本部门的押汇信息列表失败");
		})
	}
	
	var draftrate = 0;
	$scope.queryByContractId=function(){
		contractid=$('#searchContractNo').val();
		$http.get('queryByContractIdAndState/' + contractid + '.do').success(function(data){
			if(data==null || data==undefined || data==''){
				$('#inputBank').val("");
				$('#inputCurrency').val("");
				$('#inputContractNo').val("");
				$('#inputTradeRate').val("");
				$('#inputLoanDateText').val("");
				$('#inputRepaymentDateText').val("");
				$('#inputCertificate').val("");
				alert("根据合同号查询信息不存在");
			}else{
				draftrate = data.draftrate;
				$('#inputBank').val(data.bank);
				$('#inputCurrency').val(data.currency);
				$('#inputContractNo').val(data.contractid);
				$('#inputTradeRate').val(data.draftrate);
				$('#inputLoanDateText').val(data.loandate);
				$('#inputRepaymentDateText').val(data.refunddate);
				$('#inputCertificate').val("");
				//alert("data.currency:" + data.currency);
			}
		}).error(function(error){
			alert("根据合同号查询押汇信息失败");
		})
	}
	
	//根据id锁汇
	$scope.updateDraftLockByContractId=function(){
		var draft = new Object();
		draft.id=$('#id').val();
		//draft.contractid=$('#inputExContractId').val();
		draft.lockamount = $('#inputExSum').val();
		draft.lockrate = $('#inputExRate').val();
		
		$http.post('updateDraftByContractId.do',draft).success(function(data){
			alert("锁汇操作成功");
			$('#table').bootstrapTable('refresh');
		}).error(function(error){
			alert("锁汇操作失败");
		})
	}
	
	//根据id补充数据
	$scope.updateDraftByContractIdSupple=function(){
		
		var draft = new Object();
		draft.id=$('#id').val();
		//draft.contractid=$('#inputExContractId2').val();
		draft.certificate=$('#inputCertificate').val();
		draft.draftamount = $('#inputTradeSum').val();
		draft.rmb = $('#inputTradeRMB').val();
		draft.loandate = $('#loanDateText').val();
		draft.refunddate = $('#refundDateText').val();
		
		$http.post('updateDraftByContractId.do',draft).success(function(data){
			alert("补充押汇信息成功");
			$('#table').bootstrapTable('refresh');
		}).error(function(error){
			alert("补充押汇信息失败");
		})
	}
	
	$scope.updateDraftByContractId=function(){
		var draft = new Object();
		draft.contractid=$('#searchContractNo').val();
		draft.certificate=$('#inputCertificate').val();
		draft.draftamount = $('#inputTradeSum').val();
		draft.rmb = $('#inputTradeRMB').val();
		draft.loandate = $('#loanDateText').val();
		draft.refunddate = $('#refundDateText').val();
		
		$http.post('updateDraftByContractId.do',draft).success(function(data){
			alert("录入押汇补充信息成功");
			$('#table').bootstrapTable('refresh');
		}).error(function(error){
			alert("录入押汇补充信息失败");
		})
	}
	
	$scope.addDraftA=function(){
		var draft = new Object();
		draft.contractid=$('#searchContractNo').val();
		draft.no=$('#inputNo').val();
		draft.bank = $('#inputBank').val();
		draft.currency = $('#inputCurrency').val();
		draft.draftamount = $('#inputTradeSum').val();
		draft.draftrate = $('#inputTradeRate').val();
		draft.draftdeadline = $('#inputTradeDays').val();
		draft.financialdeptapply = $('#inputAApply').val();
		draft.loandate = $('#inputDeadline').val();
		
		draft.financialCnt = currFinancialCnt+1;
		draft.businessCnt = 0;
		draft.dept=$cookieStore.get('user').dept;
		draft.deptid=$cookieStore.get('user').deptid;
		
		alert("draft:" + draft.no);
		$http.post('addDraft.do',draft).success(function(data){
			alert("添加本部押汇信息成功");
		}).error(function(error){
			alert("添加本部押汇信息失败");
		})
	}
	
	$scope.addDraftY=function(){
		var draft = new Object();
		draft.contractid=$('#searchContractNo').val();
		draft.no=$('#inputNo').val();
		draft.bank = $('#inputBank').val();
		draft.currency = $('#inputCurrency').val();
		draft.draftamount = $('#inputTradeSum').val();
		draft.draftrate = $('#inputTradeRate').val();
		draft.draftdeadline = $('#inputTradeDays').val();
		draft.businessdeptapply = $('#inputYApply').val();
		draft.financialCnt = 0;
		draft.businessCnt = currBusinessCnt+1;
		draft.dept=$cookieStore.get('user').dept;
		draft.deptid=$cookieStore.get('user').deptid;
		
		$http.post('addDraft.do',draft).success(function(data){
			alert("添加业务部押汇信息成功");
		}).error(function(error){
			alert("添加业务部押汇信息失败");
		})
	}
	
	//////////////////////////////////////////////////////
	$scope.queryByContractIdA=function(){
		var contractId=$('#searchContractNo').val();
		var maxFinancialCntStr="";
		var maxFinancialCnt=1;
		var date=new Date();
		var year = date.getFullYear();
		$http.get('getMaxFinancialCnt.do').success(function(data){
			if(data!=null && data!=undefined && data!=''){
				maxFinancialCnt = parseInt(data)+1;
				currFinancialCnt= parseInt(data);
			}
			if(maxFinancialCnt<10){
				maxFinancialCntStr = year+"CWB00" + maxFinancialCnt;
			}else if(maxFinancialCnt<100){
				maxFinancialCntStr = year+"CWB0" + maxFinancialCnt;
			}else if(maxFinancialCnt<1000){
				maxFinancialCntStr = year+"CWB"+ maxFinancialCnt;
			}
		}).error(function(error){
			alert("error");
		})
		
		$http.get('getInfoFromBillAndAccept/' + contractId + '.do').success(function(data){
			$scope.accept = data;
			if(data==null || data==undefined || data==''){
				$scope.accept = data;
				$('#inputTradeDate').val("");
				$('#inputNo').val("");
				$('#inputBank').val("");
				$('#inputContractNo').val("");
				$('#inputDeadline').val("");
				$('#inputCurrency').val("");
				$('#inputTradeSum').val("");
				$('#inputTradeRate').val("");
				$('#inputTradeDays').val("");
				$('#inputAApply').val("");
				alert("根据合同号查询的信用证信息不存在");
			}else{
				if(data.dept==$rootScope.dept||$rootScope.role=='A'||$rootScope.role=='B'){
					if(data.registerdate == null && $('#inputRegister').val()!= null){
						data.registerdate = $('#inputRegister').val();
					}
					$scope.accept = data;
					$('#inputTradeDate').val(getNowFormatDate());
					$('#inputNo').val(maxFinancialCntStr);
					$('#inputBank').val(data.bank);
					$('#inputContractNo').val(data.contractid);
					$('#inputCurrency').val(data.currency);
					$('#inputDeadline').val(getDeadline(data.paydate));							
				}else{
					alert("您无权查看此合同信息");
				}
			}
		}).error(function(error){
			alert("error");
		})	
	}
		
	$scope.queryByContractIdY=function(){
		var contractId=$('#searchContractNo').val();
		var maxBusinessCntStr="";
		var maxBusinessCnt=1;
		var date=new Date();
		var year = date.getFullYear();
		$http.get('getMaxBusinessCnt.do').success(function(data){
			if(data!=null && data!=undefined && data!=''){
				maxBusinessCnt = parseInt(data)+1;
				currBusinessCnt= parseInt(data);
			}
			if(maxBusinessCnt<10){
				maxBusinessCntStr = year + "000" + maxBusinessCnt;
			}else if(maxBusinessCnt<100){
				maxBusinessCntStr = year + "00" + maxBusinessCnt;
			}else if(maxBusinessCnt<1000){
				maxBusinessCntStr = year + "0" + maxBusinessCnt;
			}
		}).error(function(error){
			alert("error");
		})
		
		$http.get('getInfoFromBillAndAccept/' + contractId + '.do').success(function(data){
			if(data==null || data==undefined || data==''){
					$('#inputTradeDate').val("");
					$('#inputNo').val("");
					$('#inputBank').val("");
					$('#inputContractNo').val("");
					$('#inputDeadline').val("");
					$('#inputCurrency').val("");
					
					$('#inputDepart').val("");
					$('#inputCommodity').val("");
					$('#inputSum').val("");
					$('#inputCustomer').val("");
					
					$('#inputTradeSum').val("");
					$('#inputTradeRate').val("");
					$('#inputTradeDays').val("");
					$('#inputYApply').val("");
					alert("根据合同号查询的信用证信息不存在");
				}else{
					if(data.dept==$rootScope.dept||$rootScope.role=='A'||$rootScope.role=='B'){
						if(data.registerdate == null && $('#inputRegister').val()!= null){
							data.registerdate = $('#inputRegister').val();
						}
						$scope.accept = data;
						$('#inputTradeDate').val(getNowFormatDate());
						$('#inputNo').val(maxBusinessCntStr);
						$('#inputBank').val(data.bank);
						$('#inputContractNo').val(data.contractid);
						$('#inputDeadline').val(getDeadline(data.paydate));
						$('#inputCurrency').val(data.currency);
						
						$('#inputDepart').val(data.bill.dept);
						$('#inputCommodity').val(data.bill.goods);
						$('#inputSum').val(data.bill.crtamount);
						$('#inputCustomer').val(data.bill.proxyclient);
					}else{
						alert("您无权查看此合同信息");
					}
				}
			}).error(function(error){
				alert("根据合同号查询的信用证信息失败");
			});
		}
	
		$scope.printDraftA=function(){
			var id=$('#id').val();
			$location.path('printTradeApplyA/' + id);
		}
		
		$scope.printDraftY=function(){
			var id=$('#id').val();
			$location.path('printTradeApplyY/' + id);
		}
		
		$scope.print = function(){
			window.print();
		}
	
/////////////////////////////////////////////////////
	
	function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "/";
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
	
	function getDeadline(timeStr) {
		var date = strToTime(timeStr);
		var seperator1 = "/";
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
	
	function getNumber() {
		var date = new Date();
		var seperator1 = "/";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		} 
		var number = year + "" + month + "" + strDate;
		return number;
	}
	
    function strToTime(timeStr) {
        var seperator1 = "/";
        if(timeStr){
            var str = timeStr.split(seperator1);
            if (3 === str.length){
                var year = parseInt(str[0]);
                var month = parseInt(str[1])-1;
                var date = parseInt(str[2]);
                var time = new Date(year,month,date);
                return time;
            }
        }
    }
      	 
}])