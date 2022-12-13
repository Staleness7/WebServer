$(document).ready(function() {
    var parameters = parseQueryString(window.location.href);
    var type = '钻石';
    $("#grantType").text(type);

    $('#btnSave').click(function(){
        window.opener.window.execGrant(parameters.type, parameters.uid, $("#txtAddCount").val(), function(){
            alert("赠送成功");
            window.close();
        });
    });
});