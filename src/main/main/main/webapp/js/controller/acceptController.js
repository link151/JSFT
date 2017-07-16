angular.module('acceptController',[])

.controller('acceptCtrl',['$scope','$rootScope','$http','$location','$cookies','$cookieStore',
    function($scope,$rootScope, $http, $location,$cookies,$cookieStore) {
	
	if($cookieStore.get('user') != null && $cookieStore.get('user') != undefined){
		$rootScope.username=$cookieStore.get('user').username;
		$rootScope.role=$cookieStore.get('user').role;
		$rootScope.dept=$cookieStore.get('user').dept;
		$('#hid_dept').val($rootScope.dept);
	}else{
		$location.path('/home');
	}
	
	$(document).ready(function(){
        $('#inputPaymentDate').val(getNowFormatDate());
        $('#inputPaymentDateText').val(getNowFormatDate());
        $('#inputRegister').val(getNowFormatDate());

        var weekday = getWeekday(getNowFormatDate());
        $('#inputWeekday').val(weekday);
        //$('#inputweekday').val();

        $('#creditSucMsg').hide();
        $('#creditErrMsg').hide();


           /* $('#inputPaymentDate').bind('input onpropertychange',function () {
                var date = $('#inputPaymentDate').val();
                var weekday = getWeekday(date);
                $('#inputDays').val(weekday);
            }) */

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

    function getWeekday(timeStr) {
        var show_day = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六','星期日');
        var datetime = strToTime(timeStr);
        var day = datetime.getDay();
        return show_day[day];
    }

    function setWeekday() {
    	alert("1");
        var date = $('#inputPaymentDateText').val();
        alert(date);
        var weekday = getWeekday(date);
        $('#inputWeekday').val(weekday);


    }
    
    $scope.setWeekday=function(){
    	alert("1");
    }



    function submitAcceptCredit() {
        var payment = $('#inputPayment').val();
        var days = $('#inputDays').val();
        var paymentDate = $('#inputPaymentDate').val();


        if (payment==''||days==''||paymentDate==''||!checkMoney(payment)){
            $('#creditErrMsg').show();

            if(payment==''){
                //$('#creditErrMsg').show();
                $('#inputPaymentDiv').addClass("has-error");
            }else if (checkMoney(payment)){
                $('#inputPayment').val(payment);
            }else {
                $('#inputPaymentDiv').addClass("has-error");
            }

            if (days==''){
                //$('#creditErrMsg').show();
                $('#inputDaysDiv').addClass("has-error");
            }else{
                $('#inputDays').val(days);
            }
            if (paymentDate==''){
                //$('#creditErrMsg').show();
                $('#inputPaymentDateDiv').addClass("has-error");
            } else {
                $('#inputPaymentDate').val(paymentDate);
                $('#inputDays').val(getWeekday(paymentDate));
            }
        }else {
            $('#inputAcceptForm').reset();
            //$('#creditErrMsg').hide();
            //var msg = contractNo+"信用证已开立!";
            // $('#creditNoSucMsg').html(msg);
            //$('#creditSucMsg').show();
            //$('#inputAcceptForm').reset(msg);
        }
        return false;
    }


    $('.form_date').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
      	
	$scope.listAllAccept=function(){
		$http.get('listAllAccept.do').success(function(data){
			alert("添加承兑信息成功");
		}).error(function(error){
			alert("添加承兑信息失败");
		});
	}
	
	$scope.queryBillByContractIdAndState=function(){
		var contractId=$scope.contractid;
		//查询已经审批的开立信息
		$http.get('queryByContractIdAndState2/' + contractId + '.do').success(function(data){
			if(data.registerdate == null && $('#inputRegister').val()!= null){
				data.registerdate = $('#inputRegister').val();
			}
			$('#inputBank').val(data.bank);
			$('#inputContractNo').val(data.contractid);
			$('#inputCurrency').val(data.currency);
//			$('#inputPayment').val(data.crtamount);
//			$('#inputDays').val(data.crtdeadline);
			$('#inputRegister').val(getNowFormatDate());
			var bank = data.bank;
			var contractid = data.contractid;
			var currency = data.currency;
			var payamount = data.crtamount;
			var days = data.crtdeadline;
			var week = '';
			var paydate = '';
			var registerdate = $('#inputRegister').val();
			var obj = {'bank':bank, 'contractid':contractid, 'currency':currency, 'payamount':payamount, 'days':days,
					'week':week, 'paydate': paydate, 'registerdate': registerdate};
			$scope.accept = obj;
		}).error(function(error){
			alert(error);
		});
	}
	
	$scope.queryByContractId=function(){
		var contractId=$scope.contractid;
		$http.get('selectAcceptByKey/' + contractId + '.do').success(function(data){
			if(data.registerdate == null && $('#inputRegister').val()!= null){
				data.registerdate = $('#inputRegister').val();
			}
			$('#inputBank').val(data.bank);
			$('#inputContractNo').val(data.contractid);
			$('#inputCurrency').val(data.currency);
			$('#inputPayment').val(data.crtamount);
			$('#inputDays').val(data.crtdeadline);
			$('#inputRegister').val(getNowFormatDate());
			var bank = data.bank;
			var contractid = data.contractid;
			var currency = data.currency;
			var payamount = data.crtamount;
			var days = data.crtdeadline;
			var week = '';
			var paydate = '';
			var registerdate = $('#inputRegister').val();
			var obj = {'bank':bank, 'contractid':contractid, 'currency':currency, 'payamount':payamount, 'days':days,
					'week':week, 'paydate': paydate, 'registerdate': registerdate};
			$scope.accept = obj;
		}).error(function(error){
			alert(error);
		});
	}
	
	$scope.updateAccept = function(){
		$scope.accept.paydate = $('#inputPaymentDateText').val();
		$scope.accept.week = $('#inputWeekday').val();
		$http.post('updateAccept.do', $scope.accept).success(function(success){
			alert("添加承兑信息成功");
		}).error(function(error){
			alert("error! 请检查是否已有该承兑信用证！");
		});
	}
	
	$scope.updateLock = function(){
		var id = $('#inputExId').val();
		var contractId = $('#inputExContractId').val();
		var lockAmount = $scope.lockamount;
        var lockRate = $scope.lockrate;
        if (lockAmount==undefined||lockRate==undefined||lockAmount==''||lockRate==''){
            alert("请输入正确信息,否则无法保存!")
            /*if (lockAmount==''){
                $('#inputExSumDiv').addClass("has-error");
            }else if (checkMoney(lockAmount)){
                $('#inputExSum').val(lockAmount);
            }else {
                $('#inputExSumDiv').addClass("has-error");
            }

            if (lockRate==''){
                $('#inputExRateDiv').addClass("has-error");
            }else if (checkRate(lockRate)){
                $('#inputExRate').val(lockRate);
            }else {
                $('#inputExRateDiv').addClass("has-error");
            }*/

        }else{
           $http.post('updateLock/' + id + '/' + contractId + '/' + lockAmount + '/' + lockRate + '.do').success(function(success){
        	   alert("锁汇信息添加成功");
        	   $('#table').bootstrapTable('refresh');
           }).error(function(error){
        	   alert(error);
           });
//           $('#setExchange').modal('hide');
        }
	}
	
	$scope.editAccept = function(){
		var id = $('#inputAcceptExId').val();
		var contractid = $('#inputAcceptExContractId').val();
		var bank = $('#inputAcceptExBank').val();
		var currency = $('#inputAcceptExCurrency').val();
		var payamount = $('#inputAcceptExPayAmount').val();
		var days = $('#inputAcceptExDays').val();
		var week = $('#inputAcceptExWeek').val();
		var paydate = $('#inputAcceptExPayDate').val();
		var lockamount = $('#inputAcceptExLockAmount').val();
		var lockrate = $('#inputAcceptExLockRate').val();
	    var registerdate = $('#inputAcceptExRegisterDate').val();
	    var obj = {"id": id, "contractid": contractid, "bank": bank, "currency": currency, "payamount" : payamount, 
	    		"days": days, "week": week, "paydate": paydate, "lockamount": lockamount, "lockrate": lockrate,
	    		"registerdate": registerdate};
//	    var url = 'editAccept/'+contractid + '/' + payamount + '/'+
//		days + '/' + week + '/' + paydate + '/' + registerdate + '/' + lockamount +
//		lockrate + '/' + '.do';
		$http.post('editAccept.do', obj).success(function(success){
			alert("承兑信息修改成功");
			$('#table').bootstrapTable('refresh');
		}).error(function(error){
			alert(error);
		});
//		$('#closeModal').click();
	}
	
	$scope.uploadAcceptToEdit = function(accept){
		$scope.accept = accept;
	}
      	 
}])