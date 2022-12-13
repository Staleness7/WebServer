var userDataPageSize = 20;

function createUserList(){
    var dataList = $('#dataList');
    var dataPager = dataList.datagrid("getPager");
    var uid = $('#txtSearch').val() || null;
    // 请求数据
    apiGetOnlineUserData(0, userDataPageSize, uid,
        function(data){
            var msg = data.msg;
            $('#dataList').datagrid('loadData', msg.recordArr);
            dataPager.pagination({
                total:msg.totalCount,
                onSelectPage:function (pageNo, pageSize) {
                    var start = (pageNo - 1) * pageSize;
                    //var end = start + pageSize;
                    apiGetOnlineUserData(start, pageSize, uid, function (data){
                        $("#dataList").datagrid("loadData", data.msg.recordArr);
                        dataPager.pagination('refresh', {
                            total:data.msg.totalCount,
                            pageNumber:pageNo
                        });
                    });
                }
            });
        });
}

function openGrantHtml(type, uid){
    window.open('./grant.html?type='+type+'&'+'uid=' + uid, "_blank", "height=300,width=800,scrollbars=no,location=no");
}

function execGrant(field, uid, count, cb){
    count = parseInt(count) || 0;
    if (count === 0){
        alert('输入数据错误，请检查数据');
        return;
    }

    apiAdminGrant(field, uid, count, function () {
        cb();
        createUserList();
    })
}

$(document).ready(function() {
    // 初始化数据列名
    var dataList = $('#dataList');
    dataList.datagrid({
        nowrap: true,
        autoRowHeight: false,
        striped: true,
        pagination: true,
        showFooter: true,
        pageSize: userDataPageSize,
        pageList: [userDataPageSize],
        rownumbers: true,
        onBeforeSelect:function(){
            return false;
        },
        singleSelect: false,
        columns:[[
            {field: 'ck', checkbox: true},
            {field:'uid',title:'用户ID'},
            {field:'nickname',title:'昵称'},
            {field:'gold',title:'钻石数',
                formatter: function(value){
                    if(!!value || value === 0) {
                        return value.toFixed(2)
                    }
                }
            },
            {field:'mobilePhone',title:'绑定手机'},
            {field:'isAgent', title: '允许创建联盟',
                formatter: function (value) {
                    return !!value?'是':'否'
                }
            },
            {field:'isBlockedAccount', title: '禁止登录',
                formatter: function (value) {
                    return !!value?'是':'否'
                }
            },
            {field:'lastLoginIP', title: '最后登录IP'},
            {field:'location', title: '最后定位'},
            {field:'lastLoginTime', title: '最后登录时间',
                formatter: function (value) {
                    return new Date(value).toLocaleString();
                }
            },
            {field:'createTime', title: '创建时间',
                formatter: function (value) {
                    return new Date(value).toLocaleString();
                }
            }
        ]]
    });

    createUserList();

    $('#btnQuery').click(function(){
        createUserList();
    });

    $('#btnDongjie').click(function(){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            forbidLogin(rows[0], true);
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnJiedong').click(function (){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            forbidLogin(rows[0], false);
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnGrantTreasure').click(function (){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            openGrantHtml('gold', rows[0].uid);
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnGrantDiamond').click(function (){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            var uidArr = [];
            for (var i = 0; i < rows.length; ++i){
                uidArr.push(rows[i].uid);
            }
            openGrantHtml('gold', uidArr);
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnGrantCoupon').click(function (){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            openGrantHtml('coupon', rows[0].uid);
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnRechargeRecord').click(function (){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            window.parent.document.getElementById('frm_left').contentWindow.GetUrl(null, "../dataStatistics/rechargeRecord.html?uid=" + rows[0].uid);
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnSendEmail').click(function (){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            window.parent.document.getElementById('frm_left').contentWindow.GetUrl(null, "../systemSet/emailSettings.html?uid=" + rows[0].uid);
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnSetAgent').click(function(){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            let userData = rows[0];
            apiUpdateUserData(userData.uid, {isAgent: true}, function () {
                createUserList();
                alert("操作成功！");
            });
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnCancelAgent').click(function (){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            let userData = rows[0];
            apiUpdateUserData(userData.uid, {isAgent: false}, function () {
                createUserList();
                alert("操作成功！");
            });
        }else{
            alert("请选择操作对象");
        }
    });
});