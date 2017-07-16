angular.module('crtController',[])

.controller('crtCtrl',['$scope','$rootScope','$http','$location','$filter','$cookies','$cookieStore',
    function($scope,$rootScope, $http, $location,$filter,$cookies,$cookieStore) {
    var countSubmit = 0;
    sessionStorage.countSubmit = countSubmit;

    if($cookieStore.get('user') != null && $cookieStore.get('user') != undefined){
		$rootScope.username=$cookieStore.get('user').username;
		$rootScope.role=$cookieStore.get('user').role;
		$rootScope.dept=$cookieStore.get('user').dept;
		$rootScope.deptId=$cookieStore.get('user').deptid;
		$('#hid_dept').val($rootScope.dept);
		$('#id').val($rootScope.deptId);
	}else{
		$location.path('/home');
	}
    
    
    $(document).ready(function(){
        $('#inputDate').val(getNowFormatDate());
        $('#inputDateText').val(getNowFormatDate());

        $('#creditSucMsg').hide();
        $('#creditErrMsg').hide();
        $('#searchError').hide();
    });

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

//    $('.form_date').datetimepicker({
//        language:  'zh-CN',
//        weekStart: 1,
//        todayBtn:  1,
//        autoclose: 1,
//        todayHighlight: 1,
//        startView: 2,
//        minView: 2,
//        forceParse: 0
//    });
    
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
    
    $scope.exportCheckBill=function(){
    	//alert("从后台导出数据");
    	var bank="1";
    	var dept="1";
    	var currency="1";
    	var goods="1";
    	var contractId="1";
    	var crtDate="1";
    	
    	bank=$("#table select:eq(0)").find('option:selected').val();
    	dept=$("#table select:eq(1)").find('option:selected').val();
    	currency=$("#table select:eq(2)").find('option:selected').val();
    	if(bank==""){
    		bank="-1";
    	}
    	if(dept==""){
    		dept="-1";
    	}
    	if(currency==""){
    		currency="-1";
    	}else{
    		var len = currency.length;
    		currency=currency.substr(len-3,len);
//    		currency_str1=currency.substr(0,len-3);
//    		currency_str2=currency.substr(len-3,len-1);
//    		alert("str1:"+str1+"\nstr2:"+str2);
    	}
    	
    	goods=$("#table input[type='text']:eq(0)").val();
    	contractId=$("#table input[type='text']:eq(1)").val();
    	crtDate=$("#table input[type='text']:eq(2)").val();
    	if(goods==""){
    		goods="-1";
    	}
    	if(contractId==""){
    		contractId="-1";
    	}
    	if(crtDate==""){
    		crtDate="-1";
    	}else{
    		var dateArr=crtDate.split('/');
    		crtDate=dateArr[0];
    		for(i=1;i<dateArr.length;i++){
    			crtDate=crtDate+"-"+dateArr[i];
    		}
//    		crtDate=dateArr[0]+"-"+dateArr[1]+"-"+dateArr[2];
    	}
//    	alert($("#table select").length+"\n"+bank+"\n"+dept+"\n"+currency);
//    	alert($("#table input[type='text']").length+"\n"+goods+"\n"+contractId+"\n"+crtDate);
    	
    	//alert("即将发起从后台导出数据请求");
    	var deptId=$cookieStore.get('user').deptid;
		var role = $cookieStore.get('user').role;
    	if(role=='A' || role=='B'){
    		$http.get('exportCheckBill/'+bank+'/'+dept+'/'+currency+'/'
				+goods+'/'+contractId+'/'+crtDate+'.do' , {responseType: 'arraybuffer'}).success(function(data){
					var blob = new Blob([data], {type: "application/vnd.ms-excel"});
					var objectUrl = URL.createObjectURL(blob);
					var a = document.createElement('a');
				    document.body.appendChild(a);
				    a.setAttribute('style', 'display:none');
				    a.setAttribute('href', objectUrl);
				    a.click();
				    URL.revokeObjectURL(objectUrl);
				}).error(function(error){
					alert("从后台查询/导出数据失败A/B");
				})
    	}else if(role=='Y'){
    		$http.get('exportCheckBillByDeptId/'+bank+'/'+dept+'/'+currency+'/'
				+goods+'/'+contractId+'/'+crtDate+'/'+deptId+'.do', {responseType: 'arraybuffer'}).success(function(data){
					var blob = new Blob([data], {type: "application/vnd.ms-excel"});
					var objectUrl = URL.createObjectURL(blob);
					var a = document.createElement('a');
				    document.body.appendChild(a);
				    a.setAttribute('style', 'display:none');
				    a.setAttribute('href', objectUrl);
				    a.click();
				    URL.revokeObjectURL(objectUrl);
				}).error(function(error){
					alert("从后台查询/导出数据失败Y");
				})
    	}
    }
    
    $scope.exportUnCheckBill=function(){
    	//alert("从后台导出未审批数据");
    	var bank="1";
    	var dept="1";
    	var currency="1";
    	var goods="1";
    	var contractId="1";
    	var crtDate="1";
    	
    	bank=$("#table select:eq(0)").find('option:selected').val();
    	dept=$("#table select:eq(1)").find('option:selected').val();
    	currency=$("#table select:eq(2)").find('option:selected').val();
    	if(bank==""){
    		bank="-1";
    	}
    	if(dept==""){
    		dept="-1";
    	}
    	if(currency==""){
    		currency="-1";
    	}else{
    		var len = currency.length;
    		currency=currency.substr(len-3,len);
//    		currency_str1=currency.substr(0,len-3);
//    		currency_str2=currency.substr(len-3,len-1);
//    		alert("str1:"+str1+"\nstr2:"+str2);
    	}
    	
    	goods=$("#table input[type='text']:eq(0)").val();
    	contractId=$("#table input[type='text']:eq(1)").val();
    	crtDate=$("#table input[type='text']:eq(2)").val();
    	if(goods==""){
    		goods="-1";
    	}
    	if(contractId==""){
    		contractId="-1";
    	}
    	if(crtDate==""){
    		crtDate="-1";
    	}else{
    		var dateArr=crtDate.split('/');
    		crtDate=dateArr[0];
    		for(i=1;i<dateArr.length;i++){
    			crtDate=crtDate+"-"+dateArr[i];
    		}
//    		crtDate=dateArr[0]+"-"+dateArr[1]+"-"+dateArr[2];
    	}
//    	alert($("#table select").length+"\n"+bank+"\n"+dept+"\n"+currency);
//    	alert($("#table input[type='text']").length+"\n"+goods+"\n"+contractId+"\n"+crtDate);
    	
    	//alert("即将发起从后台导出数据请求");
    	var deptId=$cookieStore.get('user').deptid;
		var role = $cookieStore.get('user').role;
    	if(role=='A' || role=='B'){
    		$http.get('exportUnCheckBill/'+bank+'/'+dept+'/'+currency+'/'
				+goods+'/'+contractId+'/'+crtDate+'.do', {responseType: 'arraybuffer'}).success(function(data){
					alert("data:" + data.length);
				}).error(function(error){
					alert("从后台查询/导出数据失败");
				})
    	}else if(role=='Y'){
    		$http.get('exportUnCheckBillByDeptId/'+bank+'/'+dept+'/'+currency+'/'
				+goods+'/'+contractId+'/'+crtDate+'/'+deptId+'.do').success(function(data){
					alert("data:" + data.length);
				}).error(function(error){
					alert("从后台查询/导出数据失败");
				})
    	}
    }
    
    $scope.exportCheckBillByDeptId=function(){
    	//alert("从后台导出审批数据ByDeptId");
    	var bank="1";
    	var dept="1";
    	var currency="1";
    	var goods="1";
    	var contractId="1";
    	var crtDate="1";
    	
    	var deptId=$cookieStore.get('user').deptid;
    	bank=$("#table select:eq(0)").find('option:selected').val();
    	dept=$("#table select:eq(1)").find('option:selected').val();
    	currency=$("#table select:eq(2)").find('option:selected').val();
    	if(bank==""){
    		bank="-1";
    	}
    	if(dept==""){
    		dept="-1";
    	}
    	if(currency==""){
    		currency="-1";
    	}else{
    		var len = currency.length;
    		currency=currency.substr(len-3,len-1);
    		currency_str1=currency.substr(0,len-3);
    		currency_str2=currency.substr(len-3,len-1);
    		alert("str1:"+str1+"\nstr2:"+str2);
    	}
    	
    	goods=$("#table input[type='text']:eq(0)").val();
    	contractId=$("#table input[type='text']:eq(1)").val();
    	crtDate=$("#table input[type='text']:eq(2)").val();
    	if(goods==""){
    		goods="-1";
    	}
    	if(contractId==""){
    		contractId="-1";
    	}
    	if(crtDate==""){
    		crtDate="-1";
    	}else{
    		var dateArr=crtDate.split('/');
    		crtDate=dateArr[0];
    		for(i=1;i<dateArr.length;i++){
    			crtDate=crtDate+"-"+dateArr[i];
    		}
    		crtDate=dateArr[0]+"-"+dateArr[1]+"-"+dateArr[2];
    	}
    	alert($("#table select").length+"\n"+bank+"\n"+dept+"\n"+currency);
    	alert($("#table input[type='text']").length+"\n"+goods+"\n"+contractId+"\n"+crtDate);
    	
    	//alert("即将发起从后台导出数据请求");
    	$http.get('exportCheckBillByDeptId/'+bank+'/'+dept+'/'+currency+'/'
    			+goods+'/'+contractId+'/'+crtDate+'/'+deptId+ '.do').success(function(data){
    				alert("data:" + data.length);
    			}).error(function(error){
    				alert("从后台查询/导出数据失败");
    			})
    }
    
    $scope.exportUnCheckBillByDeptId=function(){
    	alert("从后台导出未审批数据ByDeptId");
    	var bank="1";
    	var dept="1";
    	var currency="1";
    	var goods="1";
    	var contractId="1";
    	var crtDate="1";
    	var deptId=$cookieStore.get('user').deptid;
    	
    	bank=$("#table select:eq(0)").find('option:selected').val();
    	dept=$("#table select:eq(1)").find('option:selected').val();
    	currency=$("#table select:eq(2)").find('option:selected').val();
    	if(bank==""){
    		bank="-1";
    	}
    	if(dept==""){
    		dept="-1";
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
    	
    	goods=$("#table input[type='text']:eq(0)").val();
    	contractId=$("#table input[type='text']:eq(1)").val();
    	crtDate=$("#table input[type='text']:eq(2)").val();
    	if(goods==""){
    		goods="-1";
    	}
    	if(contractId==""){
    		contractId="-1";
    	}
    	if(crtDate==""){
    		crtDate="-1";
    	}else{
    		var dateArr=crtDate.split('/');
    		crtDate=dateArr[0];
    		for(i=1;i<dateArr.length;i++){
    			crtDate=crtDate+"-"+dateArr[i];
    		}
//    		crtDate=dateArr[0]+"-"+dateArr[1]+"-"+dateArr[2];
    	}
//    	alert($("#table select").length+"\n"+bank+"\n"+dept+"\n"+currency);
//    	alert($("#table input[type='text']").length+"\n"+goods+"\n"+contractId+"\n"+crtDate);
    	
    	//alert("即将发起从后台导出未审批数据ByDeptId请求");
    	$http.get('exportUnCheckBillByDeptId/'+bank+'/'+dept+'/'+currency+'/'
    			+goods+'/'+contractId+'/'+crtDate+'/'+deptId+'.do', {responseType: 'arraybuffer'}).success(function(data){
    				var blob = new Blob([data], {type: "application/vnd.ms-excel"});
					var objectUrl = URL.createObjectURL(blob);
					var a = document.createElement('a');
				    document.body.appendChild(a);
				    a.setAttribute('style', 'display:none');
				    a.setAttribute('href', objectUrl);
				    a.click();
				    URL.revokeObjectURL(objectUrl);
    			}).error(function(error){
    				alert("从后台查询/导出未审批数据ByDeptId失败");
    			})
    }
    
	$scope.checkedTablename='已审批信用证'+getExportDate();
	$scope.uncheckedTablename='未审批信用证'+getExportDate();

    $scope.exportCheckedBillStateById = function(){
		var $table = $('#table');
		$table.tableExport({
			type:'excel',
			fileName:$scope.checkedTablename,
			escape:false
		});
	}
    

    
    $scope.exportUncheckedBillStateById = function(){
		var $table = $('#table');
		$table.tableExport({
			type:'excel',
			fileName:$scope.uncheckedTablename,
			escape:false
		});
	}
    
	$scope.selectBillById=function(){
		var id=$('#id').val();
		//alert("更新："+id);
		$location.path('updateCredit/' + id);
	}
	
	if($location.absUrl().indexOf('updateCredit')){
		var url=$location.absUrl();
		var str = url.split('/');
		var path=str[5]
		var id=str[6];
		if(id!=undefined && id!=null && id!=""){
			$http.get('selectBillById/' + id + '.do').success(function(data){
				$scope.bill=data;
				$('#inputDateText2').val(data.crtdate);
			}).error(function(error){
				alert("根据合同号查询信用证开立信息失败");
			})
		}
	}
	
    $scope.deleteById=function(){
    	var selections = $('#table').bootstrapTable('getSelections');
		var length = selections.length;
		if(length > 0){
			var ids = new Array();
			for(var i = 0; i < length; i++){
				ids[i] = selections[i].id;
			}
			var want_delete = confirm("确定删除？");
			if(want_delete == true){
				var delete_success = true;
				for(var i = 0; i < length; i++){
					$http.get('deleteById/'+ids[i]+'.do').success(
							function(data){
							}).error(function(error){
								delete_success = false;
							});
				}
				if(delete_success) alert('删除成功');
				else alert('删除失败');
				//$('#table').bootstrapTable('refresh');
				location.reload();
			}
		}
    }
	
	$scope.reloadRoute = function() {
	   $route.reload();
	}
	
	$scope.addBill = function(){
		$scope.bill.crtdate=$('#inputDate').val();
		$scope.bill.state="未审批";
		$scope.bill.deptid=$cookieStore.get('user').deptid;
		if($cookieStore.get('user').role=='A'){
			$scope.bill.dept = $('#inputDepart').val();
		}else{
			$scope.bill.dept = $('#inputDepart2').val();
		}
	    $http.post('addBill.do',$scope.bill).success(function(success){
	    	$("#inputBank").val("");
	    	if($cookieStore.get('user').role=='A'){
	    		$("#inputDepart").val(0);
	    	}else if($cookieStore.get('user').role=='Y'){
	    		$("#inputDepart2").val($cookieStore.get('user').dept);
	    	}
	    	$("#inputCommodity").val("");
	    	$("#inputContractNo").val("");
	    	$("#inputNature").val(0);
	    	$("#inputCustomer").val("");
	    	$("#inputCurrency").val(0);
	    	$("#inputSum").val("");
	    	$("#inputTime").val("");
	    	alert("录入信用证成功");
	    }).error(function(error){
	    	alert("录入信用证失败");
	    });
	}
	
	$scope.queryByContractId=function(){
		var contractId=$scope.bill.contractid;
		$http.get('selectByContractId/' + contractId + '.do').success(function(data){
			$scope.bill=data;
			$('#inputDate1').text=$scope.bill.crtdate;
			$('#searchError').hide();
			if($scope.bill==""){
				alert("要查询的合同号不存在！");
			}
		}).error(function(error){
			alert("根据合同号查询信用证开立信息失败");
		})
	}
	
	$scope.updateBill=function(){
		$scope.bill.crtdate=$('#inputDate').val();
		$scope.bill.state="未审批";
		
		$http.post('updateBill.do',$scope.bill).success(function(success){
	    	alert("更新信用证开立信息成功");
	    	$location.path('listUnCheckCredit');
	    }).error(function(error){
	    	alert("更新信用证开立信息失败");
	    });
	}
	
	////////////////////////////////////////////////////////////////////

	
	$scope.queryByContractIdAndState=function(){
		var contractId=$('#searchContractNo').val();
		$http.get('queryByContractIdAndState/' + contractId + '.do').success(function(data){
			$scope.bill=data;
			$('#inputDate').text=$scope.bill.crtdate;
			$('#searchError').hide();
			if($scope.bill==""){
				$('#searchError').show();
				alert("满足条件的合同号不存在！");
			}
		}).error(function(error){
			alert("根据合同号查询未审批信用证开立信息失败");
		})
	}
	
	$scope.updateBillStatePassById=function(){
		var rows = $('#table').bootstrapTable('getSelections');
		var is_suc = true;
		var length = rows.length;
		var i = 1;
		if(rows == ''){
			alert('请先选择一条需要审批的信息');
		}else{
			$.map(rows, function(row){
				var id = row.id;
				if(id=="" || id==null || id==undefined){
					alert("请先选择一条需要审批的信息");
				}else{
					$http.post('updateBillStatePassById/' + id +'.do').success(function(success){
						if(i == length){
							$('#table').bootstrapTable('refresh');
						}else{
							i++;
						}
						
					}).error(function(error){
						alert("审批信用证失败");
						is_suc = false;
					});
				}
			});
			if(is_suc == true){
				alert("审批信用证成功");
			}
		}
	}
	
	$scope.updateBillStateRejectById=function(){
		var rows = $('#table').bootstrapTable('getSelections');
		var is_suc = true;
		var length = rows.length;
		var i = 1;
		if(rows == ''){
			alert('请先选择一条需要审批的信息');
		}else{
			$.map(rows, function(row){
				var id = row.id;
				if(id=="" || id==null || id==undefined){
					alert("请先选择一条需要驳回的信息");
				}else{
					$http.post('updateBillStateRejectById/' + id +'.do').success(function(success){
						if(i == length){
							$('#table').bootstrapTable('refresh');
						}else{
							i++;
						}
					}).error(function(error){
						is_suc = false;
						alert("驳回信用证失败");
					});
				}
			});
			if(is_suc == true){
				alert("驳回信用证成功");
			}
		}
	}
	
	$scope.updateBillById=function(){
		var rows = $('#table').bootstrapTable('getSelections');
		var is_suc = true;
		var length = rows.length;
		if(rows == ''){
			alert('请先选择一条需要修改的信息');
		}else if(length!=1){
			alert('只能选择一条需要修改的信息');
		}else{
			if(id=="" || id==null || id==undefined){
				alert("请先选择一条需要修改的信息");
			}else{
				alert("id:" + id);
			}
		}
	}
	
	$scope.updateStateByContractId3=function(){
//		var contractId=$('#hid_contractId').val();
		var contractId="111111";
		var state="update1";
		$http.post('updateState3/' + contractId + '.do').success(function(success){
			alert("success");
		}).error(function(error){
			alert("error");
		})
	}
	
	$scope.listAllUnCheckBill=function(){
		var deptId=$cookieStore.get('user').deptid;
		var role = $cookieStore.get('user').role;
//		alert("deptId:" + deptId);
		if(role=='A' || role=='B'){
			$http.get('listAllUnCheckBill.do').success(function(data){
				$scope.bills=data;
				$('#table').bootstrapTable({
					url: 'listAllUnCheckBill.do',
					method: 'get',
					toolbar: '#toolbar',
					striped: true,
					pagination: true,
					sortable: true,
					pageSize: 100,
					pageList: [10, 15, 25, 50, 100],
					search: true,
					showRefresh: true,
					showToggle: true,
					clickToSelect: true,
					showColumns: true,
					queryParams: 'queryParams',
				});
				$('#table').bootstrapTable('hideColumn', 'id');
			}).error(function(error){
				alert("查询未审批信用证开立信息列表失败");
			})
		}else if(role=='Y'){
			$http.get('listAllUnCheckBillByDeptId/' + deptId +'.do').success(function(data){
				$scope.bills=data;
				$('#table').bootstrapTable({
					url: 'listAllUnCheckBillByDeptId/' + deptId +'.do',
					method: 'get',
					toolbar: '#toolbar',
					striped: true,
					pagination: true,
					sortable: true,
					pageSize: 100,
					pageList: [10, 15, 25, 50, 100],
					search: true,
					showRefresh: true,
					showToggle: true,
					clickToSelect: true,
					showColumns: true,
					queryParams: 'queryParams',
				});
				$('#table').bootstrapTable('hideColumn', 'id');
			}).error(function(error){
				alert("查询本部门未审批信用证开立信息列表失败");
			})
		}
	}
	
	$scope.listAllCheckBill=function(){
		var deptId=$cookieStore.get('user').deptid;
		var role = $cookieStore.get('user').role;
		if(role=='A' || role=='B'){
//			alert("listAllCheckBill:" + "\nrole:" + role);
			$http.get('listAllCheckBill.do').success(function(data){
				$scope.bills=data;
				$('#table').bootstrapTable({
					url: 'listAllCheckBill.do',
					method: 'get',
					toolbar: '#toolbar',
					striped: true,
					pagination: true,
					sortable: true,
					pageSize: 100,
					pageList: [10, 15, 25, 50, 100],
					search: true,
					showRefresh: true,
					showToggle: true,
					clickToSelect: true,
					showColumns: true,
					queryParams: 'queryParams',
					showExport: true,
		            exportDataType: "all"
				});
				$('#table').bootstrapTable('hideColumn', 'id');
			}).error(function(error){
				alert("查询所有已经审批的信用证开立信息列表失败");
			})
		}else if(role=='Y'){
//			alert("deptId:" + deptId);
			$http.get('listAllCheckBillByDeptId/' + deptId +'.do').success(function(data){
//				alert("listAllCheckBillByDeptId" + "\ndeptId:" + deptId + "\nrole:" + role);
				$scope.bills=data;
				$('#table').bootstrapTable({
					url: 'listAllCheckBillByDeptId/' + deptId +'.do',
					method: 'get',
					toolbar: '#toolbar',
					striped: true,
					pagination: true,
					sortable: true,
					pageSize: 100,
					pageList: [10, 15, 25, 50, 100],
					search: true,
					showRefresh: true,
					showToggle: true,
					clickToSelect: true,
					showColumns: true,
					queryParams: 'queryParams',
					showExport: true,
		            exportDataType: "all"
				});
				$('#table').bootstrapTable('hideColumn', 'id');
			}).error(function(error){
				alert("查询本部门审批信用证开立信息列表失败");
			})
		}
	}
	
	$http.get('queryBank.do').success(function(data){
		$scope.Banks=data;
		var selObj = $("#inputBank");
		for (var i=0;i<data.length;i++)
	    {
			var value=data[i];
		    var text=data[i];
		    selObj.append("<option value='"+value+"'>"+text+"</option>");
	    }
	}).error(function(error){
//		alert("获取银行失败");
	})
	
	$http.get('queryDept.do').success(function(data){
		$scope.Depts=data;
		if($cookieStore.get('user').role=='A'){
			$("#inputDepartA").show();
			$("#inputDepartY").hide();
			var selObj = $("#inputDepart");
			for (var i=0;i<data.length;i++)
			{
				var value=data[i];
				var text=data[i];
				selObj.append("<option value='"+value+"'>"+text+"</option>");
			}
	//		alert("dept:" + $scope.Dept);
		}else if($cookieStore.get('user').role=='Y'){
			$("#inputDepartA").hide();
			$("#inputDepartY").show();
//			alert("dept:" + $cookieStore.get('user').dept)
			$("#inputDepart2").val($cookieStore.get('user').dept);
		}
	}).error(function(error){
//		alert("获取部门失败");
	})
      	 
}])