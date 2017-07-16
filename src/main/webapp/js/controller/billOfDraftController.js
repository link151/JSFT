angular.module('billOfDraftController',[])

.controller('billOfDraftCtrl',['$scope','$rootScope','$http','$location','$cookies','$cookieStore',
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
	
	$scope.reloadRoute = function() {
	   $route.reload();
	}
	var modify_flag=0;
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
					}else if($scope.modify_flag==0){
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
	
	function getExportDate() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
      	if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + "" + month + "" + strDate;
        return currentdate;
    }
	
    $scope.deleteDraftById=function(){
    	var selections = $('#table').bootstrapTable('getSelections');
		var length = selections.length;
		if(length > 0){
			var ids = new Array();
			for(var i = 0; i < length; i++){
				ids[i] = selections[i].id;
			}
			var want_delete = confirm("确定删除？");
			if(want_delete == true){
				$http.post('deleteDraftById.do', ids).success(function(success){
					alert('删除成功');
					$('#table').bootstrapTable('refresh');
				}).error(function(error){
					alert('删除失败');
				});
			}
		}else{
			alert("请先选择要删除的行");
		}
		
		/*var id=$('#id').val();
//		alert("删除："+id);
		if(id!=null && id!=""){
			$http.get('deleteDraftById/'+id+'.do').success(
					function(data){
						$('#table').bootstrapTable('refresh');
//						alert("删除成功");
					}).error(function(error){
//						alert("删除数据失败");
					});
		}else{
			alert("请选择要删除的数据");
		}*/
    }
	
	$scope.draftTablename='押汇信用证'+getExportDate();
	
	$scope.exportDraftA=function(){
//    	alert("从后台导出所有押汇数据");

    	var bank="1";
    	var certificate="1";
    	var currency="1";
    	var draftAmount="1";
    	var loanDate="1";
    	var refundDate="1";
    	var contractId="1";
    	
    	bank=$("#table select:eq(0)").find('option:selected').val();
    	currency=$("#table select:eq(1)").find('option:selected').val();
    	if(bank==""){
    		bank="-1";
    	}
    	if(currency==""){
    		currency="-1";
    	}else{
    		var len = currency.length;
    		currency=currency.substr(len-3,len-1);
//    		currency_str1=currency.substr(0,len-3);
//    		currency_str2=currency.substr(len-3,len-1);
//    		alert("str1:"+str1+"\nstr2:"+str2);
    	}
    	
    	certificate=$("#table input[type='text']:eq(0)").val();
    	draftAmount=$("#table input[type='text']:eq(1)").val();
    	loanDate=$("#table input[type='text']:eq(2)").val();
    	refundDate=$("#table input[type='text']:eq(3)").val();
    	contractId=$("#table input[type='text']:eq(4)").val();
    	
    	if(certificate==""){
    		certificate="-1";
    	}
    	if(draftAmount==""){
    		draftAmount="-1";
    	}
    	if(contractId==""){
    		contractId="-1";
    	}
    	
    	if(loanDate==""){
    		loanDate="-1";
    	}
    	if(refundDate==""){
    		refundDate="-1";
    	}
    	
    	if(loanDate==""){
    		loanDate="-1";
    	}else{
    		var dateArr=loanDate.split('/');
    		loanDate=dateArr[0];
    		for(i=1;i<dateArr.length;i++){
    			loanDate=loanDate+"-"+dateArr[i];
    		}
//    		crtDate=dateArr[0]+"-"+dateArr[1]+"-"+dateArr[2];
    	}
    	if(refundDate==""){
    		refundDate="-1";
    	}else{
    		var dateArr1=refundDate.split('/');
    		refundDate=dateArr1[0];
    		for(i=1;i<dateArr1.length;i++){
    			refundDate=refundDate+"-"+dateArr1[i];
    		}
//    		crtDate=dateArr[0]+"-"+dateArr[1]+"-"+dateArr[2];
    	}
//    	alert("即将发起从后台导出所有押汇数据请求");
    	
    	$http.get('exportDraftA/'+bank+'/'+certificate+'/'+currency+'/'
    			+draftAmount+'/'+loanDate+'/'+refundDate+'/'+contractId+'.do', {responseType: 'arraybuffer'}).success(function(data){
    			var blob = new Blob([data], {type: "application/vnd.ms-excel"});
    			var objectUrl = URL.createObjectURL(blob);
    			var a = document.createElement('a');
    			document.body.appendChild(a);
    			a.setAttribute('style', 'display:none');
    			a.setAttribute('href', objectUrl);
    			a.click();
    			URL.revokeObjectURL(objectUrl);
		}).error(function(error){
			alert("从后台查询/导出数据失败");
		})
	}
	$scope.exportDraftY=function(){
//		alert("从后台导出所有benbu押汇数据");
		
		var bank="1";
		var certificate="1";
		var currency="1";
		var draftAmount="1";
		var loanDate="1";
		var refundDate="1";
		var contractId="1";
		
		bank=$("#table select:eq(0)").find('option:selected').val();
		currency=$("#table select:eq(1)").find('option:selected').val();
		if(bank==""){
			bank="-1";
		}
		if(currency==""){
			currency="-1";
		}else{
			var len = currency.length;
			currency=currency.substr(len-3,len-1);
//    		currency_str1=currency.substr(0,len-3);
//    		currency_str2=currency.substr(len-3,len-1);
//    		alert("str1:"+str1+"\nstr2:"+str2);
		}
		
		certificate=$("#table input[type='text']:eq(0)").val();
		draftAmount=$("#table input[type='text']:eq(1)").val();
		loanDate=$("#table input[type='text']:eq(2)").val();
		refundDate=$("#table input[type='text']:eq(3)").val();
		contractId=$("#table input[type='text']:eq(4)").val();
		if(certificate==""){
			certificate="-1";
		}
		if(draftAmount==""){
			draftAmount="-1";
		}
		if(contractId==""){
			contractId="-1";
		}
		
		if(loanDate==""){
			loanDate="-1";
		}
		if(refundDate==""){
			refundDate="-1";
		}
		
		if(loanDate==""){
			loanDate="-1";
		}else{
			var dateArr=loanDate.split('/');
			loanDate=dateArr[0];
			for(i=1;i<dateArr.length;i++){
				loanDate=loanDate+"-"+dateArr[i];
			}
//    		crtDate=dateArr[0]+"-"+dateArr[1]+"-"+dateArr[2];
		}
		if(refundDate==""){
			refundDate="-1";
		}else{
			var dateArr1=refundDate.split('/');
			refundDate=dateArr1[0];
			for(i=1;i<dateArr1.length;i++){
				refundDate=refundDate+"-"+dateArr1[i];
			}
//    		crtDate=dateArr[0]+"-"+dateArr[1]+"-"+dateArr[2];
		}
//    	alert($("#table select").length+"\n"+bank+"\n"+dept+"\n"+currency);
//    	alert($("#table input[type='text']").length+"\n"+goods+"\n"+contractId+"\n"+crtDate);
		
//    	{bank}/{certificate}/{currency}/{draftAmount}/{loanDate}/{refundDate}/{contractId}
		var deptId = $cookieStore.get('user').deptid;
//		alert(bank+"\n"+certificate+"\n"+currency+"\n"+deptId);
//		alert("即将发起从后台导出所有押汇数据请求");
		$http.get('exportDraftY/'+bank+'/'+certificate+'/'+currency+'/'
				+draftAmount+'/'+loanDate+'/'+refundDate+'/'+contractId+'/'+deptId+'.do', {responseType: 'arraybuffer'}).success(function(data){
					var blob = new Blob([data], {type: "application/vnd.ms-excel"});
	    			var objectUrl = URL.createObjectURL(blob);
	    			var a = document.createElement('a');
	    			document.body.appendChild(a);
	    			a.setAttribute('style', 'display:none');
	    			a.setAttribute('href', objectUrl);
	    			a.click();
	    			URL.revokeObjectURL(objectUrl);
				}).error(function(error){
					alert("从后台查询/导出数据失败");
				})
	}
	$scope.exportBillStateById = function(){
//		alert("导出：exportBillStateById");
		var $table = $('#table');
		$table.tableExport({
			type:'excel',
			fileName:$scope.draftTablename,
			escape:false
		});
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
		var deptId = $cookieStore.get('user').deptid;
//		alert("listDraftByDeptOrderByBank  " + dept);
		$http.get('listDraftByDeptOrderByBank/' + deptId + '.do').success(function(success){
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
	//根据id修改
	
	$scope.updDraftById=function(){
//		$cookieStore.put('modify_flag', 1);
		$scope.modify_flag=1;
//		alert("modify_flag:" + modify_flag);
		var draft = new Object();
		var id=$('#id').val();
		draft.id=$('#id').val();
		alert("id:"+draft.id);
		
		var url=$location.absUrl();
		var str = url.split('/');
		var path=str[5]
		if(id!=undefined && id!=null && id!=""){
			if(path=="listTradeA"){
				$location.path('updTradeApplyA/' + id);
			}else if(path=="listTradeY"){
				$location.path('updTradeApplyY/' + id);
//				alert("调到 updTradeApplyY")
			}
		}else{
			if(path=="listTradeA"){
				$location.path('/listTradeA');
			}else if(path=="listTradeY"){
				$location.path('/listTradeY');
			}
		}
	}
	
	if($location.absUrl().indexOf('updTradeApplyA')){
		var url=$location.absUrl();
		var str = url.split('/');
		var path=str[5]
		var id=str[6];

//		alert("path:"+path);
		$http.get('queryDraftById/' + id + '.do').success(function(data){
//			alert("data:" + data);
			if(data!=null && data!=undefined && data!=""){
				$('#inputNo').val(data.no);
				$('#inputBank').val(data.bank);
				$('#inputContractNo').val(data.contractid);
				$('#inputDeadline').val(data.refunddate);
//					$('#inputPaySum').val(data.contractid);
				$('#inputTradeRate').val(data.draftrate);
				$('#inputCurrency').val(data.currency);
				$('#inputTradeSum').val(data.draftamount);
				$('#inputTradeDays').val(data.draftdeadline);
				$('#inputAApply').val(data.financialdeptapply);
				$('#inputTradeDate').val(data.loandate);
			}
		})
	}
	
	$scope.updDraftA=function(){
		var draft = new Object();
		draft.id=$('#id').val();
		draft.no=$('#inputNo').val();
		draft.bank=$('#inputBank').val();
		draft.contractid=$('#inputContractNo').val();
		draft.refunddate=$('#inputDeadline').val();
		draft.draftrate=$('#inputTradeRate').val();
		draft.currency=$('#inputCurrency').val();
		draft.draftamount=$('#inputTradeSum').val();
		draft.draftdeadline=$('#inputTradeDays').val();
		draft.financialdeptapply=$('#inputAApply').val();
		
		$http.post('updateDraftByContractId.do',draft).success(function(data){
			alert("修改操作成功");
			$('#table').bootstrapTable('refresh');
		}).error(function(error){
			alert("修改操作失败");
		})
	}
	
	if($location.absUrl().indexOf('updTradeApplyY')){
//		alert("updTradeApplyY");
		var url=$location.absUrl();
		var str = url.split('/');
		var path=str[5]
		var id=str[6];
		
//		alert("path:"+path);
		$http.get('queryDraftById/' + id + '.do').success(function(data){
//			alert("data:" + data);
			if(data!=null && data!=undefined && data!=""){
				$('#inputNo').val(data.no);
				$('#inputBank').val(data.bank);
				$('#inputContractNo').val(data.contractid);
				$('#inputDeadline').val(data.refunddate);
//					$('#inputPaySum').val(data.contractid);
				$('#inputTradeRate').val(data.draftrate);
				$('#inputCurrency').val(data.currency);
				$('#inputTradeSum').val(data.draftamount);
				$('#inputTradeDays').val(data.draftdeadline);
				$('#inputYApply').val(data.businessdeptapply);
				$('#inputDepart').val(data.dept);
				$('#inputTradeDate').val(data.loandate);
			}
		})
//		alert("updTradeApplyY 2");
	}
	
	$scope.updDraftY=function(){
		var draft = new Object();
		draft.id=$('#id').val();
		draft.no=$('#inputNo').val();
		draft.bank=$('#inputBank').val();
		draft.contractid=$('#inputContractNo').val();
		draft.refunddate=$('#inputDeadline').val();
		draft.draftrate=$('#inputTradeRate').val();
		draft.currency=$('#inputCurrency').val();
		draft.draftamount=$('#inputTradeSum').val();
		draft.draftdeadline=$('#inputTradeDays').val();
		draft.financialdeptapply=$('#inputAApply').val();
		draft.dept=$('#inputDepart').val();
		
		$http.post('updateDraftByContractId.do',draft).success(function(data){
//			$cookieStore.put('modify_flag', 0);
//			modify_flag=$cookieStore.get("modify_flag");
			$scope.modify_flag=0;
			alert("修改操作成功" + $scope.modify_flag);
//			alert("modify_flag:" + modify_flag);
			$('#table').bootstrapTable('refresh');
		}).error(function(error){
			alert("修改操作失败");
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
		
//		alert("draft:" + draft.no);
		$http.post('addDraft.do',draft).success(function(data){
			$('#searchContractNo').val("");
			$('#inputNo').val("");
			$('#inputBank').val("");
			$('#inputCurrency').val("");
			$('#inputTradeSum').val("");
			$('#inputTradeRate').val("");
			$('#inputTradeDays').val("");
			$('#inputAApply').val("");
			$('#inputDeadline').val("");
			$('#inputContractNo').val("");
			$('#inputPaySum').val("");
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
		draft.loandate = $('#inputDeadline').val();
		
		draft.financialCnt = 0;
		draft.businessCnt = currBusinessCnt+1;
		draft.dept=$cookieStore.get('user').dept;
		draft.deptid=$cookieStore.get('user').deptid;
		
		$http.post('addDraft.do',draft).success(function(data){
			$('#searchContractNo').val("");
			$('#inputNo').val("");
			$('#inputBank').val("");
			$('#inputCurrency').val("");
			$('#inputTradeSum').val("");
			$('#inputTradeRate').val("");
			$('#inputTradeDays').val("");
			$('#inputDeadline').val("");
			$('#inputContractNo').val("");
			$('#inputPaySum').val("");
			
			$('#inputDepart').val("");
			$('#inputCommodity').val("");
			$('#inputCustomer').val("");
			$('#inputSum').val("");
			$('#inputYApply').val("");
			
			alert("添加业务部押汇信息成功");
		}).error(function(error){
			alert("添加业务部押汇信息失败");
		})
	}
	
	//////////////////////////////////////////////////////
	$scope.chooseOneFromList=function(){
//		alert("chooseOneFromList");
		var contractId=$('#searchContractNo').val();
		$http.get('getInfoFromBillAndAccept/' + contractId + '.do').success(function(data){
			$scope.bills=data;
//			alert("data:" + data);
			$('#table').bootstrapTable({
				url: 'getInfoFromBillAndAccept/' + contractId + '.do',
				method: 'get',
				toolbar: '#toolbar',
				striped: true,
				pagination: true,
				sortable: true,
				pageSize: 10,
				pageList: [10, 15, 25, 50, 100],
				search: true,
				showRefresh: true,
				showToggle: true,
				clickToSelect: true,
				showColumns: true,
				queryParams: 'queryParams',
			});
			$('#table').bootstrapTable('hideColumn', 'id');
//			alert("查询信息成功");
		}).error(function(error){
			alert("根据条件查询要审批的信息失败");
		})
	}
	
	$scope.choose=function(){
//		alert("从查询的信息列表中选择一条信息,然后调用queryByContractIdA");
    	var rows = $('#table').bootstrapTable('getSelections');
    	if(rows == ''){
    		$('#ok').attr('disabled',true);
    	}else{
    		$('#inputTradeDate').val(getNowFormatDate());
    		row = rows[0];
//    		alert("rows[0]:"+rows[0]);
    		$('#inputBank').val(row.bank);
			$('#inputContractNo').val(row.contractid);
			$('#inputCurrency').val(row.currency);
			$('#inputDeadline').val(getDeadline(row.paydate));		
			$('#inputPaySum').val(row.payamount);
			
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
//				alert("maxFinancialCntStr:"+maxFinancialCntStr);
				$('#inputNo').val(maxFinancialCntStr);
			}).error(function(error){
				alert("error");
			})
    	}
	}
	
	$scope.chooseOneFromListY=function(){
//		alert("chooseOneFromListYYY");
		var contractId=$('#searchContractNo').val();
		$http.get('getInfoFromBillAndAccept/' + contractId + '.do').success(function(data){
			$scope.bills=data;
//			alert("data:" + data);
			$('#table').bootstrapTable({
				url: 'getInfoFromBillAndAccept/' + contractId + '.do',
				method: 'get',
				toolbar: '#toolbar',
				striped: true,
				pagination: true,
				sortable: true,
				pageSize: 10,
				pageList: [10, 15, 25, 50, 100],
				search: true,
				showRefresh: true,
				showToggle: true,
				clickToSelect: true,
				showColumns: true,
				queryParams: 'queryParams',
			});
			$('#table').bootstrapTable('hideColumn', 'id');
//			alert("查询信息成功");
		}).error(function(error){
			alert("根据条件查询要审批的信息失败");
		})
	}
	
	$scope.chooseY=function(){
//		alert("从查询的信息列表中选择一条信息,然后调用queryByContractIdY");
    	var rows = $('#table').bootstrapTable('getSelections');
    	if(rows == ''){
    		$('#ok').attr('disabled',true);
    	}else{
    		$('#inputTradeDate').val(getNowFormatDate());
    		row = rows[0];
//    		alert("rows[0]:"+rows[0]);
//    		$('#inputTradeDate').val(getNowFormatDate());
			$('#inputBank').val(row.bank);
			$('#inputContractNo').val(row.contractid);
			$('#inputDeadline').val(getDeadline(row.paydate));
			$('#inputCurrency').val(row.currency);
			
			/*$('#inputDepart').val(row.bill.dept);
			$('#inputCommodity').val(row.bill.goods);
			$('#inputSum').val(row.bill.crtamount);
			$('#inputCustomer').val(row.bill.proxyclient);
			$('#inputPaySum').val(row.payamount);
			*/
			$('#inputDepart').val(row.bill.dept);
			$('#inputCommodity').val(row.bill.goods);
			$('#inputSum').val(row.bill.crtamount);
			$('#inputCustomer').val(row.bill.proxyclient);
			$('#inputPaySum').val(row.payamount);
			
			
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
				$('#inputNo').val(maxBusinessCntStr);
			}).error(function(error){
				alert("error");
			})
    	}
	}
	
/*	$scope.queryByContractIdA=function(){
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
				$('#inputPaySum').val("");
				alert("根据合同号查询的信用证信息不存在");
			}else{
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
					$('#inputPaySum').val(data.payamount);
			}
		}).error(function(error){
			alert("error");
		})	
	}*/
		
	/*$scope.queryByContractIdY=function(){
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
					$('#inputPaySum').val("");
					alert("根据合同号查询的信用证信息不存在");
				}else{
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
						$('#inputPaySum').val(data.payamount);
				}
			}).error(function(error){
				alert("根据合同号查询的信用证信息失败");
			});
		}*/
	
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
//				alert("将要跳转到打印预览");
				$location.path('printTradeApplyY/' + id);
			}
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