let userDataPageSize = 20;
let curQueryUnionID = 0;

function createList(){
    let matchData = {};
    let uid = $("#txtSearch").val();
    if (!!uid){
        matchData.uid = parseInt(uid || "");
    }
    let unionID = parseInt($("#unionID").val() || "");
    if (!unionID){
        alert("请输入联盟ID");
        return;
    }
    curQueryUnionID = unionID;
    matchData["unionID"] = unionID;

    apiAdminGetRecord("userScoreChangeRecordModel", 0, userDataPageSize, matchData, function (data) {
        if (data.code === 0){
            var dataList = $('#dataList');
            var dataPager = dataList.datagrid("getPager");

            let msg = data.msg;
            dataList.datagrid('loadData', msg.recordArr);
            dataPager.pagination({
                total: msg.totalCount,
                onSelectPage:function (pageNo, pageSize) {
                    var start = (pageNo - 1) * pageSize;
                    //var end = start + pageSize;
                    apiAdminGetRecord("userScoreChangeRecordModel", start, userDataPageSize, matchData, function (data) {
                        dataList.datagrid("loadData", data.msg.recordArr);
                        dataPager.pagination('refresh', {
                            total:data.msg.totalCount,
                            pageNumber:pageNo
                        });
                    })
                }
            });
        }
    });
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
        singleSelect: true,
        columns:[[
            {field: 'ck', checkbox: true},
            {field:'uid',title:'用户ID'},
            {field:'nickname',title:'昵称'},
            {field:'unionID',title:'联盟ID'},
            {field:'changeCount',title:'变化分数'},
            {field:'leftCount', title: '分数'},
            {field:'leftSafeBoxCount', title: '保险柜分数'},
            {field:'changeType', title: '变化类型',
                formatter: function (value) {
                    if (value === enumeration.scoreChangeType.GIVE){
                        return "赠送分数";
                    } else if (value === enumeration.scoreChangeType.MODIFY_LOW){
                        return "给下级改分";
                    } else if (value === enumeration.scoreChangeType.MODIFY_UP){
                        return "被上级改分";
                    } else if (value === enumeration.scoreChangeType.GAME_WIN){
                        return "赢分";
                    } else if (value === enumeration.scoreChangeType.GAME_START_UNION_CHOU){
                        return "收取房费";
                    } else if (value === enumeration.scoreChangeType.GAME_WIN_CHOU){
                        return "赢家抽分";
                    } else if (value === enumeration.scoreChangeType.SAFE_BOX){
                        return "保险柜操作";
                    }
                }
            },
            {field:'describe', title: '描述'},
            {field:'createTime', title: '加入时间',
                formatter: function (value) {
                    return new Date(value).toLocaleString();
                }
            }
        ]]
    });

    $('#btnQuery').click(function(){
        createList()
    });
    $('#btnChangeDraw').click(function (){
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0){
            openGrantHtml(rows[0].uid);
        }else{
            alert("请选择操作对象");
        }
    });
});