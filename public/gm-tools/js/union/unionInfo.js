
let PAGE_SIZE = 20;


function createList(){
    let ownerUid = $('#ownerUid').val() || null;
    let unionID = $('#unionID').val() || null;


    let dataList = $('#dataList');
    let dataPager = dataList.datagrid("getPager");

    let matchData = {
    };
    if (!!ownerUid) matchData.ownerUid = ownerUid;
    if (!!unionID) matchData.unionID = unionID;

    // 请求数据
    apiAdminGetRecord('unionModel', 0, PAGE_SIZE, matchData,
        function(data){
            let msg = data.msg;
            let recordDataArr = msg.recordArr;
            dataList.datagrid('loadData', recordDataArr);

            dataPager.pagination({
                total:msg.totalCount,
                onSelectPage:function (pageNo, pageSize) {
                    let start = (pageNo - 1) * pageSize;
                    apiAdminGetRecord('unionModel', start, PAGE_SIZE, matchData, function (data){
                        $("#dataList").datagrid("loadData", fixData(data.msg.recordArr));
                        dataPager.pagination('refresh', {
                            total:data.msg.totalCount,
                            pageNumber:pageNo
                        });
                    });
                }
            });
        });
}

$(document).ready(function() {
    let parameters = parseQueryString(window.location.href);
    if (!!parameters.uid) $('#txtSearch').val(parameters.uid);

    // 初始化数据列名
    let dataList = $('#dataList');
    dataList.datagrid({
        nowrap: true,
        autoRowHeight: false,
        striped: true,
        pagination: true,
        showFooter: true,
        pageSize: PAGE_SIZE,
        pageList: [PAGE_SIZE],
        rownumbers: true,
        onBeforeSelect:function(){
            return false;
        },
        columns:[[
            {field: 'ck', checkbox: true},
            {field:'unionID',title:'联盟ID'},
            {field:'unionName',title:'联盟名字'},
            {field:'ownerUid',title:'盟主ID'},
            {field:'ownerNickname',title:'盟主昵称'},
            {field:'curMember',title:'当前人数'},
            {field:'opening',title:'是否营业',
                formatter: function (value) {
                    return !!value?"营业":"打烊";
                }
            },
            {field:'showRank',title:'排行榜',
                formatter: function (value) {
                    return !!value?"显示":"隐藏";
                }
            },
            {field:'showSingleRank',title:'单局排行榜',
                formatter: function (value) {
                    return !!value?"显示":"隐藏";
                }
            },
            {field:'showUnionActive',title:'联盟活动',
                formatter: function (value) {
                    return !!value?"显示":"隐藏";
                }
            },
            {field:'forbidInvite',title:'玩家邀请',
                formatter: function (value) {
                    return !!value?"禁止":"允许";
                }
            },
            {field:'forbidGive',title:'赠送积分',
                formatter: function (value) {
                    return !!value?"禁止":"允许";
                }
            },
            {field:'createTime',title:'创建时间',
                formatter: function (value) {
                    return new Date(value).toLocaleString();
                }
            },
        ]]
    });

    createList();

    $('#btnQuery').click(function(){
        createList();
    });

    $('#btnInvite').click(function(){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            let unionData = rows[0];
            if (!confirm("是否修改联盟玩家邀请权限为：" + (!unionData.forbidInvite?"禁止":"允许"))) return;
            apiAdminUpdateUnionRecord({unionID: unionData.unionID}, {forbidInvite: !unionData.forbidInvite}, unionData.unionID, function () {
                createList();
                alert("操作成功！");
            });
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnGive').click(function(){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            let unionData = rows[0];
            if (!confirm("是否修改联盟赠送积分权限为：" + (!unionData.forbidGive?"禁止":"允许"))) return;
            apiAdminUpdateUnionRecord({unionID: unionData.unionID}, {forbidGive: !unionData.forbidGive}, unionData.unionID, function () {
                createList();
                alert("操作成功！");
            });
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnShowRank').click(function(){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            let unionData = rows[0];
            if (!confirm("是否修改联盟显示排行榜权限为：" + (!unionData.showRank?"隐藏":"显示"))) return;
            apiAdminUpdateUnionRecord({unionID: unionData.unionID}, {showRank: !unionData.showRank}, unionData.unionID, function () {
                createList();
                alert("操作成功！");
            });
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnShowUnionActive').click(function(){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            let unionData = rows[0];
            if (!confirm("是否修改联盟显示联盟活动权限为：" + (!unionData.showUnionActive?"隐藏":"显示"))) return;
            apiAdminUpdateUnionRecord({unionID: unionData.unionID}, {showUnionActive: !unionData.showUnionActive}, unionData.unionID, function () {
                createList();
                alert("操作成功！");
            });
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnShowSingleRank').click(function(){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            let unionData = rows[0];
            if (!confirm("是否修改联盟显示单局排行榜权限为：" + (!unionData.showSingleRank?"隐藏":"显示"))) return;
            apiAdminUpdateUnionRecord({unionID: unionData.unionID}, {showSingleRank: !unionData.showSingleRank}, unionData.unionID, function () {
                createList();
                alert("操作成功！");
            });
        }else{
            alert("请选择操作对象");
        }
    });
    $('#btnDeleteUnion').click(function(){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            let unionData = rows[0];
            if (!confirm("是否确定要删除联盟")) return;
            apiDeleteUnion(unionData.unionID, function () {
                createList();
                alert("操作成功！");
            });
        }else{
            alert("请选择操作对象");
        }
    });

    $('#btnExportScore').click(function(){
        function fixData(dataArr, unionID) {
            let arr = [];
            for (let i = 0; i < dataArr.length; ++i){
                let newData = {};
                let data = dataArr[i];
                newData.uid = data.uid;
                newData.nickname = data.nickname;
                let unionInfo = data.unionInfo.find(function (e) {
                    return e.unionID == unionID;
                });
                if (!!unionInfo){
                    newData.score = unionInfo.score.toFixed(2);
                    newData.safeScore = unionInfo.safeScore.toFixed(2);
                    newData.totalScore = unionInfo.score + unionInfo.safeScore;
                    newData.totalScore = newData.totalScore.toFixed(2);
                }
                arr.push(newData);
            }
            return arr;
        }
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            alert("性能消耗较大，尽量在线上玩家不多时操作");
            let unionData = rows[0];
            let unionID = unionData.unionID;
            let matchData = {
                "unionInfo.unionID": unionID
            };
            apiAdminGetRecord("userModel", 0, 10000, matchData, function (data) {
                let dataArr = fixData(data.msg.recordArr, unionID);
                let index = 0;
                while (dataArr.length > 0){
                    let tempDataArr = dataArr.splice(0, 1000);
                    JSONToExcelConvertor(tempDataArr, "用户分数" + ++index, true);
                }

            });
        }else{
            alert("请选择操作对象");
        }
    });
});