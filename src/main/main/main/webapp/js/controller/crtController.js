angular.module('crtController',['smart-table', 'ui.bootstrap'])

.controller('crtCtrl',['$scope','$rootScope','$http','$location','$filter','$cookies','$cookieStore',
    function($scope,$rootScope, $http, $location,$filter,$cookies,$cookieStore) {
    var countSubmit = 0;
    sessionStorage.countSubmit = countSubmit;

    if($cookieStore.get('user') != null && $cookieStore.get('user') != undefined){
		$rootScope.username=$cookieStore.get('user').username;
		$rootScope.role=$cookieStore.get('user').role;
		$rootScope.dept=$cookieStore.get('user').dept;
		$('#hid_dept').val($rootScope.dept);
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
    
	$scope.selectBillById=function(){
		var id=$('#id').val();
		$location.path('updateCredit/' + id);
	}
	
	if($location.absUrl().indexOf('updateCredit')){
		var url=$location.absUrl();
		var str = url.split('/');
		var id=str[6];
		
		$http.get('selectBillById/' + id + '.do').success(function(data){
			$scope.bill=data;
			$('#inputDateText').val(data.crtdate);
		}).error(function(error){
			//alert("根据合同号查询信用证开立信息失败");
		})
	}
	
	$scope.addBill = function(){
		$scope.bill.crtdate=$('#inputDate').val();
		$scope.bill.state="未审批";
	    $http.post('addBill.do',$scope.bill).success(function(success){
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
		/*var contractid=$('#hid_contractId').val();
		alert("审批信用证" + contractid);
		if(contractid=="" || contractid==null || contractid==undefined){
			alert("请先选择一条需要驳回的信息");
		}else{
			$http.post('updateStateByContractId/' + contractid +'.do').success(function(success){
				alert("审批信用证成功");
			}).error(function(error){
				alert("审批信用证失败");
			});
		}*/
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
		/*var contractid=$('#hid_contractId').val();
		alert("驳回信用证" + contractid);
		if(contractid=="" || contractid==null || contractid==undefined){
			alert("请先选择一条需要驳回的信息");
		}else{
			$http.post('updateStateByContractId2/' + contractid + '.do').success(function(success){
				alert("驳回信用证成功");
			}).error(function(error){
				alert("驳回信用证失败");
			})
		}*/
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
//				$http.post('updateBillStateRejectById/' + id +'.do').success(function(success){
//					if(i == length){
//						$('#table').bootstrapTable('refresh');
//					}else{
//						i++;
//					}
//				}).error(function(error){
//					is_suc = false;
//					alert("驳回信用证失败");
//				});
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
		$http.get('listAllUnCheckBill.do').success(function(data){
			$scope.bills=data;
//			alert("success:" + $scope.bills);
		}).error(function(error){
			alert("查询未审批信用证开立信息列表失败");
		})
	}
	
	$scope.listAllCheckBill=function(){
		$http.get('listAllCheckBill.do').success(function(success){
			$scope.bills=data;
//			alert("查询所有已经审批的信用证开立信息列表成功");
		}).error(function(error){
			alert("查询所有已经审批的信用证开立信息列表失败");
		})
	}
	
	$(function(){
		$('#table').bootstrapTable({
			url: 'listAllUnCheckBill.do',
			method: 'get',
			toolbar: '#toolbar',
			striped: true,
			pagination: true,
			sortable: true,
			pageSize: 20,
			pageList: [10, 25, 50, 100],
			search: true,
			showRefresh: true,
			showToggle: true,
			clickToSelect: true,
			showColumns: true,
			singleSelect: true,
			queryParams: 'queryParams',
			columns: [{
				checkbox: true
			},{
				field: 'contractid',
				title: '合同号',
				sortable: true
			},{
				field: 'bank',
				title: '银行',
				sortable: true
			},{
				field: 'currency',
				title: '币种',
				sortable: true
			}]
		});
	});
      	 
}])
.directive('stSelectMultiple', [function() {
      return {
        restrict: 'E',
        require: '^stTable',
        scope: {
          collection: '=',
          predicate: '@',
          predicateExpression: '='
        },
        templateUrl: './pages/stSelectMultiple.html',
        link: function(scope, element, attr, table) {
          scope.dropdownLabel = '';
          scope.filterChanged = filterChanged;

          initialize();

          function initialize() {
            bindCollection(scope.collection);
          }

          function getPredicate() {
            var predicate = scope.predicate;
            if (!predicate && scope.predicateExpression) {
              predicate = scope.predicateExpression;
            }
            return predicate;
          }

          function getDropdownLabel() {
            var allCount = scope.distinctItems.length;

            var selected = getSelectedOptions();

            if (allCount === selected.length || selected.length === 0) {
              return 'All';
            }

            if (selected.length === 1) {
              return selected[0];
            }

            return selected.length + ' items';
          }

          function getSelectedOptions() {
            var selectedOptions = [];

            angular.forEach(scope.distinctItems, function(item) {
              if (item.selected) {
                selectedOptions.push(item.value);
              }
            });

            return selectedOptions;
          }

          function bindCollection(collection) {
            var predicate = getPredicate();
            var distinctItems = [];

            angular.forEach(collection, function(item) {
              var value = item[predicate];
              fillDistinctItems(value, distinctItems);
            });

            distinctItems.sort(function(obj, other) {
              if (obj.value > other.value) {
                return 1;
              } else if (obj.value < other.value) {
                return -1;
              }
              return 0;
            });

            scope.distinctItems = distinctItems;

            filterChanged();
          }

          function filterChanged() {
            scope.dropdownLabel = getDropdownLabel();

            var predicate = getPredicate();

            var query = {
              matchAny: {}
            };

            query.matchAny.items = getSelectedOptions();
            var numberOfItems = query.matchAny.items.length;
            if (numberOfItems === 0 || numberOfItems === scope.distinctItems.length) {
              query.matchAny.all = true;
            } else {
              query.matchAny.all = false;
            }

            table.search(query, predicate);
          }

          function fillDistinctItems(value, distinctItems) {
            if (value && value.trim().length > 0 && !findItemWithValue(distinctItems, value)) {
              distinctItems.push({
                value: value,
                selected: true
              });
            }
          }

          function findItemWithValue(collection, value) {
            var found = _.find(collection, function(item) {
              return item.value === value;
            });

            return found;
          }
        }
      }
    }])
    .filter('customFilter', ['$filter', function($filter) {
      var filterFilter = $filter('filter');
      var standardComparator = function standardComparator(obj, text) {
        text = ('' + text).toLowerCase();
        return ('' + obj).toLowerCase().indexOf(text) > -1;
      };

      return function customFilter(array, expression) {
        function customComparator(actual, expected) {

          var isBeforeActivated = expected.before;
          var isAfterActivated = expected.after;
          var isLower = expected.lower;
          var isHigher = expected.higher;
          var higherLimit;
          var lowerLimit;
          var itemDate;
          var queryDate;

          if (ng.isObject(expected)) {
            //exact match
            if (expected.distinct) {
              if (!actual || actual.toLowerCase() !== expected.distinct.toLowerCase()) {
                return false;
              }

              return true;
            }

            //matchAny
            if (expected.matchAny) {
              if (expected.matchAny.all) {
                return true;
              }

              if (!actual) {
                return false;
              }

              for (var i = 0; i < expected.matchAny.items.length; i++) {
                if (actual.toLowerCase() === expected.matchAny.items[i].toLowerCase()) {
                  return true;
                }
              }

              return false;
            }

            //date range
            if (expected.before || expected.after) {
              try {
                if (isBeforeActivated) {
                  higherLimit = expected.before;

                  itemDate = new Date(actual);
                  queryDate = new Date(higherLimit);

                  if (itemDate > queryDate) {
                    return false;
                  }
                }

                if (isAfterActivated) {
                  lowerLimit = expected.after;


                  itemDate = new Date(actual);
                  queryDate = new Date(lowerLimit);

                  if (itemDate < queryDate) {
                    return false;
                  }
                }

                return true;
              } catch (e) {
                return false;
              }

            } else if (isLower || isHigher) {
              //number range
              if (isLower) {
                higherLimit = expected.lower;

                if (actual > higherLimit) {
                  return false;
                }
              }

              if (isHigher) {
                lowerLimit = expected.higher;
                if (actual < lowerLimit) {
                  return false;
                }
              }

              return true;
            }
            //etc

            return true;

          }
          return standardComparator(actual, expected);
        }

        var output = filterFilter(array, expression, customComparator);
        return output;
      };
    }]);