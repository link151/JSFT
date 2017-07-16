/**
 * Created by malaiom on 16-9-25.
 */
$('.dropdown-toggle').dropdown()

function checkMoney(valueStr) {
    //var re0 = /^(\d{1,3}(,[\d]{3})*)$/;
    //var re1 = /^(\d{1,3}(,[\d]{3})*\.[0-9]{1})$/
    var re = /^((\d{1,3}(,[\d]{3})*)(\.\d{1,2})?)$/;
    return re.test(valueStr)
}

function checkRate(valueStr) {
    var re = /^((\d)*(\.\d{1,4})?)$/;
    return re.test(valueStr)

}

function checkTradeRate(valueStr) {
    var re = /^((\d)*(\.\d*)?)%$/;
    return re.test(valueStr)

}


function checkCertificate(valueStr){
    var re = /^((\d)*\.(\d)*\/(\d)*-(\d)*)$/;
    return re.test(valueStr)
}

function formatMoney(valueInt) {
    var num = (valueInt || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;

}

function changeSum() {
    var valueInt = parseInt($('#inputSum').val());
    var result = formatMoney(valueInt);
    $('#inputSum').val(result);
}

function changePayment() {
    var valueInt = parseInt($('#inputPayment').val());
    var result = formatMoney(valueInt);
    $('#inputPayment').val(result);
}

function changeExSum() {
    var valueInt = parseInt($('#inputExSum').val());
    var result = formatMoney(valueInt);
    $('#inputExSum').val(result);
}

function changeTradeSum() {
    var valueInt = parseInt($('#inputTradeSum').val());
    var result = formatMoney(valueInt);
    $('#inputTradeSum').val(result);
}

function changeTradeRMB() {
    var valueInt = parseInt($('#inputTradeRMB').val());
    var result = formatMoney(valueInt);
    $('#inputTradeRMB').val(result);
}