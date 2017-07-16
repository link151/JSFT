var modify_flag=0;

angular.module('myApp',[
    'ngRoute','ngAnimate','ui.bootstrap','ngMessages','ngCookies',
    'homeController','crtController','acceptController','billOfDraftController','billOfPrintDraftController'])

   .config(function($routeProvider){
    $routeProvider.when('/crtBill',{
	   templateUrl:'pages/addCredit.html',
	   reloadOnSearch: true,
	   controller:'crtCtrl'
    })
    .when('/acceptance',{
	   templateUrl:'pages/acceptance.html',
	   reloadOnSearch: true,
	   controller:'acceptCtrl'
    })
    .when('/billOfDraft',{
	   templateUrl:'pages/addTradeApplyA.html',
	   reloadOnSearch: true,
	   controller:'billOfDraftCtrl'
    })
    .when('/home',{
	   templateUrl:'pages/home.html',
	   reloadOnSearch: true,
	   controller:'homeCtrl'
    })
    .when('/notice',{
    	templateUrl:'pages/loginSuccess.html',
    	reloadOnSearch: true,
    	controller:'homeCtrl'
    })
    .when('/addCredit',{
    	templateUrl:'pages/addCredit.html',
    	reloadOnSearch: true,
    	controller:'crtCtrl'
    })
    .when('/updateCredit/:id',{
    	templateUrl:'pages/updateCredit.html',
    	reloadOnSearch: true,
    	controller:'crtCtrl'
    })
    .when('/listCheckCredit',{
    	templateUrl:'pages/listCheckCredit.html',
    	reloadOnSearch: true,
    	controller:'crtCtrl'
    })
    .when('/listUnCheckCredit',{
    	templateUrl:'pages/listUnCheckCredit.html',
    	reloadOnSearch: true,
    	controller:'crtCtrl'
    })
    .when('/listCheckCreditY',{
    	templateUrl:'pages/listCheckCreditByDeptId.html',
    	reloadOnSearch: true,
    	controller:'crtCtrl'
    })
    .when('/listUnCheckCreditY',{
    	templateUrl:'pages/listUnCheckCreditByDeptId.html',
    	reloadOnSearch: true,
    	controller:'crtCtrl'
    })
    .when('/addTradeApplyY',{
    	templateUrl:'pages/addTradeApplyY.html',
    	reloadOnSearch: true,
    	controller:'billOfDraftCtrl'
    })
    .when('/printTradeApplyY/:id',{
    	templateUrl:'pages/printTradeApplyY.html',
    	reloadOnSearch: true,
    	controller:'billOfPrintDraftCtrl'
    })
    .when('/updTradeApplyY/:id',{
    	templateUrl:'pages/updateTradeApplyY.html',
    	reloadOnSearch: true,
    	controller:'billOfDraftCtrl'
    })
    .when('/addTradeApplyA',{
    	templateUrl:'pages/addTradeApplyA.html',
    	reloadOnSearch: true,
    	controller:'billOfDraftCtrl'
    })
    .when('/printTradeApplyA/:id',{
    	templateUrl:'pages/printTradeApplyA.html',
    	reloadOnSearch: true,
    	controller:'billOfPrintDraftCtrl'
    })
    .when('/updTradeApplyA/:id',{
    	templateUrl:'pages/updateTradeApplyA.html',
    	reloadOnSearch: true,
    	controller:'billOfDraftCtrl'
    })
    .when('/listTradeA',{
    	templateUrl:'pages/listTradeA.html',
    	reloadOnSearch: true,
    	controller:'billOfDraftCtrl'
    })
    .when('/listTradeY',{
    	templateUrl:'pages/listTradeY.html',
    	reloadOnSearch: true,
    	controller:'billOfDraftCtrl'
    })
    .when('/addAcceptCredit',{
    	templateUrl: 'pages/addAcceptCredit.html',
    	reloadOnSearch: true,
    	controller: 'acceptCtrl'
    })
    .when('/searchAcceptCredit', {
    	templateUrl: 'pages/searchAcceptCredit.html',
    	reloadOnSearch: true,
    	controller: 'acceptCtrl'
    })
    .when('/editAcceptCredit', {
    	templateUrl: 'pages/editAcceptCredit.html',
    	reloadOnSearch: true,
    	controller: 'acceptCtrl'
    })
    .otherwise({
        redirectTo:'/notice'
    })
})