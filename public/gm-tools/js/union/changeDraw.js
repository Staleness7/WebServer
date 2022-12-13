$(document).ready(function() {
    var parameters = parseQueryString(window.location.href);

    $('#btnSave').click(function(){
        window.opener.window.execGrant(parameters.uid, $("#txtAddCount").val(), function(){
            alert("赠送成功");
            window.close();
        });
    });
});